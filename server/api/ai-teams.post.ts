import { createAIProvider } from "./providers/factory";
import type { TeamBuildingConfig } from "./providers/types";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const {
    players,
    provider = "openrouter",
    model,
    temperature,
    maxTokens,
  } = body;

  const config = useRuntimeConfig();

  try {
    // Provider'ı oluştur
    const aiProvider = createAIProvider(provider);

    // Config'i hazırla
    const providerConfig: TeamBuildingConfig = {
      apiKey: getApiKey(provider, config),
      model,
      temperature,
      maxTokens,
    };

    // AI provider'ı ile team building yap
    const aiResponse = await aiProvider.buildTeams(players, providerConfig);

    return {
      success: true,
      response: aiResponse,
      provider: aiProvider.name,
    };
  } catch (error) {
    console.error(`AI API Error (${provider}):`, error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return {
      success: false,
      error: errorMessage,
      provider,
    };
  }
});

function getApiKey(provider: string, config: any): string {
  switch (provider.toLowerCase()) {
    case "openrouter":
      return config.openrouterApiKey;

    // Gelecekte eklenecek provider'lar için API key'ler
    // case 'chatgpt':
    //   return config.openaiApiKey;
    //
    // case 'gemini':
    //   return config.geminiApiKey;
    //
    // case 'deepseek':
    //   return config.deepseekApiKey;

    default:
      throw new Error(
        `No API key configuration found for provider: ${provider}`
      );
  }
}
