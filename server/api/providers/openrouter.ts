import type { AIProvider, TeamBuildingConfig, Player } from "./types";
import { generateTeamBuildingPrompt } from "./prompt-generator";

export class OpenRouterProvider implements AIProvider {
  name = "openrouter";

  async buildTeams(
    players: Player[],
    config: TeamBuildingConfig
  ): Promise<string> {
    if (!config.apiKey) {
      throw new Error("OpenRouter API key not configured");
    }

    const prompt = generateTeamBuildingPrompt(players);

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: config.model || "mistralai/mistral-7b-instruct:free",
          messages: [
            {
              role: "system",
              content:
                "You are a football team builder. Return only valid JSON.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: config.maxTokens || 500,
          temperature: config.temperature || 0.7,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `OpenRouter API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;

    if (!aiResponse) {
      throw new Error("No response from OpenRouter API");
    }

    return aiResponse;
  }
}
