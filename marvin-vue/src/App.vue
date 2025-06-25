<script setup lang="ts">
import { ref } from 'vue'
import Marvin from './views/Marvin.vue'
import Examples from './views/examples/Examples.vue'
import type { Marvin as MarvinRef } from '@chemaxon/marvin'

const marvinRef = ref<MarvinRef | null>(null)

const setMarvinRef = (refValue: MarvinRef) => {
  marvinRef.value = refValue
}
</script>

<template>
  <section id="app">
    <Marvin :settings="{}" @update-marvin-ref="setMarvinRef" />
    <Examples :marvinRef="marvinRef" />
  </section>
</template>

<style>
#app {
  display: flex;
  flex-direction: row;
  width: 100vw;
  flex: 1;
}

* {
  box-sizing: border-box;
}

body,
html {
  margin: 0;
  padding: 0;
}
</style>
