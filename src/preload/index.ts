import { contextBridge, ipcRenderer } from 'electron';


try {
    contextBridge.exposeInMainWorld('context', {
        locale: navigator.language,
        getLLMs: () => ipcRenderer.invoke('getLLMs'),
        // preload/index.ts
        generate: (name: string, prompt: string) => {
            return new Promise((_, reject) => {
                // Listen for text chunks
                ipcRenderer.on('generationChunk', (_, chunk) => {
                    // Send each chunk to the frontend (renderer) in real-time
                    window.dispatchEvent(new CustomEvent('generationChunk', { detail: chunk }));
                });
        
                // Listen for completion
                ipcRenderer.once('generationComplete', () => {
                    window.dispatchEvent(new CustomEvent('generationComplete'));
                });
        
                // Listen for errors
                ipcRenderer.once('generationError', (_, errorMessage) => {
                    console.error("Generation error:", errorMessage);
                    reject(new Error(errorMessage)); // Reject with error
                });
        
                // Invoke the backend generate process
                ipcRenderer.invoke('generate', name, prompt).catch((error) => {
                    console.error("IPC invocation failed:", error);
                    reject(error); // Handle invocation failure
                });
            });
        },        
        downloadLLM: (
            userName: string,
            modelName: string,
            fileName: string,
            onProgress?: (percentage: number) => void
        ): Promise<void> => {
            if (onProgress) {
                const progressHandler = (_: any, { modelName: progressModelName, percentage }: any) => {
                    if (progressModelName === modelName) {
                        onProgress(percentage);
                    }
                };

                ipcRenderer.on('download-progress', progressHandler);

                // Invoke the download and ensure the listener is cleaned up afterward
                return ipcRenderer
                    .invoke('downloadLLM', userName, modelName, fileName)
                    .finally(() => {
                        ipcRenderer.removeListener('download-progress', progressHandler);
                    });
            } else {
                // If no progress callback, invoke and return the Promise directly
                return ipcRenderer.invoke('downloadLLM', userName, modelName, fileName);
            }
        },
        saveChatHistory: (chatId: string, userMessage: string, aiResponse: string, modelName: string) => ipcRenderer.invoke('saveChatHistory', chatId, userMessage, aiResponse, modelName),
        loadChatHistory: (chatId: string) => ipcRenderer.invoke('loadChatHistory', chatId),
    });
} catch (error) {
    console.log(error)
}