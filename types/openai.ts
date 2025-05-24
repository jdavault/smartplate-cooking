// types/openai.ts or inline in your file

export interface ChatMessage {
  role: 'assistant' | 'user' | 'system';
  content: string;
}

export interface ChatCompletionChoice {
  index: number;
  message: ChatMessage;
  finish_reason: string;
}
export interface ChatImageResponse {
  data: { url: string }[];
}

export interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: ChatCompletionChoice[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}
