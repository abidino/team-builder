import { Player, Team } from "../types";

export class AITeamBuilderService {
  static async buildTeams(
    players: Player[],
    provider: string = "openrouter",
    options?: {
      model?: string;
      temperature?: number;
      maxTokens?: number;
    }
  ): Promise<Team[]> {
    try {
      const response = (await $fetch("/api/ai-teams", {
        method: "POST",
        body: {
          players: players.map((p) => ({ name: p.name, strength: p.strength })),
          provider,
          ...options,
        },
      })) as {
        success: boolean;
        response?: string;
        error?: string;
        provider?: string;
      };

      if (!response.success) {
        throw new Error(response.error || "AI API failed");
      }

      if (!response.response) {
        throw new Error("No response from AI API");
      }

      console.log(
        `✅ AI Response from ${response.provider}:`,
        response.response
      );
      return this.parseResponse(response.response, players);
    } catch (error) {
      console.error("AI Team Builder failed:", error);
      throw error;
    }
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
