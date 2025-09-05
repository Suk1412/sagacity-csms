<template>
    <div class="container">
        <section class="articles">
            <TagsCloud v-model="activeTag"/>
            <CardsCloud :activeTag="activeTag" />
        </section>
    </div>
    <FuncCtrlCard/>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CardsCloud from '@/components/CardsCloud.vue';
import TagsCloud from '@/components/TagsCloud.vue';
import FuncCtrlCard from '@/components/FuncCtrlCard.vue'

const activeTag = ref('') // 默认为全部
</script>

<style scoped>
</style>
