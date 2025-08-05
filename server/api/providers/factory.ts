import type { AIProvider } from "./types";
import { OpenRouterProvider } from "./openrouter";
import { AIMLAPIProvider } from "./aimlapi";

// Gelecekte eklenecek provider'lar için import'lar
// import { ChatGPTProvider } from './chatgpt';
// import { GeminiProvider } from './gemini';
// import { DeepSeekProvider } from './deepseek';

export function createAIProvider(providerName: string): AIProvider {
  switch (providerName.toLowerCase()) {
    case "openrouter":
      return new OpenRouterProvider();

    case "aimlapi":
      return new AIMLAPIProvider();

    // Gelecekte eklenecek provider'lar
    // case 'chatgpt':
    //   return new ChatGPTProvider();
    //
    // case 'gemini':
    //   return new GeminiProvider();
    //
    // case 'deepseek':
    //   return new DeepSeekProvider();

    default:
      throw new Error(`Unknown AI provider: ${providerName}`);
  }
}

export function getAvailableProviders(): string[] {
  return [
    "openrouter",
    "aimlapi",
    // Gelecekte: 'chatgpt', 'gemini', 'deepseek'
  ];
}
