import { Player, Team } from "../types";

export class AITeamBuilderService {
  static async buildTeams(players: Player[]): Promise<Team[]> {
    const prompt = `Create 2 balanced football teams from these ${
      players.length
    } players:

${players.map((p) => `- ${p.name}: Strength ${p.strength}/10`).join("\n")}

Return JSON format:
{
  "team1": {
    "name": "Team A",
    "players": ["Player 1", "Player 2", ...]
  },
  "team2": {
    "name": "Team B", 
    "players": ["Player 3", "Player 4", ...]
  }
}`;

    // Şu anda OpenRouter kullanıyoruz - manuel olarak değiştirebilirsin
    const aiResponse = await this.callOpenRouter(prompt);
    // const aiResponse = await this.callHuggingFace(prompt);
    // const aiResponse = await this.callOllama(prompt);

    return this.parseResponse(aiResponse, players);
  }

  // Hugging Face API
  private static async callHuggingFace(prompt: string): Promise<string> {
    const apiKey = process.env.NUXT_HF_API_KEY;
    if (!apiKey) {
      throw new Error("NUXT_HF_API_KEY not found in environment variables");
    }

    const response = await fetch(
      "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 500,
            temperature: 0.7,
            return_full_text: false,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Hugging Face API error: ${response.status}`);
    }

    const data = await response.json();
    return data[0]?.generated_text || "";
  }

  // OpenRouter API
  private static async callOpenRouter(prompt: string): Promise<string> {
    const apiKey = process.env.NUXT_OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error(
        "NUXT_OPENROUTER_API_KEY not found in environment variables"
      );
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct:free",
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
          max_tokens: 500,
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();
    if (data.ok === false) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }
    return data.choices?.[0]?.message?.content || "";
  }

  // Ollama Local API
  private static async callOllama(prompt: string): Promise<string> {
    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama3.2",
        prompt: prompt,
        stream: false,
        options: {
          temperature: 0.7,
          num_predict: 500,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.status}`);
    }

    const data = await response.json();
    return data.response || "";
  }

  // Response parser
  private static parseResponse(aiResponse: string, players: Player[]): Team[] {
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON found in AI response");
    }

    const parsed = JSON.parse(jsonMatch[0]);

    const team1Players = this.findPlayersByNames(parsed.team1.players, players);
    const team2Players = this.findPlayersByNames(parsed.team2.players, players);

    return [
      new Team(parsed.team1.name, team1Players),
      new Team(parsed.team2.name, team2Players),
    ];
  }

  private static findPlayersByNames(
    names: string[],
    players: Player[]
  ): Player[] {
    return names
      .map((name) =>
        players.find((p) => p.name.toLowerCase().includes(name.toLowerCase()))
      )
      .filter((player): player is Player => player !== undefined);
  }
}
