<template>
  <component v-for="c in filtered" :key="c.path" :is="c.component"/>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'

const props = defineProps<{  activeTag?: string}>()

// 源码（抽取标签）
const rawMap = import.meta.glob('@/components/tags/*/*.vue', { as: 'raw', eager: true })
// 组件模块（渲染用）
const modMap = import.meta.glob('@/components/tags/*/*.vue')

function extractTagsPerFile(src: string): Set<string> {
  const set = new Set<string>()
  const re = /<span\s+class=(["'])tag\1>\s*([^<\s]+)\s*<\/span>/gi
  let m: RegExpExecArray | null
  while ((m = re.exec(src))) set.add(m[2])
  return set
}

// 文件 -> 标签集合
const fileTags = Object.fromEntries(
  Object.entries(rawMap).map(([path, src]) => [path, extractTagsPerFile(src as string)])
) as Record<string, Set<string>>

// 所有卡片（异步组件）
const allCards = Object.entries(modMap).map(([path, loader]) => ({
  path,
  component: defineAsyncComponent(loader)
}))

// 过滤
const filtered = computed(() => {
  const t = (props.activeTag || '').trim()
  if (!t) return allCards
  return allCards.filter(c => fileTags[c.path]?.has(t))
})
</script>

<style scoped>
</style>
