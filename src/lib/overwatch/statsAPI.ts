import type { FilterData, OverwatchStatsResponse } from "./types";

const BlizzardStatsURL = "https://overwatch.blizzard.com/en-us/rates/data/";

export async function filtersFromRequest(request: Request): Promise<FilterData> {
  const formData = await request.formData();
  return {
    role: formData.get("role") as FilterData["role"],
    input: formData.get("input") as FilterData["input"],
    rq: formData.get("game-mode") as FilterData["rq"],
    tier: formData.get("tier") as FilterData["tier"],
    map: formData.get("map") as FilterData["map"],
    region: formData.get("region") as FilterData["region"],
  };
}

export async function fetchOverwatchStats(filters: FilterData): Promise<OverwatchStatsResponse> {
  const queryParams = new URLSearchParams();
  for (const [key, value] of Object.entries(filters)) {
    if (value !== null && value !== undefined && value !== '') {
      queryParams.append(key, String(value));
    }
  }

  const urlWithParams = `${BlizzardStatsURL}?${queryParams.toString()}`;

  const response = await fetch(urlWithParams, { method: "GET" });
  if (!response.ok) {
    throw new Error(`Failed to fetch data from Blizzard: ${response.statusText}`);
  }

  const statsJSON = await response.json() as OverwatchStatsResponse;
  return statsJSON;
}
