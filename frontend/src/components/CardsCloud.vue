<template>
  <CardItem v-for="card in filteredCards" :key="card.id" :card="card"/>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import api from '@/api/http'
import CardItem from './CardItem.vue'
import '@/static/js/main.js';


const props = defineProps({activeTag: { type: String, default: '' }})
const cards = ref<any[]>([])

interface Card {
  id: number
  url: string
  img: string
  title: string
  theme: string
  time: string
}

const cardService = {
  async listAllCards(): Promise<Card[]> {
    const res = await api.get('/cards/all') 
    return res.data.data 
  },
}

// 从后端加载数据库内容
async function fetchCards () {
  try {
      const all = await cardService.listAllCards()
      cards.value = all
  } catch (error) {
    console.error('加载卡片失败:', error)
  } finally {
  }
}
onMounted(fetchCards)

const filteredCards = computed(() => {
  if (!props.activeTag || props.activeTag === '') 
    return cards.value
  return cards.value.filter(c => c.title === props.activeTag)
})
</script>

<style scoped>
</style>
