import { Player, Position, Team } from '../types';
import { TeamBuilderUtil } from '../utils';

export class TeamBuilderService {
  private static differenceThreshold = 2;

  static buildTeams(players: Player[]): Team[] {
    const _players = [...players];
    const teams: Team[] = [];

    const team1: Team = new Team('Team 1', []);
    const team2: Team = new Team('Team 2', []);

    let firstTeamPlayers: Player[] = [];
    let secondTeamPlayers: Player[] = [];

    const goalKeepers = players
      .filter((value) => value.preferredPosition === Position.Goalkeeper)
      .sort((a, b) => b.strength - a.strength);

    if (goalKeepers.length >= 2) {
      firstTeamPlayers.push(goalKeepers[0]!);
      secondTeamPlayers.push(goalKeepers[1]!);

      this.removePlayer(goalKeepers[0]!, _players);
      this.removePlayer(goalKeepers[1]!, _players);
    }

    const shuffledPlayers = TeamBuilderUtil.shuffle(_players);

    firstTeamPlayers = [
      ...firstTeamPlayers,
      ...shuffledPlayers.slice(0, Math.ceil(shuffledPlayers.length / 2)),
    ];
    team1.members = [...firstTeamPlayers];

    secondTeamPlayers = [
      ...secondTeamPlayers,
      ...shuffledPlayers.slice(Math.ceil(shuffledPlayers.length / 2)),
    ];
    team2.members = [...secondTeamPlayers];

    const diff = Math.abs(
      TeamBuilderUtil.calculateTotalStrength(firstTeamPlayers) -
        TeamBuilderUtil.calculateTotalStrength(secondTeamPlayers)
    );

    console.log(`Difference: ` + diff);
    if (diff <= TeamBuilderService.differenceThreshold) {
      teams.push(team1, team2);
      return teams;
    }
    return TeamBuilderService.buildTeams(players);
  }

  static removePlayer(player: Player, players: Player[]): Player[] {
    const index = players.findIndex(
      (currentPlayer) => currentPlayer === player
    );
    players.splice(index, 1);
    return players;
  }
}
