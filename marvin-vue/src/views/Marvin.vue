<script setup lang="ts">
import { onMounted } from 'vue'
import { createMarvin } from '@chemaxon/marvin'

onMounted(() => {
  const marvinContainer = document.getElementById('marvin-app')

  if (marvinContainer) {
    createMarvin(marvinContainer, {}).then((marvin) => {})
  }
})
</script>

<template>
  <div id="marvin-app"></div>
</template>
