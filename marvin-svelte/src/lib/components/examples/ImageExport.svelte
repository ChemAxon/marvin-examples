<script lang="ts">
  import type { ExportOptions, ImageType, Marvin } from '@chemaxon/marvin';

  export let marvinRef: Marvin | null;

  const imageFormats: ImageType[] = ['SVG', 'PNG', 'JPG', 'WEBP', 'TIFF'];

  let format: ImageType = imageFormats[0];
  let exportOptions: ExportOptions | undefined = undefined;
  let result = '';
  let image = '';
  let width = 0;
  let height = 0;
  let linkRef: HTMLAnchorElement | null = null;

  async function exportImage() {
    exportOptions = { width, height };
    const exportedImage = await marvinRef?.exportImage(format, exportOptions);
    if (exportedImage) {
      image = exportedImage.content.toString();
      result = exportedImage.content;
    }
  }

  async function downloadImage() {
    const options: ExportOptions = { width, height };
    const exportedImage = await marvinRef?.exportImage(format, options);
    result = exportedImage?.content ?? '';

    if (linkRef && result) {
      linkRef.href =
        format === 'SVG'
          ? 'data:text/plain;charset=utf-8,' + encodeURIComponent(result)
          : result;

      linkRef.download = `fileName.${format.toLowerCase()}`;
      linkRef.click();
    }
  }

  $: renderedImage = image
    ? format === 'SVG'
      ? `<pre>${image}</pre>` 
      : `<img src="${image}" alt="Exported image" />`
    : '';
</script>

<div class="container-col">
  <div class="btn-group">
    <button on:click={exportImage} class="btn-export-img">Create image</button>
    <button on:click={downloadImage} class="btn-download-img">Download image</button>
  </div>

  <div class="container-row">
    <label for="export-image-format">Format:</label>
    <select id="export-image-format" bind:value={format}>
      {#each imageFormats as f}
        <option value={f}>{f}</option>
      {/each}
    </select>

    <label for="input-width">Width:</label>
    <input class="shrinkable-input" id="input-width" type="number" bind:value={width} />

    <label for="input-height">Height:</label>
    <input class="shrinkable-input" id="input-height" type="number" bind:value={height} />
  </div>

  <label for="config-json-image">ImageConfig object:</label>
  <div id="config-json-image">
    {#if exportOptions}
      <pre>{JSON.stringify(exportOptions, null, 2)}</pre>
    {/if}
  </div>

  <label>Exported image:</label>
  <div id="image-render">
    {@html renderedImage}
  </div>

  <a bind:this={linkRef} class="hidden" id="link-download" href="" download></a>
</div>

<style>
  .container-row {
	display: flex;
	flex-direction: column;
	width: 100%;
}

.btn-group {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.hidden {
	width: 1px;
	height: 1px;
	margin: -1px;
}

#export-image-format {
	margin-left: 0;
	margin-right: 0;
}

#config-json-image {
	margin-top: 8px;
	min-height: 28vh;
	overflow-y: auto;
	border: 1px solid black;
}

#image-render {
	margin-top: 8px;
	min-height: 28vh;
	overflow-y: auto;
	border: 1px solid black;
}

label {
	font-weight: 500;
}

pre {
	overflow-x: auto;
	margin-bottom: 0;
}

</style>