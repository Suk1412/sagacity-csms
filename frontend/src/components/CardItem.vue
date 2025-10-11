<script setup lang="ts">
import '@/static/js/main.js';
const props = defineProps({
  card: {
    type: Object,
    required: true
  }
})
const defaultImg = '@/static/img/default.webp'

</script>

<template>
    <a class="article-card fade-in visible" :href=card.url>
        <div class="img">
            <img :src=card.img />
            <div class="cover_title"></div>
        </div>
        <div class="content">
            <div class="tags"><span class="tag">{{ card.title }}</span></div>
            <h3>{{ card.theme }}</h3>
            <p>{{ card.time }}</p>
        </div>
    </a>
</template>
