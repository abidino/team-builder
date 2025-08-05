export interface AIProvider {
  name: string;
  buildTeams(players: any[], config: any): Promise<string>;
}

export interface TeamBuildingConfig {
  apiKey: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export interface Player {
  id: string;
  name: string;
  strength: number;
}

export interface TeamResult {
  team1: {
    name: string;
    players: string[];
    total_strength: number;
    average_strength: number;
  };
  team2: {
    name: string;
    players: string[];
    total_strength: number;
    average_strength: number;
  };
}
