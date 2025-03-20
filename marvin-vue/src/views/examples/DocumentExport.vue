<template>
  <div class="container-row">
    <div class="input-group">
      <label for="export-format">Format:</label>
      <select v-model="format" id="export-format">
        <option v-for="(f, index) in exportFormats" :key="index" :value="f.value">
          {{ f.displayValue }}
        </option>
      </select>
      <button @click="exportDocument">Export</button>
    </div>
    <div id="config-json-export">
      <pre v-html="result"></pre>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    marvinRef: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      exportFormats: [
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
      ],
      format: 'CXON',
      result: ''
    }
  },
  methods: {
    async exportDocument() {
      try {
        const exportedDocument = await this.marvinRef?.exportDocument(this.format)
        this.result = exportedDocument?.content
      } catch (e) {
        this.result = `<div style="color:red;margin:5px">Could not export in requested format</div>`
      }
    }
  }
}
</script>
