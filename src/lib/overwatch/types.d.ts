/*
 * Enums defined as [display value] = [param value]
 */
export enum Role {
  Tank = "Tank",
  Damage = "Damage",
  Support = "Support",
}

export enum Input {
  "Mouse & Keyboard" = "PC",
  Controller = "Console",
}

export enum GameMode {
  "Quick Play - Role Queue" = 0,
  "Competitive - Role Queue" = 2,
}

export enum CompetitiveTier {
  Bronze = "Bronze",
  Silver = "Silver",
  Gold = "Gold",
  Platinum = "Platinum",
  Diamond = "Diamond",
  Master = "Master",
  "Grandmaster and Champion" = "Grandmaster",
}

export enum MapGameMode {
  Clash = "Clash",
  Control = "Control",
  Escort = "Escort",
  Flashpoint = "Flashpoint",
  Hybrid = "Hybrid",
  Push = "Push",
}

export interface Map {
  gameMode: MapGameMode,
  name: string,
}

export enum Region {
  Americas = "Americas",
  Asia = "Asia",
  Europe = "Europe",
}

export interface FilterData {
  role: Role | "All",
  input: Input,
  rq: string,
  tier: CompetitiveTier | "All",
  map: Map | "All",
  region: Region,
}

export interface ExtremaData {
  maxwr: number,
  minwr: number,
  maxpr: number,
  minpr: number,
}
export interface OverwatchStatsResponse {
  rates: Array<{
    id: string,
    cells: {
      name: string,
      pickrate: number,
      winrate: number,
    },
    hero: {
      color: string,
      name: string,
      portrait: string,
      role: string,
      roleIcon: string,
    },
  }>,
  extrema: {
    all: ExtremaData,
    tank: ExtremaData,
    damage: ExtremaData,
    support: ExtremaData,
  },
  selected: Optional<FilterData>,
}


