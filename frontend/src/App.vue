<script setup lang="ts">
import '@/static/css/index.css';
import '@/static/css/post.css';
import '@/static/js/main.js';

import AppMenus from '@/components/AppMenus.vue'
import FuncSidebar from '@/components/FuncSidebar.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>


<template>
    <AppMenus/>
    <FuncSidebar/>
    <router-view />
    <AppFooter/>
</template>


<style>
</style>
