import { ElectronAPI } from '@electron-toolkit/preload'
import { GetLLMs } from '@shared/types'

declare global {
  interface Window {
    context: {
      locale: string;
      getLLMs: GetLLMs;
      getLLMPath: (name: string) => string;
      downloadLLM: (userName: string, modelName: string, fileName: string, onProgress?: (percentage: number) => void) => Promise<void>;
      generate: (name: string, prompt: string) => Promise<void>;
      saveChatHistory: (chatId: string, userMessage: string, aiResponse: string, modelName: string) => Promise<void>;
      loadChatHistory: (chatId: string) => Promise<void>;
    }
  }
}
