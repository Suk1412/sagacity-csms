<template>
  <div class="tags_card">
    <a
      v-for="t in tagsSorted"
      :key="t.label"
      class="item"
      :class="{ active: t.label === activeTag }"
      href="javascript:void(0)"
      @click="activeTag =(activeTag === t.label ? '' : t.label)">{{ t.label }}
      <div class="count">{{ t.count }}</div>
    </a>
  </div>
</template>

<script setup lang="ts" async>
// Vite: 读取目录下所有 .vue 源码作为字符串
import { ref,onMounted ,computed } from 'vue'
import api from '@/api/http'
type TagCount = { label: string; count: number }
interface Tag { title: string }
const tags = ref<TagCount[]>([]) // ✅ 改成响应式

const TagService = {
  async listAllTags(): Promise<Tag[]> {
    const res = await api.get('/cards/title')
    return res.data.data
  },
}

async function extractTagCounts(){
  const all = await TagService.listAllTags()
  const arr = all
  const map = new Map<string, number>()
  // 每个文件内先去重（一个卡片里出现多次相同 tag 也只算一次）
  for (const item of arr) {
    const tag = item.title
    map.set(tag, (map.get(tag) || 0) + 1)
  }
  return Array.from(map, ([label, count]) => ({ label, count }))
}
onMounted(async () => {
  tags.value = await extractTagCounts()
})
// 排序（数量降序，其次字母升序）
const tagsSorted = computed(() =>
  tags.value.slice().sort((a, b) => (b.count - a.count) || a.label.localeCompare(b.label))
)
// 你可以按需设置哪个 tag 高亮
const activeTag = defineModel<string>({ default: '' })

</script>

<style scoped>
</style>
