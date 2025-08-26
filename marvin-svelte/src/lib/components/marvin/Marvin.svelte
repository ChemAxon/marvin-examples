<script lang="ts">
  import { onMount } from 'svelte';
  import type { Marvin as MarvinRef } from '@chemaxon/marvin';

  export let settings: any;
  export let setMarvinRef: (ref: MarvinRef) => void;

  onMount(async () => {
    // Set the host for Marvin Web Services for custom / separate backend
    // Example: const MARVIN_WEBSERVICES_HOST = "http://localhost:8080/";
    const MARVIN_WEBSERVICES_HOST = "";
    
    const marvinContainer = document.getElementById('marvin-app');
    const marvin = await import('@chemaxon/marvin');
    const marvinSettings = await import('@chemaxon/marvin/marvin-extensions');
    const createMarvin = marvin.createMarvin;
    const getDefaultSettings = marvinSettings.getDefaultSettings;

    if (marvinContainer) {
      createMarvin(marvinContainer, {
        ...getDefaultSettings(MARVIN_WEBSERVICES_HOST),
        ...settings
      }).then((marvin: MarvinRef) => {
        setMarvinRef(marvin);
      });
    }
  });
</script>

<div id="marvin-app"></div>

<style>
  #marvin-app {
    width: 70%;
  }
</style>
