<script lang="ts">
  import type { DocumentType, Marvin } from '@chemaxon/marvin';

  export let marvinRef: Marvin | null = null;

  let format = 'CXON';
  let result = '';

  const exportFormats = [
    { value: 'CXON', displayValue: 'CXON' },
    { value: 'MRV', displayValue: 'MRV' },
    { value: 'Mol:V2', displayValue: 'MDL MOLFILE' },
    { value: 'Mol:V3', displayValue: 'MDL MOLFILE V3000' },
    { value: 'SMILES', displayValue: 'SMILES' },
    { value: 'SMARTS', displayValue: 'SMARTS' },
    { value: 'InChI', displayValue: 'InChI' },
    { value: 'InChIKey', displayValue: 'InChIkey' },
    { value: 'SDF', displayValue: 'MDL SDfile format' },
    { value: 'RDF', displayValue: 'MDL RDfile format' },
    { value: 'RXN', displayValue: 'MDL RXNfile format' }
  ];

  async function exportDocument() {
    try {
      const exportedDocument = await marvinRef?.exportDocument(format as DocumentType);
      result = exportedDocument?.content ?? '';
    } catch (e) {
      result = `<div style="color:red;margin:5px">Could not export in requested format</div>`;
    }
  }
</script>

<div class="container-row">
  <div class="input-group">
    <label for="export-format">Format:</label>
    <select bind:value={format} id="export-format">
      {#each exportFormats as f}
        <option value={f.value}>
          {f.displayValue}
        </option>
      {/each}
    </select>
    <button on:click={exportDocument}>Export</button>
  </div>
  <div id="config-json-export">
    <pre>{result}</pre>
  </div>
</div>

<style>
  .container-row {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .input-group {
    display: flex;
    margin-bottom: 0.5rem;
    align-items: center;
  }

  select,
  button {
    padding: 0.25rem;
    margin-left: 0.5rem;
  }

  #config-json-export {
    margin-top: 8px;
    min-height: calc(100vh - 96px);
    border: 1px solid black;
    overflow: auto;
  }
</style>
