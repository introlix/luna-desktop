import { contextBridge, ipcRenderer } from 'electron';


try {
    contextBridge.exposeInMainWorld('context', {
        locale: navigator.language,
        getLLMs: () => ipcRenderer.invoke('getLLMs'),
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