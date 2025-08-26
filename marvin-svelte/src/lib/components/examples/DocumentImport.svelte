<script lang="ts">
  import type { ImportOptions, Marvin, PlacementType, ScaleType } from '@chemaxon/marvin';

  export let marvinRef: Marvin | null;

  type PlacementOption = {
  value: PlacementType;
  displayValue: string;
};

  type ScaleOption = {
    value: ScaleType;
    displayValue: string;
  };

  let placementOptions: PlacementOption[] = [
    { value: 'CENTER', displayValue: 'Center' },
    { value: 'TOP_LEFT', displayValue: 'Top left corner' },
    { value: 'TOP', displayValue: 'Top' },
    { value: 'TOP_RIGHT', displayValue: 'Top right corner' },
    { value: 'RIGHT', displayValue: 'Right' },
    { value: 'BOTTOM_RIGHT', displayValue: 'Bottom right corner' },
    { value: 'BOTTOM', displayValue: 'Bottom' },
    { value: 'BOTTOM_LEFT', displayValue: 'Bottom left corner' },
    { value: 'LEFT', displayValue: 'Left' }
  ];

  let ScaleOptions: ScaleOption[] = [
    { value: 'SHRINK', displayValue: 'Shrink large input to screen size' },
    { value: 'NONE', displayValue: 'None' }
  ];

  let placement = placementOptions[0].value;
  let scale = ScaleOptions[0].value;
  let documentSource = 'oxytocin';
  let isCheckedClear = true;
  let isCheckedSelect = true;

  async function importDocument() {
    const options: ImportOptions = {
      clearCanvas: isCheckedClear,
      select: isCheckedSelect,
      throwError: true,
      scale,
      placement
    };

    try {
      await marvinRef?.importDocument(documentSource, options);
    } catch (error) {
      console.error('Error importing document:', error);
    }
  }
</script>

<div>
  <button on:click={importDocument} class="btn-import">Import</button>
  <div>
    <label for="select-format">Parameters:</label>
    <div class="input-group">
      <label for="check-clear">Clear canvas:</label>
      <input id="check-clear" type="checkbox" bind:checked={isCheckedClear} />
      <label for="check-select">Select imported content:</label>
      <input id="check-select" type="checkbox" bind:checked={isCheckedSelect} />
    </div>

    <div class="input-group">
      <label for="select-scaling">Scaling:</label>
      <select id="select-scaling" bind:value={scale}>
        {#each ScaleOptions as s, index}
          <option value={s.value}>{s.displayValue}</option>
        {/each}
      </select>
    </div>

    <div class="input-group">
      <label for="select-placement">Placement:</label>
      <select id="select-placement" bind:value={placement}>
        {#each placementOptions as p, index}
          <option value={p.value}>{p.displayValue}</option>
        {/each}
      </select>
    </div>

    <div class="textarea-group">
      <label for="config-json-import" class="label-above">Document source:</label>
      <textarea id="config-json-import" class="input-src" bind:value={documentSource}></textarea>
    </div>
  </div>
</div>

<style>
.input-group {
	display: flex;
	margin-bottom: 0.5rem;
	align-items: center;
	flex-direction: row;
}

.input-group label {
	flex: 0 0 auto;
}

.input-group select,
.input-group input {
	flex: 1;
	margin-left: 0.5rem;
}

.textarea-group {
	display: flex;
	flex-direction: column;
}

.btn-import {
	width: 100%;
}

#config-json-import {
	margin-top: 8px;
	min-height: calc(50vh);
	border: 1px solid black;
}

label {
	font-weight: 500;
}
</style>