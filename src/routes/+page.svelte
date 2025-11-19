<script lang="ts">
  import { Role, Input, GameMode, type MapGameMode, Region, type Map, CompetitiveTier, type FilterData } from "$lib/overwatch/types.d";
  import { Maps } from "$lib/overwatch/maps";
  import type { PageProps } from "./$types";
  import { stringify as csvStringify } from "csv-stringify/browser/esm/sync";

  const filters = $state<FilterData>({
    role: "All",
    input: Input["Mouse & Keyboard"],
    rq: GameMode["Quick Play - Role Queue"],
    tier: "All",
    map: "All",
    region: Region.Americas,
  });

  const GroupedMaps: { [key in MapGameMode]?: Map[] } = {};
  for (const map of Maps) {
    if (!(Object.keys(GroupedMaps) as MapGameMode[]).includes(map.gameMode)) {
      GroupedMaps[map.gameMode] = [map];
    } else {
      GroupedMaps[map.gameMode]!.push(map);
    }
  }

  let { form }: PageProps = $props();

  $effect(() => {
    if (form?.success && form.data && form.filters) {
      const dateOfDownload = new Date().toISOString().split('T')[0];
      console.log("Received data:", form.data);
      // Handle the received data (e.g., trigger CSV download)
      const csv = csvStringify(form.data, { header: true });
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${dateOfDownload}-${form.filters.input}-${form.filters.region}-${form.filters.rq as unknown as number == 0 ? "QP" : `COMP-${form.filters.tier}`}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  });
</script>

<form method="POST">
  <select bind:value={filters.role} name="role">
    <option value="All">All Roles</option>
    {#each Object.values(Role) as role}
      <option value={role}>{role}</option>
    {/each}
  </select>

  <select name="input" id="input" bind:value={filters.input}>
    {#each Object.keys(Input) as key}
      <option value={Input[key as keyof typeof Input]}>{key}</option>
    {/each}
  </select>

  <select name="game-mode" id="game-mode" bind:value={filters.rq}>
    {#each Object.keys(GameMode).filter(key => Number.isNaN((Number.parseInt(key)))) as key}
      <option value={GameMode[key as keyof typeof GameMode]}>{key}</option>
    {/each}
  </select>

  {#if filters.rq === GameMode["Competitive - Role Queue"]}
    <select name="tier" id="tier" bind:value={filters.tier}>
      <option value="All">All Tiers</option>
      {#each Object.keys(CompetitiveTier) as key}
        <option value={CompetitiveTier[key as keyof typeof CompetitiveTier]}>{key}</option>
      {/each}
    </select>
  {/if}

  <select name="map" id="map" bind:value={filters.map}>
    <option value="All">All Maps</option>
    {#each Object.entries(GroupedMaps) as [gameMode, maps]}
      <optgroup label={gameMode}>
        {#each maps as map}
          <option value={map.name}>{map.name}</option>
        {/each}
      </optgroup>
    {/each}
  </select>

  <select name="region" id="region" bind:value={filters.region}>
    {#each Object.keys(Region) as key}
      <option value={Region[key as keyof typeof Region]}>{key}</option>
    {/each}
  </select>

  <button type="submit">Download CSV</button>
</form>

<p class="whitespace-pre">
  {JSON.stringify(filters, null, 2)}
</p>
