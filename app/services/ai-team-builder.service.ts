import { Player, Team } from "../types";

export class AITeamBuilderService {
  static async buildTeams(players: Player[]): Promise<Team[]> {
    const totalStrength = players.reduce((sum, p) => sum + p.strength, 0);
    const averageStrength = totalStrength / players.length;
    const targetTeamAverage = totalStrength / 2;

    const prompt = `You are a professional football team builder. Create 2 PERFECTLY BALANCED teams from these ${
      players.length
    } players.

PLAYERS DATA:
${players.map((p) => `- ${p.name}: Strength ${p.strength}/10`).join("\n")}

CRITICAL BALANCING RULES:
1. Total players: ${players.length} (each team gets ${
      players.length / 2
    } players)
2. Total strength: ${totalStrength} points
3. Target per team: ${targetTeamAverage.toFixed(1)} points each
4. Team average difference MUST BE ≤ 0.5 points
5. NO team should have all weak players (≤4) or all strong players (≥7)
6. Distribute strength levels evenly across teams
7. Each team should have mix of: weak (1-4), medium (5-6), strong (7-10) players

MATHEMATICAL REQUIREMENTS:
- Team 1 total strength: ${targetTeamAverage.toFixed(1)} ± 1.5 points
- Team 2 total strength: ${targetTeamAverage.toFixed(1)} ± 1.5 points
- |Team1_Average - Team2_Average| ≤ 0.5

Return ONLY this JSON format:
{
  "team1": {
    "name": "Team Alpha",
    "players": ["exact player names here"],
    "total_strength": calculated_total,
    "average_strength": calculated_average
  },
  "team2": {
    "name": "Team Beta", 
    "players": ["exact player names here"],
    "total_strength": calculated_total,
    "average_strength": calculated_average
  }
}

Use EXACT player names. Calculate totals and averages correctly.`;

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
    console.log("OpenRouter response:", data);
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
    console.log("🤖 AI Response:", aiResponse);

    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON found in AI response");
    }

    const parsed = JSON.parse(jsonMatch[0]);
    console.log("📊 Parsed JSON:", parsed);

    const team1Players = this.findPlayersByNames(parsed.team1.players, players);
    const team2Players = this.findPlayersByNames(parsed.team2.players, players);

    // Validate team balance
    const team1Total = team1Players.reduce((sum, p) => sum + p.strength, 0);
    const team2Total = team2Players.reduce((sum, p) => sum + p.strength, 0);
    const team1Avg = team1Total / team1Players.length;
    const team2Avg = team2Total / team2Players.length;
    const avgDifference = Math.abs(team1Avg - team2Avg);

    console.log(`🏆 Team 1: ${team1Total} total, ${team1Avg.toFixed(2)} avg`);
    console.log(`🏆 Team 2: ${team2Total} total, ${team2Avg.toFixed(2)} avg`);
    console.log(`⚖️ Average difference: ${avgDifference.toFixed(2)}`);

    if (avgDifference > 1.0) {
      console.warn("⚠️ Teams not well balanced, but proceeding...");
    }

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
