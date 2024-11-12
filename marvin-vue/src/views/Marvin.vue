<script setup lang="ts">
import { onMounted } from 'vue'
import { createMarvin } from '@chemaxon/marvin'

onMounted(() => {
  const marvinproContainer = document.getElementById('marvin-app')

  if (marvinproContainer) {
    createMarvin(marvinproContainer, {}).then((mPro) => {})
  }
})
</script>

<template>
  <div id="marvin-app"></div>
</template>
