import { Player } from './player';

export class Team {
  constructor(
    public name: string,
    public members: Player[],
    public id?: string
  ) {
    this.name = name;
  }

  get totalMemberStrength(): number {
    return this.members?.reduce((acc, player) => acc + player?.strength, 0);
  }
}
