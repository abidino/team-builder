import { Position } from "./position";
import { Tier } from "./tier";

export class Player {
  public id: string;

  constructor(
    public name: string,
    public strength: number,
    public preferredPosition?: Position,
    id?: string
  ) {
    this.id = id || this.generateId();
  }

  public generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  get tier(): Tier {
    if (this.strength <= 4) {
      return Tier.LOW;
    } else if (this.strength <= 7) {
      return Tier.MID;
    } else {
      return Tier.HIGH;
    }
  }
}
