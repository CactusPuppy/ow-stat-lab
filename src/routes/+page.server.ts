import type { OverwatchStatsResponse } from "$lib/overwatch/types";
import type { Actions } from "./$types";

const BlizzardStatsURL = new URL("https://overwatch.blizzard.com/en-us/rates/data/");

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const filters = {
      role: formData.get("role"),
      input: formData.get("input"),
      rq: formData.get("game-mode"),
      tier: formData.get("tier"),
      map: formData.get("map"),
      region: formData.get("region"),
    };
    console.log("Filters:", filters);

    const queryParams = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
      if (value !== null && value !== undefined && value !== '') {
        queryParams.append(key, String(value));
      }
    }
    console.log("Query Params:", queryParams.toString());

    const urlWithParams = new URL(BlizzardStatsURL.toString());
    urlWithParams.search = queryParams.toString();
    console.log("Final URL:", urlWithParams.toString());

    const blizzResponse = await fetch(urlWithParams.toString(), { method: "GET" });
    if (!blizzResponse.ok) {
      console.error("Failed to fetch data from Blizzard:", blizzResponse.statusText);
      return { success: false };
    }

    const statsJSON = await blizzResponse.json() as OverwatchStatsResponse;
    console.log("Received data:", statsJSON);

    const finalJSON = statsJSON.rates.map(entry => ({
      name: entry.cells.name,
      pickrate: entry.cells.pickrate,
      winrate: entry.cells.winrate,
      role: entry.hero.role,
    }));

    return { success: true, data: finalJSON, filters };
  },
};
