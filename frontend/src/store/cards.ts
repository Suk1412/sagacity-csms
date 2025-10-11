import { defineStore } from 'pinia'
import api from '@/api/http'


// 约定返回的数据结构（按你的后端实际来改）
export type CardProfile = {
  url: string
  img: string
  title: string
  theme: string
  time: string
}

export const CardStore = defineStore('card', {
  state: () => ({
    cards: [] as CardProfile[],  // 用数组存所有卡片
  }),
  actions: {
    async fetchCards() {
      try {
        const res = await api.get('/cards')  // 假设你的接口是 /cards
        this.cards = res.data  // 返回一个数组
      } catch (error) {
        console.error('获取卡片数据失败', error)
      }
    },
    logout() {
      this.$reset();
      localStorage.removeItem('card')
    }
  }
})