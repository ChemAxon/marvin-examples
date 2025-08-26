<script lang="ts">
  import Marvin from '$lib/components/marvin/Marvin.svelte';
  import Examples from '$lib/components/examples/Examples.svelte';
  import type { Marvin as MarvinRef } from '@chemaxon/marvin'

  let marvinRef: MarvinRef | null = null;

  const setMarvinRef = (refValue: MarvinRef) => {
    marvinRef = refValue;
  };
</script>

<section id="app">
  <Marvin settings={{}} {setMarvinRef} />
  <Examples {marvinRef}/>
</section>

<style>
#app {
  display: flex;
  flex-direction: row;
  max-width: 100vw;
  flex: 1;
}

* {
  box-sizing: border-box;
}
</style>