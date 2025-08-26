<script lang="ts">
  import DocumentExport from './DocumentExport.svelte';
  import DocumentImport from './DocumentImport.svelte';
  import ImageExport from './ImageExport.svelte';
  import type { Marvin as MarvinRef } from '@chemaxon/marvin';

  export let marvinRef: MarvinRef | null = null;

  const examples = [
    {
      displayValue: 'Document export',
      value: 'documentExport',
      component: DocumentExport
    },
    {
      displayValue: 'Document import',
      value: 'documentImport',
      component: DocumentImport
    },
    {
      displayValue: 'Image export',
      value: 'imageExport',
      component: ImageExport
    }
  ];

  let selectedExample = 'documentExport';

  $: currentComponent = examples.find(e => e.value === selectedExample)?.component;
</script>

<section id="examples">
  <div class="input-group">
    <label for="filter-example">Example:</label>
    <select id="filter-example" bind:value={selectedExample}>
      {#each examples as example}
        <option value={example.value}>{example.displayValue}</option>
      {/each}
    </select>
  </div>

  {#if currentComponent}
    <svelte:component this={currentComponent} {marvinRef} />
  {/if}
</section>

<style global>
.input-group {
	display: flex;
	margin-bottom: 0.5rem;
	align-items: center;
	flex-direction: row;
}

#filter-example {
  padding: 0.25rem;
}

.input-group label {
	flex: 0 0 auto;
}

.input-group select {
	flex: 1;
	margin-left: 0.5rem;
}

#examples {
	width: 30%;
	padding: 12px;
	overflow-y: auto;
	max-height: 100vh;
}

label {
	font-weight: 500;
}

</style>
