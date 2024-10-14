<script setup lang="ts">
import { onMounted } from 'vue'
import { createMarvinPro } from 'marvinpro'

onMounted(() => {
  const marvinproContainer = document.getElementById('marvin-app')

  if (marvinproContainer) {
    createMarvinPro(marvinproContainer, {}).then((mPro) => {})
  }
})
</script>

<template>
  <div id="marvin-app"></div>
</template>
