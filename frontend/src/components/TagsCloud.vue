<template>
  <div class="tags_card">
    <a
      v-for="t in tagsSorted"
      :key="t.label"
      class="item"
      :class="{ active: t.label === activeTag }"
      href="javascript:void(0)"
      @click="activeTag =(activeTag === t.label ? '' : t.label)"
      >
      {{ t.label }}
        <div class="count">{{ t.count }}</div>
    </a>
  </div>
</template>

<script setup lang="ts">
// Vite: 读取目录下所有 .vue 源码作为字符串
import { ref } from 'vue'
const files = import.meta.glob('@/components/tags/*/*.vue', { as: 'raw', eager: true })
type TagCount = { label: string; count: number }
// 把每个 .vue 源里出现的 <span class="tag">#xxx</span> 抽出来
function extractTagCounts(srcMap: Record<string, string>): TagCount[] {
  const map = new Map<string, number>()
  // 每个文件内先去重（一个卡片里出现多次相同 tag 也只算一次）
  const tagRe = /<span\s+class=(["'])tag\1>\s*([^<\s]+)\s*<\/span>/gi
  Object.values(srcMap).forEach((src) => {
    const seenInFile = new Set<string>()
    let m: RegExpExecArray | null
    while ((m = tagRe.exec(src))) {
      const tag = m[2]
      seenInFile.add(tag)
    }
    for (const tag of seenInFile) {
      map.set(tag, (map.get(tag) || 0) + 1)
    }
  })
  return Array.from(map, ([label, count]) => ({ label, count }))
}

const tags = extractTagCounts(files as Record<string, string>)
// 排序（数量降序，其次字母升序）
const tagsSorted = tags
  .slice()
  .sort((a, b) => (b.count - a.count) || a.label.localeCompare(b.label))

// 你可以按需设置哪个 tag 高亮
const activeTag = defineModel<string>({ default: '' })
// const activeTag = ref('')
// function setActive(label: string) {
//   activeTag.value = (activeTag.value === label ? '' : label)
// }

function makeTagHref(label: string) {
  // 自行替换为你的路由/链接规则
  return `https://zyyo.net/tag/${encodeURIComponent(label)}`
}
</script>

<style scoped>
</style>
