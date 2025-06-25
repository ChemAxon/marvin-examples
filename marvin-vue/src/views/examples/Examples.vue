<template>
  <section id="examples">
    <div class="input-group">
      <label for="filter-example">Example:</label>
      <select v-model="selectedExample" id="filter-example">
        <option v-for="(example, index) in examples" :key="index" :value="example.value">
          {{ example.displayValue }}
        </option>
      </select>
    </div>
    <component :is="currentComponent" :marvin-ref="marvinRef"></component>
  </section>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import DocumentExport from './DocumentExport.vue'
import DocumentImport from './DocumentImport.vue'
import ImageExport from './ImageExport.vue'
import type { Marvin as MarvinRef } from '@chemaxon/marvin'

export default {
  props: {
    marvinRef: {
      type: Object as PropType<MarvinRef | null>,
      required: false
    }
  },
  data() {
    return {
      selectedExample: 'documentExport',
      examples: [
        {
          displayValue: 'Document export',
          value: 'documentExport',
          component: 'DocumentExport'
        },
        {
          displayValue: 'Document import',
          value: 'documentImport',
          component: 'DocumentImport'
        },
        {
          displayValue: 'Image export',
          value: 'imageExport',
          component: 'ImageExport'
        }
      ]
    }
  },
  computed: {
    currentComponent() {
      const example = this.examples.find((e) => e.value === this.selectedExample)
      return example ? example.component : null
    }
  },
  components: {
    DocumentExport,
    DocumentImport,
    ImageExport
  }
}
</script>

<style>
@import './examples.css';
</style>
