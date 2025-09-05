<template>
  <!-- 右侧“触发条”：很窄，贴右侧 -->
  <div
    class="edge-trigger"
    @mouseenter="open()"
    @click="toggle()"
    aria-hidden="true"
  ></div>

  <!-- 右侧提示小图标（可点可悬停） -->
  <button
    class="edge-hint"
    type="button"
    :aria-expanded="isOpen ? 'true' : 'false'"
    @mouseenter="open()"
    @click="toggle()"
    title="打开工具栏"
  >
    <component :is="Icons.IconLeft" />
  </button>

  <!-- 右侧滑出面板 -->
  <aside
    class="panel"
    :class="{ open: isOpen }"
    @mouseenter="cancelAutoClose()"
    @mouseleave="scheduleAutoClose()"
    role="complementary"
    aria-label="侧边工具栏"
  >
    <div class="panel_content">
      <button class="btn top" @click="onAction('A')"><component :is="Icons.IconFileAdd" /></button>
      <button class="btn middle" @click="onAction('B')"><component :is="Icons.IconFileDow" /></button>
      <button class="btn footer" @click="onAction('C')"><component :is="Icons.IconFileRm" /></button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as Icons from '@/components/icons/Icons'

const isOpen = ref(false)
let closeTimer: number | null = null

const panelRef = ref<HTMLElement | null>(null)
const hintRef  = ref<HTMLButtonElement | null>(null)

function open() {
  isOpen.value = true
  cancelAutoClose()
}
function close() {
  isOpen.value = false
  cancelAutoClose()
}
function toggle() {
  isOpen.value ? close() : open()
}
function scheduleAutoClose(delay = 100) {
  cancelAutoClose()
  closeTimer = window.setTimeout(() => (isOpen.value = false), delay)
}
function cancelAutoClose() {
  if (closeTimer) {
    clearTimeout(closeTimer)
    closeTimer = null
  }
}

/* 额外：当鼠标接近屏幕最右边（8px内）也自动打开 */
function handleMouseMoveOpen(e: MouseEvent) {
  const x = e.clientX
  const w = window.innerWidth
  if (!isOpen.value && x >= w - 8) open()
}


/* 新增：远离右边缘并且不在面板/提示图标上，则计划收起 */
function handleMouseMoveClose(e: MouseEvent) {
  if (!isOpen.value) return

  const x = e.clientX
  const w = window.innerWidth
  const away = x < w - 120; // 远离右边 120px（可调）

  const target = e.target as Node | null
  const inPanel = !!(panelRef.value && target && panelRef.value.contains(target))
  const inHint  = !!(hintRef.value  && target && hintRef.value.contains(target))

  if (away && !inPanel && !inHint) {
    scheduleAutoClose(100) // 稍微延时，避免抖动
  } else {
    // 仍在边缘/面板/提示上，取消关闭
    cancelAutoClose()
  }
}

function handleDocumentClick(e: MouseEvent) {
  if (!isOpen.value) return
  const target = e.target as Node | null
  const inPanel = !!(panelRef.value && target && panelRef.value.contains(target))
  const inHint  = !!(hintRef.value  && target && hintRef.value.contains(target))
  if (!inPanel && !inHint) close()
}



onMounted(() => {
  window.addEventListener('mousemove', handleMouseMoveOpen,  { passive: true })
  window.addEventListener('mousemove', handleMouseMoveClose, { passive: true })
  document.addEventListener('click', handleDocumentClick, { capture: true })
})
onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMoveOpen)
  window.removeEventListener('mousemove', handleMouseMoveClose)
  document.removeEventListener('click', handleDocumentClick, { capture: true })
  cancelAutoClose()
})

function onAction(name: string) {
  // 这里写具体业务
  console.log('clicked', name)
}
</script>

<style scoped>
/* 触发条：贴右侧、细长 */
.edge-trigger {
  position: fixed;
  top: 0;
  right: 0;
  width: 10px;          /* 触发条宽度 */
  height: 100vh;
  background: transparent; /* 可改为半透明调试：rgba(0,0,0,.04) */
  z-index: 9997;
  cursor: pointer;
}

/* 边缘提示图标（小圆按钮） */
.edge-hint {
  position: fixed;
  right: 0;                /* 紧贴右边缘 */
  top: 35%;
  width: 24px;             /* 半圆宽度（比高度小一半） */
  height: 48px;            /* 半圆高度 */
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 24px 0 0 24px;   /* 左侧圆角，右侧直边 */
  border: 1px solid #e6e6e6;
  background: #fff;
  color: #666;
  box-shadow: 0 6px 16px rgba(0,0,0,0.12);
  z-index: 9998;
  cursor: pointer;
  transition: transform .18s ease, box-shadow .18s ease;
}

.edge-hint:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.16);
}

/* 面板：右侧滑出（初始在屏外） */
.panel {
  position: fixed;
  top: 35%;
  right: 0;
  background: #ffffff;
  border-left: 1px solid #eaeaea;
  box-shadow: -6px 0 24px rgba(0,0,0,0.08);
  z-index: 9999;

  /* 动画关键：平移 + 圆角变化 */
  transform: translateX(100%);
  border-top-left-radius: 12px;     /* 初始较小圆角 */
  border-bottom-left-radius: 12px;
  transition:
    transform .24s ease,
    border-radius .24s ease,
    box-shadow .24s ease;
}

/* 打开后：完全进入 + 圆角更大（视觉更柔和） */
.panel.open {
  transform: translateX(0);
  border-top-left-radius: 22px;     /* 更大的圆角 */
  border-bottom-left-radius: 22px;
  box-shadow: -10px 0 28px rgba(0,0,0,0.12);
}


.panel_content {
  /* padding: 16px; */
  display: grid;
}

/* 三个按钮示例 */
.btn {
  appearance: none;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  color: #111827;
  padding: 10px 12px;
  cursor: pointer;
  transition: background .18s ease, transform .06s ease, box-shadow .18s ease;
}
.btn.top {
  border-radius: 20px 0 0 0px;
}
.btn.footer {
  border-radius: 0px 0 0 20px;
}

.btn:hover {
  background: #f3f4f6;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
.btn:active {
  transform: translateY(1px);
}
</style>
