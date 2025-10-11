<template>
  <div class="searchable-select">
    <input
      v-model="inputText"
      placeholder="选择或输入网站"
      @focus="openDropdown = true"
      @blur="onBlur"
      @keydown.down.prevent="highlight = Math.min(highlight + 1, filtered.length - 1)"
      @keydown.up.prevent="highlight = Math.max(highlight - 1, 0)"
      @keydown.enter.prevent="selectOption(filtered[highlight])"
    />
    <ul v-if="openDropdown && filtered.length">
      <li
        v-for="(opt, idx) in filtered"
        :key="opt.value"
        :class="{ highlighted: idx === highlight }"
        @mousedown.prevent="selectOption(opt)"
      >
        {{ opt.label }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const options = [
  { value: 'www.runoob.com', label: 'Runoob' },
  { value: 'www.google.com', label: 'Google' }
]

const selected = ref('')
const inputText = ref('')
const openDropdown = ref(false)
const highlight = ref(0)

const filtered = computed(() => {
  if (!inputText.value) return options
  return options.filter(o =>
    o.label.toLowerCase().includes(inputText.value.toLowerCase())
  )
})

function selectOption(opt) {
  if (opt) {
    selected.value = opt.value
    inputText.value = opt.label
  } else {
    // 用户输入的自定义值
    selected.value = inputText.value
  }
  openDropdown.value = false
}

function onBlur() {
  // 延迟关闭以确保点击选项生效
  setTimeout(() => {
    openDropdown.value = false
    if (!options.find(o => o.label === inputText.value)) {
      selected.value = inputText.value
    }
  }, 150)
}

// 初始化显示
watch(selected, val => {
  const opt = options.find(o => o.value === val)
  inputText.value = opt ? opt.label : val
})
</script>

<style scoped>
.searchable-select { position: relative; width: 200px; }
input { width: 100%; padding: 4px; }
ul { position: absolute; top: 100%; left: 0; right: 0; border: 1px solid #ccc; background: white; max-height: 120px; overflow: auto; margin:0; padding:0; list-style:none; }
li { padding: 4px; cursor: pointer; }
li.highlighted { background-color: #f0f0f0; }
</style>
