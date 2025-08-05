import type { AIProvider, TeamBuildingConfig, Player } from "./types";
import { generateTeamBuildingPrompt } from "./prompt-generator";

export class AIMLAPIProvider implements AIProvider {
  name = "aimlapi";

  async buildTeams(
    players: Player[],
    config: TeamBuildingConfig
  ): Promise<string> {
    if (!config.apiKey) {
      throw new Error("AIML API key not configured");
    }

    const prompt = generateTeamBuildingPrompt(players);

    const response = await fetch(
      "https://api.aimlapi.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: config.model || "google/gemma-3-4b-it", // Google Gemma 3 4B Instruct
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
      const errorData = await response.json().catch(() => ({}));
      console.error("AIML API Error Details:", {
        status: response.status,
        statusText: response.statusText,
        errorData,
        apiKey: config.apiKey
          ? `${config.apiKey.substring(0, 8)}...`
          : "MISSING",
        headers: response.headers,
      });
      throw new Error(
        `AIML API error: ${response.status} ${response.statusText} - ${
          errorData.error?.message || errorData.message || "Unknown error"
        }`
      );
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;

    if (!aiResponse) {
      throw new Error("No response from AIML API");
    }

    return aiResponse;
  }
}
