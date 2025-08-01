import { Player, Tier } from "../types";

export class TeamBuilderUtil {
  public static shuffle(players: Player[]): Player[] {
    const shuffled = [...players];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = shuffled[i]!;
      shuffled[i] = shuffled[j]!;
      shuffled[j] = temp;
    }
    return shuffled;
  }

  public static calculateAverage(firstTeamPlayers: Player[]): number {
    const result =
      firstTeamPlayers.reduce((acc, player) => acc + player.strength, 0) /
      firstTeamPlayers.length;
    return Math.round(result * 100) / 100;
  }

  public static calculateStandardDeviation(firstTeamPlayers: Player[]): number {
    const average = TeamBuilderUtil.calculateAverage(firstTeamPlayers);
    const sum = firstTeamPlayers.reduce(
      (acc, player) => acc + Math.pow(player.strength - average, 2),
      0
    );
    const result = Math.sqrt(sum / firstTeamPlayers.length);
    return Math.round(result * 100) / 100;
  }

  public static calculateTotalStrength(players: Player[]): number {
    const result = players.reduce((acc, player) => acc + player?.strength, 0);
    return Math.round(result * 100) / 100;
  }

  public static findIndexByTier(players: Player[], tier: Tier): number {
    return players.findIndex((player) => player.tier === tier);
  }
}
