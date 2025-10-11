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
    <CreateCard
        v-model:show="showModal"
        :title="modalTitle"
        :width="'560px'"
        @close="onClose"
      >
        <!-- 默认 slot：主体内容 - 根据 action 渲染 -->
        <!-- <template #default> -->
        <template>
          <div v-if="action === 'A'">
            <form class="card-form" @submit="submit">
              <div class="card-info">
                <label class="label">图片</label>
                <button class="styled-button" @click="triggerFileInput" type="button">选择本地图片</button>
              </div>
              <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*" style="display:none" />
              <div v-if="imagePreview" class="image-preview">
                <img :src="imagePreview" alt="选中图片" />
              </div>
              <div class="card-info">
                <label class="label">链接</label>
                <input id="card-url" type="text" v-model="url" placeholder="待输入链接" class="styled-input"/>
              </div>
              <div class="card-info">
                <label class="label">标签</label>
                <input id="card-title" type="text" v-model="title" placeholder="待输入标签" class="styled-input"/>
              </div>
              <div class="card-info">
                <label class="label">主题</label>
                <input id="card-theme" type="text" v-model="theme" placeholder="待输入主题" class="styled-input"/>
              </div>
              <div class="footer-btn">
                <button class="btn-confirm" type="submit">提交</button>
                <button @click="showModal = false" class="btn-cancel">关闭</button>
              </div>
            </form>
          </div>
          <div v-else-if="action === 'B'">
            <p>这是 B 弹窗的内容（例如表单）。</p>
            <input v-model="form.input" placeholder="示例输入" />
          </div>
          <div v-else>
            <p>默认弹窗内容</p>
          </div>
        </template>
    </CreateCard>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted} from 'vue'
import * as Icons from '@/components/icons/Icons'
import CreateCard from '@/components/CreateCard.vue'
import api from '@/api/http'

const today = ref(new Date().toISOString().slice(0, 10))

const emit = defineEmits<{
  'addcard': [{ url:string; img: string; title: string; theme: string }]
}>()

const showModal = ref(false);
const action = ref<string | null>(null)
const modalTitle = ref('提示');
const form = ref({ input: '' });
const fileInput = ref<HTMLInputElement | null>(null)
const imagePreview = ref('')
const url = ref('')
const img = ref('')
const title = ref('')
const theme = ref('')

const errorMsg = ref('')
const okMsg = ref('')


function onAction(act: string) {
  action.value = act;
  if (act === 'A') modalTitle.value = '创建标签';
  else if (act === 'B') modalTitle.value = '操作 B';
  else modalTitle.value = '提示';
  showModal.value = true;
}

// 触发文件选择
function triggerFileInput() {
  fileInput.value?.click()
}

async function handleFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  imagePreview.value = URL.createObjectURL(file)
  const formData = new FormData()
  formData.append('file', file)
  try {
    const res = await api.post('/upload', formData)
    img.value = res.data.url  // 使用后端返回的永久路径
    console.log('服务器图片路径:', img.value)
  } catch (err) {
    console.error('上传失败', err)
    confirm("上传失败")
  }
}

function resetMsg() {
  errorMsg.value = ''
  okMsg.value = ''
}

async function submit() {
  resetMsg()
  try{
    showModal.value = false
    await api.post('/addcard', {
      url: url.value,
      img: img.value,
      title: title.value,
      theme: theme.value,
    })
    okMsg.value = '保存成功'
    emit('addcard', { url:url.value, img: img.value, title: title.value, theme: theme.value }) // 可选
    close()
  } catch (err: any) {
    errorMsg.value = err?.response?.data?.message || err?.message || '保存失败'
  }
}

function onClose() {
  console.log('弹窗关闭');
  action.value = null;
}


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
  // cancelAutoClose()
  resetMsg()
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
.card-info{
  width: 530px;
  display: flex;
  align-items: center;
  justify-content:flex-start;
  
}

.card-info label{
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  padding-right: 50px;
  display: flex;
  align-items: center;   /* label 内部文字垂直居中 */
}

.styled-input {
  width: 75%;
  padding: 6px 12px;    /* 内边距，让输入文字不贴边 */
  font-size: 20px;       /* 字体大小 */
  border: 1px solid #ccc; /* 默认边框颜色 */
  border-radius: 6px;     /* 圆角 */
  outline: none;          /* 去掉默认蓝色轮廓线 */
  transition: all 0.2s;   /* 平滑过渡效果 */
}

.image-preview img {
  margin-top: 8px;
  width: 307px;
  height: 164px;
  border-radius: 6px;
  object-fit: cover;
  border: 1px solid #ccc;
}

/* 主按钮样式 */
.btn-confirm,.btn-cancel {
  padding: 10px 20px;          /* 内边距 */
  font-size: 14px;
  font-weight: 500;
  color: #fff;                 /* 字体颜色 */
  background: linear-gradient(90deg, #4facfe, #00f2fe); /* 渐变背景 */
  border: none;
  border-radius: 6px;           /* 圆角 */
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1); /* 阴影 */
}

/* 悬停效果 */
.btn-confirm:hover,.btn-cancel:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 10px rgba(0,0,0,0.15);
}

/* 点击效果 */
.btn-confirm:active {
  transform: translateY(0);
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

/* 次要按钮样式 */
.btn-cancel {
  background: #f0f0f0;
  color: #333;
}

.btn-cancel {
  background: #e0e0e0;
}
.footer-btn { 
  padding: 12px 18px;
  padding-top: 25px;
  border-top:1px solid #eee; 
  display:flex; 
  gap:20px; 
  justify-content:center; 
  
}

</style>
