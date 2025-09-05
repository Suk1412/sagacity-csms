<script setup lang="ts">
import '@/static/css/index.css';
import '@/static/css/post.css';
import '@/static/js/main.js';

import AppMenus from '@/components/AppMenus.vue'
import FuncSidebar from '@/components/FuncSidebar.vue'
import AppFooter from '@/components/AppFooter.vue'
import { ref, computed, onMounted, onUnmounted } from "vue";

import NotFound from '@/pages/NotFound.vue'
import Home from '@/pages/Home.vue'
import Writing from '@/pages/Writing.vue'
import Photo from '@/pages/Photo.vue'
import Title from '@/pages/Title.vue'
// 路由表
const routes: Record<string, any> = {
  '/' : Home,
  '/writing': Writing,
 '/photo': Photo,
 '/title': Title}
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
    <AppMenus/>
    <FuncSidebar/>
    <component :is="currentView" />
    <AppFooter/>
</template>


<style>
</style>
