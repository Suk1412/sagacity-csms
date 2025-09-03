<template>
  <div class="menu-item"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false">    
    <span class="icon">
      <slot v-if="!isHovered" name="icon-default"></slot>
      <slot v-else name="icon-hover"></slot>
    </span>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  triggerText: {
    type: String,
    default: '悬浮前'
  }
})

const isHovered = ref(false)
</script>

<style scoped>
.menu-item {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

</style>
