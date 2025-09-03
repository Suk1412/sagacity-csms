<!-- <script>
import Home from './Home.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'

const routes = {
  '/': Home,
  '/about': About
}

export default {
  data() {
    return {
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
		  this.currentPath = window.location.hash
		})
  }
}
</script> -->

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Home from './Home.vue'
import About from './About.vue'
import NotFound from './NotFound.vue'
// 路由表
const routes: Record<string, any> = {
  '/': Home,
  '/about': About}
// 当前路径（去掉 hash）
const currentPath = ref(window.location.hash)
// 当前视图：根据 hash 计算要渲染的组件
const currentView = computed(() => {return routes[currentPath.value.slice(1) || '/'] || NotFound})
// 监听 hash 变化
function onHashChange() {currentPath.value = window.location.hash}
onMounted(() => {window.addEventListener('hashchange', onHashChange)})
onUnmounted(() => {window.removeEventListener('hashchange', onHashChange)})
</script>

<template>
  <a href="#/">Home</a> |
  <a href="#/about">About</a> |
  <a href="#/non-existent-path">Broken Link</a>
  <component :is="currentView" />
</template>
