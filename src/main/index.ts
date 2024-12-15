import { downloadLLM, generate, getLLMs } from '@/lib';
import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: false, // true in production
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.handle('downloadLLM', async (event, userName: string, modelName: string, fileName: string) => {
    try {
      await downloadLLM(userName, modelName, fileName, (percentage) => {
        // Send progress updates to the renderer process
        event.sender.send('download-progress', {
          modelName,
          percentage,
        });
      });

    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  ipcMain.handle('getLLMs', async () => {
    return getLLMs();
  });

  ipcMain.handle('generate', async (event, name: string, prompt: string) => {
    const webContents = event.sender; // Access the sender of the IPC call

    try {
      // Call the generate function with a callback for streaming chunks
      await generate(name, prompt, (chunk: string) => {
        // Send each text chunk to the renderer process
        webContents.send('generationChunk', chunk);
      });

      // Optionally send a completion message to the renderer process
      webContents.send('generationComplete');
    } catch (error: unknown) {
      // Handle 'unknown' error type properly
      let errorMessage = "An unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message; // Safely access the message
      }

      console.error("Error during generation:", errorMessage);
      webContents.send('generationError', errorMessage);
    }
  });



  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
