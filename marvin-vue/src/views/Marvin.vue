<script setup lang="ts">
import { onMounted } from 'vue'
import { createMarvin, type MarvinSettings } from '@chemaxon/marvin'
import { getDefaultSettings } from '@chemaxon/marvin/marvin-extensions'
import type { Marvin as MarvinRef } from '@chemaxon/marvin'

const props = defineProps<{
  settings: MarvinSettings
}>()

const emit = defineEmits<{
  (event: 'update-marvin-ref', marvin: MarvinRef): void
}>()

onMounted(() => {
  // Set the host for Marvin Web Services for custom / separate backend
  // Example: const MARVIN_WEBSERVICES_HOST = "http://localhost:8080/";
  const MARVIN_WEBSERVICES_HOST = 'http://localhost:8081/'
  const marvinContainer = document.getElementById('marvin-app')

  if (marvinContainer) {
    createMarvin(marvinContainer, {
      ...getDefaultSettings(MARVIN_WEBSERVICES_HOST),
      ...props.settings
    }).then((marvin) => {
      emit('update-marvin-ref', marvin)
    })
  }
})
</script>

<template>
  <div id="marvin-app"></div>
</template>

<style scoped>
#marvin-app {
  width: 70%;
}
</style>
