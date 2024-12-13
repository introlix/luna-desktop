import { contextBridge, ipcRenderer } from 'electron';


try {
    contextBridge.exposeInMainWorld('context', {
        locale: navigator.language,
        getLLMs: () => ipcRenderer.invoke('getLLMs'),
        downloadLLM: () => ipcRenderer.invoke('downloadLLM'),
    });
} catch (error) {
    console.log(error)
}