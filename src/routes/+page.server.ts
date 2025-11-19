import { fetchOverwatchStats, filtersFromRequest } from "$lib/overwatch/statsAPI";
import type { FilterData, OverwatchStatsResponse } from "$lib/overwatch/types";
import type { Actions } from "./$types";

const BlizzardStatsURL = new URL("https://overwatch.blizzard.com/en-us/rates/data/");

export const actions: Actions = {
  download: async ({ request }) => {
    const filters = await filtersFromRequest(request);

    try {
      const statsJSON = await fetchOverwatchStats(filters);

      const finalJSON = statsJSON.rates.map(entry => ({
        name: entry.cells.name,
        pickrate: entry.cells.pickrate,
        winrate: entry.cells.winrate,
        role: entry.hero.role,
      }));

      return { success: true, data: finalJSON, filters };
    } catch (error) {
      return { success: false, error: (error as Error).message, filters };
    }
  },
};
