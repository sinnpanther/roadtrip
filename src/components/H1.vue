<template>
  <h1 :class="['text-3xl md:text-4xl font-bold tracking-tight', cls]">
    <slot>{{ title }}</slot>
  </h1>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string
  cls?: string // classes additionnelles optionnelles
}>()
</script>
