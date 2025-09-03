<template>
  <component :is="iconComponent" />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true }
})

const iconComponent = computed(() => Icons[`Icon${props.name}`])
</script>