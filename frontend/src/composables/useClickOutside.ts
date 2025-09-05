// src/composables/useClickOutside.ts
import { onMounted, onUnmounted, Ref } from 'vue'

export function useClickOutside(target: Ref<HTMLElement | null>, handler: (e: MouseEvent) => void) {
  function onDocClick(e: MouseEvent) {
    const el = target.value
    if (!el) return
    const t = e.target as Node
    if (!el.contains(t)) handler(e)
  }
  onMounted(() => document.addEventListener('click', onDocClick))
  onUnmounted(() => document.removeEventListener('click', onDocClick))
}
