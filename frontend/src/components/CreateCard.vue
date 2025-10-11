<template>
  <teleport to="body">
    <transition name="modal-fade" appear>
      <div
        v-if="showLocal"
        class="modal-overlay"
        @click.self="onMaskClick"
        role="presentation"
      >
        <div
          class="modal"
          :style="{ width: width }"
          role="dialog"
          aria-modal="true"
          :aria-label="ariaLabel"
          ref="dialog"
          @keydown.tab="onTabKey"
        >
          <header class="modal-header">
            <h3 class="modal-title"><slot name="title">{{ title }}</slot></h3>
            <button class="modal-close" @click="close" aria-label="关闭">×</button>
          </header>

          <section class="modal-body">
            <slot>
            </slot>
          </section>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';

const props = defineProps({
  // 使用 v-model:show
  show: { type: Boolean, default: false },
  title: { type: String, default: '' },
  width: { type: String, default: '520px' },
  closeOnMask: { type: Boolean, default: true },
  closeOnEsc: { type: Boolean, default: true },
  ariaLabel: { type: String, default: 'dialog' }
});

const emit = defineEmits(['update:show', 'close', 'confirm']);

const showLocal = ref(props.show);
const dialog = ref(null);
let lastActive = null;

watch(() => props.show, (v) => {
  showLocal.value = v;
});

watch(showLocal, async (visible) => {
  emit('update:show', visible);
  if (visible) {
    lockScroll();
    saveFocus();
    await nextTick();
    focusFirstElement();
    if (props.closeOnEsc) window.addEventListener('keydown', onKeydown);
  } else {
    unlockScroll();
    restoreFocus();
    window.removeEventListener('keydown', onKeydown);
  }
});

function open() {
  showLocal.value = true;
}
function close() {
  showLocal.value = false;
  emit('close');
}
function confirm() {
  emit('confirm');
  close();
}

function onMaskClick() {
  if (props.closeOnMask) close();
}

function onKeydown(e) {
  if (e.key === 'Escape' && showLocal.value && props.closeOnEsc) {
    e.stopPropagation();
    close();
  }
}

// 简单聚焦管理：记录打开前焦点，打开后聚焦第一个可交互元素
function saveFocus() {
  lastActive = document.activeElement;
}
function restoreFocus() {
  if (lastActive && typeof lastActive.focus === 'function') lastActive.focus();
  lastActive = null;
}
function focusFirstElement() {
  if (!dialog.value) return;
  const els = dialog.value.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (els.length) els[0].focus();
  else dialog.value.focus?.();
}

// 简单 tab 锁定（循环 tab）
function onTabKey(e) {
  if (e.key !== 'Tab') return;
  const focusable = dialog.value.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (!focusable.length) {
    e.preventDefault();
    return;
  }
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  } else if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  }
}

// 滚动锁
function lockScroll() {
  const body = document.body;
  body.style.overflow = 'hidden';
}
function unlockScroll() {
  document.body.style.overflow = '';
}

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown);
  unlockScroll();
});
</script>

<style scoped>
section {
    width: 100%;
    position: relative;
    display: flex;
    margin-bottom: 0px;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,0.45);
  z-index: 10000;
  padding: 20px;
  box-sizing: border-box;
}
.modal {
  background: #fff;
  border-radius: 8px;
  max-height: 90vh;
  overflow: auto;
  box-shadow: 0 12px 40px rgba(0,0,0,0.25);
  outline: none;
}
.modal-header {
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding: 14px 18px;
  border-bottom:1px solid #eee;
}
.modal-title { margin:0; font-size: 16px; }
.modal-close {
  border: none;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
}
.modal-body { padding: 16px 18px; }
.modal-footer { padding: 12px 18px; border-top:1px solid #eee; display:flex; gap:20px; justify-content:center; }

/* transition */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 160ms ease, transform 160ms ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* simple button classes used in default footer */
.btn-confirm { padding:6px 12px; }
.btn-cancel { padding:6px 12px; }
</style>
