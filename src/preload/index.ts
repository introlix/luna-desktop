import { contextBridge, ipcRenderer } from 'electron';


try {
    contextBridge.exposeInMainWorld('context', {
        locale: navigator.language,
        getLLMs: () => ipcRenderer.invoke('getLLMs'),
        generate: (name: string, prompt: string) => {
            return new Promise((resolve, reject) => {
                const chunks: string[] = []; // Collect chunks for final response
        
                // Listen for text chunks
                ipcRenderer.on('generationChunk', (_, chunk) => {
                    chunks.push(chunk); // Append chunk to the array
                });
        
                // Listen for completion
                ipcRenderer.once('generationComplete', () => {
                    console.log("Generation completed");
                    resolve(chunks.join('')); // Resolve with full response
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
    });
} catch (error) {
    console.log(error)
}