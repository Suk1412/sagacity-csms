import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Home from '@/pages/Home.vue'
import Detail from '@/pages/Detail.vue'
import GY from '@/components/writings/GY.vue'
import LY from '@/components/writings/LY.vue'
import Photo from '@/pages/Photo.vue'
import Title from '@/pages/Title.vue'
import UserManage from '@/pages/UserManage.vue'

const routes:RouteRecordRaw[] = [
  { path: '/', component: Home },
  { path: '/detail', component: Detail,
    children: [
      { path: '', component: GY },
      { path: 'gy', component: GY },
      { path: 'ly', component: LY }
    ]
  },
  { path: '/photo', component: Photo },
  { path: '/title', component: Title },
  { path: '/usermanage', component: UserManage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router