<template>
  <div>
    <button @click="importDocument" class="btn-import">Import</button>
    <div>
      <label for="select-format">Parameters:</label>
      <div class="input-group">
        <label for="check-clear">Clear canvas:</label>
        <input id="check-clear" type="checkbox" v-model="isCheckedClear" />
        <label for="check-select">Select imported content:</label>
        <input id="check-select" type="checkbox" v-model="isCheckedSelect" />
      </div>
      <div class="input-group">
        <label for="select-scaling">Scaling:</label>
        <select id="select-scaling" v-model="scale">
          <option v-for="(s, index) in importScales" :key="index" :value="s.value">
            {{ s.displayValue }}
          </option>
        </select>
      </div>
      <div class="input-group">
        <label for="select-placement">Placement:</label>
        <select id="select-placement" v-model="placement">
          <option v-for="(p, index) in importPlacements" :key="index" :value="p.value">
            {{ p.displayValue }}
          </option>
        </select>
      </div>
      <div class="textarea-group">
        <label for="config-json-import" class="label-above"> Document source: </label>
        <textarea id="config-json-import" class="input-src" v-model="documentSource"></textarea>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

export default {
  props: {
    marvinRef: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      importPlacements: [
        { value: 'CENTER', displayValue: 'Center' },
        { value: 'TOP_LEFT', displayValue: 'Top left corner' },
        { value: 'TOP', displayValue: 'Top' },
        { value: 'TOP_RIGHT', displayValue: 'Top right corner' },
        { value: 'RIGHT', displayValue: 'Right' },
        { value: 'BOTTOM_RIGHT', displayValue: 'Bottom right corner' },
        { value: 'BOTTOM', displayValue: 'Bottom' },
        { value: 'BOTTOM_LEFT', displayValue: 'Bottom left corner' },
        { value: 'LEFT', displayValue: 'Left' }
      ],
      importScales: [
        { value: 'SHRINK', displayValue: 'Shrink large input to screen size' },
        { value: 'NONE', displayValue: 'None' }
      ],
      placement: 'CENTER',
      scale: 'SHRINK',
      documentSource: 'oxytocin',
      isCheckedClear: true,
      isCheckedSelect: true
    }
  },
  methods: {
    async importDocument() {
      const options = {
        clearCanvas: this.isCheckedClear,
        select: this.isCheckedSelect,
        scale: this.scale,
        placement: this.placement,
        throwError: true
      }

      try {
        await this.marvinRef?.importDocument(this.documentSource, options)
      } catch (error) {
        console.error('Error importing document:', error)
      }
    }
  }
}
</script>
