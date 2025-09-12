import { defineStore } from 'pinia'
import api from '@/api/http'


// 约定返回的数据结构（按你的后端实际来改）
type UserProfile = {
  username: string
  nickname: string
  email: string
  created_at: string
  avatar: string
  role: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    nickname: '',
    email: '',
    created_at: '',
    avatar: '',
    role: '',
    isLoggedIn: false
  }),
  actions: {
    setUser(p: Partial<UserProfile>) {
      if (p.username !== undefined) this.username = p.username
      if (p.nickname !== undefined) this.nickname = p.nickname
      if (p.email !== undefined) this.email = p.email
      if (p.created_at !== undefined) this.created_at = p.created_at
      if (p.avatar !== undefined) this.avatar = p.avatar
      if (p.role !== undefined) this.role = p.role
      this.isLoggedIn = true
    },
    logout() { this.$reset();localStorage.removeItem('user')},
    async fetchByUsername(username: string) {
        if (!username) throw new Error('username 不能为空')
        try {
            // // const res = await api.get<UserProfile>(`/users/${encodeURIComponent(username)}`)
            // const res = await api.get(`/users/${encodeURIComponent(username)}`)
            // console.log('后端返回结果:', res)   // ✅ 打印看看


            // const url = api.getUri({ url: `/users/${encodeURIComponent(username)}` });
            // console.log('GET ->', url);
            // return res
            console.log('GET ->');
        } catch (e) {
            // 失败时可清理或保留旧数据，按需处理
            throw e
        }
    }
  }
})