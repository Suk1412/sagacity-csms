<template>
  <div
    v-if="modelValue && anchorPosition"
    ref="root"
    class="user-login"
    :style="inlineStyle"
    role="dialog"
    aria-label="用户注册"
    @click.stop
    @keydown.esc.prevent.stop="close()"
  >
    <form class="user-form" @submit.prevent="submit">
      <label class="field">
        <span>用户名</span>
        <input
        ref = "userInput"
        v-model="username"
        type="text"
        placeholder="请输入用户名"
        required
        autocomplete="username"
        />
      </label>
      <label class="field">
        <span>密码</span>
        <input
          v-model="password"
          type="password"
          placeholder="请输入密码"
          required
          autocomplete="new-password"
        />
      </label>
      <label class="field">
        <span>确认密码</span>
        <input
          v-model="confirmPassword"
          type="password"
          placeholder="请再次输入密码"
          required
          autocomplete="new-password"
          />
      </label>
      <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
      <p v-if="okMsg" class="ok">{{ okMsg }}</p>

      <div class="button-row">
          <button class="confirm-btn" type="submit">提交</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, computed, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

// 顶部可复用 axios 实例（可用 VITE_API_BASE 设置后端地址）
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '' // 例如 http://localhost:3000
})

const emit = defineEmits<{
  'update:modelValue': [boolean]
  'submit': [{ username: string; password: string }]
  'register': [{ username: string; password: string;}]
}>()

const root = ref<HTMLElement | null>(null)
const userInput = ref<HTMLInputElement | null>(null)
const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const isRegistering = ref(false)

const errorMsg = ref('')
const okMsg = ref('')

const props = defineProps<{
  modelValue: boolean
  anchorPosition: { top: number; left: number }
}>()

const inlineStyle = computed(() => {
    return {
    position: 'fixed',
    top: `${props.anchorPosition.top + 10}px`,
    left: `${props.anchorPosition.left}px`,
    transform: 'translate(-100%, 0)',
    zIndex: 10000
  }
})

function resetMsg() {
  errorMsg.value = ''
  okMsg.value = ''
}

function close() {
  emit('update:modelValue', false)
  isRegistering.value = false // 返回登录模式
  resetMsg()
}

async function submit() {
  resetMsg()
  if (password.value !== confirmPassword.value) {
    errorMsg.value = '两次输入的密码不一致'
    return
  }
  try{
    // 假设你的后端注册路由为 /register
    await api.post('http://localhost:3000/register', {
      username: username.value,
      password: password.value
    })
    okMsg.value = '注册成功'
    emit('submit', { username: username.value, password: password.value }) // 可选
    close()
  } catch (err: any) {
    errorMsg.value = err?.response?.data?.message || err?.message || '注册失败'
  }
}

/** 打开时聚焦用户名 */
watch(() => props.modelValue, async v => {
  if (v) {
    await nextTick()
    userInput.value?.focus()
  }
})

// 点击外部关闭
function onDocClick(e: MouseEvent) {
  const el = root.value
  if (!el) return
  const t = e.target as Node
  if (el.contains(t)) return
  close()
}

onMounted(() => {
  document.addEventListener('click', onDocClick)
})
onUnmounted(() => {
  document.removeEventListener('click', onDocClick)
})
</script>

<style scoped>
.user-login {
  min-width: 300px;
  max-width: 360px;
  padding: 14px 14px 12px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
  animation: popIn 0.16s ease-out;
  z-index: 10000;
}

@keyframes popIn{
  from{opacity:0; transform:translate(-100%,-6px)}
  to{opacity:1; transform:translate(-100%,0)}
}

.user-form {
  display: grid;
  gap: 12px;
}
.field {
  display: grid;
  gap: 6px;
}
.field span {
  font-size: 12px;
  color: #6b7280;
}
.field input {
  height: 36px;
  width: 100%;
  padding: 6px 10px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  outline: 0;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;
}
.field input:focus {
  border-color: #93c5fd;
  box-shadow: 0 0 0 3px rgba(147, 197, 253, 0.35);
}
.button-row {
  display: flex;
  gap: 10px;
}
.confirm-btn {
  flex: 1;
  height: 36px;
  border: 0;
  border-radius: 8px;
  background: #06dae9;
  color: #fff;
  cursor: pointer;
  transition: transform 0.05s ease, box-shadow 0.18s ease, background 0.18s ease;
}
.confirm-btn:active {
  transform: translateY(1px);
}
</style>
