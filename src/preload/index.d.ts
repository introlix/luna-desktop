import { ElectronAPI } from '@electron-toolkit/preload'
import { GetLLMs } from '@shared/types'

declare global {
  interface Window {
    context: {
      locale: string
      getLLMs: GetLLMs
      downloadLLM: (userName: string, modelName: string, fileName: string, onProgress?: (percentage: number) => void) => Promise<void>
      generate: (name: string, prompt: string) => Promise<void>
    }
  }
}
