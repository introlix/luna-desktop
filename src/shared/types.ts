export type LLMInfo = {
    title: string
  }

export type GetLLMs = () => Promise<LLMInfo[]>;

