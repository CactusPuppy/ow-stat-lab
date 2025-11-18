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

export enum MapGameMode {
  Clash = "Clash",
  Control = "Control",
  Escort = "Escort",
  Flashpoint = "Flashpoint",
  Hybrid = "Hybrid",
  Push = "Push",
}

export interface Map {
  gameMode: MapGameMode;
  name: string;
}

export enum Region {
  Americas = "Americas",
  Asia = "Asia",
  Europe = "Europe",
}

