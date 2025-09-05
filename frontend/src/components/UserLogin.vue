<template>
  <!-- <teleport to="body"> -->
    <!-- 只有在有锚点且需要显示时才渲染，避免定位为 0,0 -->
    <div
      v-if="modelValue && anchorEl"
      ref="root"
      class="user-login"
      :style="inlineStyle"
      role="dialog"
      aria-label="用户登录"
      @click.stop
      @keydown.esc.prevent.stop="close()"
    >
      <form class="user-form" @submit.prevent="submit">
        <label class="field">
          <span>用户名</span>
          <input
            ref="userInput"
            v-model="username"
            type="text"
            placeholder="请输入用户名"
            required
          />
        </label>
        <label class="field">
          <span>密码</span>
          <input
            v-model="password"
            type="password"
            placeholder="请输入密码"
            required
          />
        </label>
        <button class="confirm-btn" type="submit">确认</button>
      </form>
    </div>
  <!-- </teleport> -->
</template>

<script setup lang="ts">
import { ref, watch, nextTick, computed, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  modelValue: boolean
  anchorEl?: HTMLElement | null
  offset?: { x?: number; y?: number }
}>(), {
  offset: () => ({ x: 0, y: 10 }) // 默认向下偏移 10px
})

const emit = defineEmits<{
  'update:modelValue': [boolean]
  'submit': [{ username: string; password: string }]
}>()

const root = ref<HTMLElement | null>(null)
const userInput = ref<HTMLInputElement | null>(null)
const username = ref('')
const password = ref('')

/** 计算定位：用 fixed + 锚点的可视区域坐标，无需处理滚动偏移 */
const inlineStyle = computed(() => {
  const r = props.anchorEl?.getBoundingClientRect()
  if (!r) return {}
  const top  = r.bottom + (props.offset?.y ?? 0)
  const left = r.right  + (props.offset?.x ?? 0)
  return {
    position: 'fixed',
    top: `${top}px`,
    left: `${left}px`,
    transform: 'translate(-100%, 0)', // 右对齐到按钮
    zIndex: 10000
  } as const
})

function close() { emit('update:modelValue', false) }
function submit() { 
   emit('submit', { username: username.value, password: password.value }) 
}

/** 打开时聚焦用户名 */
watch(() => props.modelValue, async v => {
  if (v) {
    await nextTick()
    userInput.value?.focus()
  }
})

/** 点击外部关闭（排除锚点本身） */
function onDocClick(e: MouseEvent) {
  const el = root.value
  if (!el) return
  const t = e.target as Node
  if (el.contains(t)) return
  if (props.anchorEl && props.anchorEl.contains(t)) return
  close()
}

onMounted(() => document.addEventListener('click', onDocClick))
onUnmounted(() => document.removeEventListener('click', onDocClick))
</script>

<style scoped>
.user-login{
  min-width:260px;
  padding:14px 14px 12px;
  background:#fff;
  border:1px solid #e5e7eb;
  border-radius:12px;
  box-shadow:0 12px 28px rgba(0,0,0,.12);
  animation:popIn .16s ease-out;
}
@keyframes popIn{
  from{opacity:0; transform:translate(-100%,-6px)}
  to{opacity:1; transform:translate(-100%,0)}
}

.user-form{display:grid; gap:12px}
.field{display:grid; gap:6px}
.field span{font-size:12px; color:#6b7280}
.field input{
  height:36px; width:100%;
  padding:6px 10px; border:1px solid #e5e7eb; border-radius:8px; outline:0;
  transition:border-color .15s ease, box-shadow .15s ease;
}
.field input:focus{
  border-color:#93c5fd; box-shadow:0 0 0 3px rgba(147,197,253,.35);
}
.confirm-btn{
  height:36px; border:0; border-radius:8px; background:#06dae9; color:#fff; cursor:pointer;
  transition:transform .05s ease, box-shadow .18s ease, background .18s ease;
}
.confirm-btn:active{ transform:translateY(1px) }
</style>
