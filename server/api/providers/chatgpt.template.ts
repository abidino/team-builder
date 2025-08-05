import type { AIProvider, TeamBuildingConfig, Player } from "./types";
import { generateTeamBuildingPrompt } from "./prompt-generator";

export class ChatGPTProvider implements AIProvider {
  name = "chatgpt";

  async buildTeams(
    players: Player[],
    config: TeamBuildingConfig
  ): Promise<string> {
    if (!config.apiKey) {
      throw new Error("OpenAI API key not configured");
    }

    const prompt = generateTeamBuildingPrompt(players);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: config.model || "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a football team builder. Return only valid JSON.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: config.maxTokens || 500,
        temperature: config.temperature || 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `OpenAI API error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;

    if (!aiResponse) {
      throw new Error("No response from OpenAI API");
    }

    return aiResponse;
  }
}

// Not: Bu dosya şu an kullanılmıyor, sadece gelecek için template
