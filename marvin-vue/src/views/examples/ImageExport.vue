<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ExportOptions, ImageType, Marvin } from '@chemaxon/marvin'

type ExportProps = {
  marvinRef?: Marvin
}

const props = defineProps<ExportProps>()

const imageFormats: ImageType[] = ['SVG', 'PNG', 'JPG', 'WEBP', 'TIFF']

const format = ref<ImageType>(imageFormats[0])
const exportOptions = ref<ExportOptions>()
const result = ref<string>('')
const image = ref<string>('')
const width = ref<number>(0)
const height = ref<number>(0)
const linkRef = ref<HTMLAnchorElement | null>(null)

const exportImage = async () => {
  exportOptions.value = { width: width.value, height: height.value }

  const exportedImage = await props.marvinRef?.exportImage(format.value, exportOptions.value)
  if (exportedImage) image.value = exportedImage.content.toString()

  result.value = exportedImage?.content ?? ''
}

const downloadImage = async () => {
  const options: ExportOptions = { width: width.value, height: height.value }
  const exportedImage = await props.marvinRef?.exportImage(format.value, options)
  result.value = exportedImage?.content ?? ''

  if (linkRef.value) {
    linkRef.value.href =
      format.value === 'SVG'
        ? 'data:text/plain;charset=utf-8,' + encodeURIComponent(result.value)
        : result.value
    linkRef.value.download = `fileName.${format.value.toLowerCase()}`
    linkRef.value.click()
  }
}

const renderImage = computed(() => {
  return format.value === 'SVG'
    ? `<pre>${image.value}</pre>`
    : `<img src="${image.value}" alt="Exported image" />`
})
</script>

<template>
  <div class="container-col">
    <div class="btn-group">
      <button @click="exportImage" class="btn-export-img">Create image</button>
      <button @click="downloadImage" class="btn-download-img">Download image</button>
    </div>

    <div class="container-row">
      <label for="export-format">Format:</label>
      <select v-model="format" id="export-image-format">
        <option v-for="f in imageFormats" :key="f" :value="f">
          {{ f }}
        </option>
      </select>

      <label for="input-width">Width:</label>
      <input class="shrinkable-input" id="input-width" type="text" v-model.number="width" />

      <label for="input-height">Height:</label>
      <input class="shrinkable-input" id="input-height" type="text" v-model.number="height" />
    </div>

    <label for="config-json-image">ImageConfig object:</label>
    <div id="config-json-image">
      <pre v-if="exportOptions">{{ JSON.stringify(exportOptions, null, 2) }}</pre>
    </div>

    <label>Exported image:</label>
    <div id="image-render" v-html="renderImage"></div>

    <a ref="linkRef" class="hidden" id="link-download" href="" download></a>
  </div>
</template>
