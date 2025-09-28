<!-- 读取文章标签 -->
 <template>
  <ul id="toc">
    <li
      v-for="(item, idx) in items"
      :key="item.id"
      :class="['toc-level-2', { active: active === item.id }]"
    >
      <a href="#" @click.prevent="scrollTo(item.id)">{{ item.text }}</a>
    </li>
  </ul>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'

const items = ref([])
const active = ref(null)
const route = useRoute()

// 简单 slugify（用于生成 id）
function slugify(text) {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\u4e00-\u9fa5\w\-]/g, '') // 允许中文、字母、数字和 -
    .replace(/\-+/g, '-')
}

// 收集 h2，并为缺 id 的元素分配 id
function collectHeadings() {
  const container = document.querySelector('.post_article .post_content')
  if (!container) {
    items.value = []
    active.value = null
    return
  }
  const headings = Array.from(container.querySelectorAll('h2'))
  items.value = headings.map((h) => {
    const text = h.textContent.trim()
    if (!h.id || h.id === '') {
      let id = slugify(text) || `heading-${Math.random().toString(36).slice(2, 8)}`
      // 保证 id 唯一
      let uq = id
      let i = 1
      while (document.getElementById(uq)) {
        uq = `${id}-${i++}`
      }
      h.id = uq
    }
    return { id: h.id, text }
  })
}

// 点击滚动到对应标题（平滑）
function scrollTo(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  // 更新地址栏 hash（可选）
  history.replaceState(null, '', `#${id}`)
}

// 滚动时决定哪个 section active
function onScroll() {
  if (items.value.length === 0) return
  const offset = window.scrollY + 120 // 120px 为锚点偏移（根据你的 header 高度调整）
  let current = null
  for (const it of items.value) {
    const el = document.getElementById(it.id)
    if (!el) continue
    if (el.offsetTop <= offset) current = it.id
  }
  active.value = current || items.value[0]?.id || null
}

let observer = null
onMounted(async () => {
  await nextTick()
  // 第一次收集
  collectHeadings()
  // 高亮一次
  onScroll()

  // 监听滚动（passive）
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)

  // 观察文章节点变化（文章是路由组件，内容可能懒加载）
  const container = document.querySelector('.post_article .post_content')
  if (container) {
    observer = new MutationObserver(() => {
      // 内容变更时重新收集
      collectHeadings()
      // 触发一次高亮计算
      onScroll()
    })
    observer.observe(container, { childList: true, subtree: true, characterData: true })
  }
})

// 当路由切换（例如右侧由 RouterView 更新），重新收集
watch(() => route.fullPath, () => {
  // 小延迟，等右侧组件渲染 DOM
  setTimeout(() => {
    collectHeadings()
    onScroll()
  }, 50)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  if (observer) observer.disconnect()
})
</script>

<style scoped>
/* 仅示例样式，按照你项目风格调整 */
.toc-level-2 { list-style: none; margin: 6px 0; }
.toc-level-2 a { color: inherit; text-decoration: none; cursor: pointer; }
.toc-level-2.active a { font-weight: 700; color: var(--accent, #409eff); }
</style>
