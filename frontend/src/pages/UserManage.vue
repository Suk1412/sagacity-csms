<template>
    <div class="container">
      <div class="controls">
        <input v-model="query" placeholder="搜索用户名/昵称/邮箱" @keyup.enter="fetchUsers" />
        <button @click="fetchUsers" :disabled="loading">刷新</button>
        <span v-if="loading">加载中…</span>
        <span v-if="error" class="error">{{ error }}</span>
      </div>
    <UserTable
      :columns="columns"
      :rows="users"
      row-id="id"
      :perPage="10"
      :selectable="true"
      :initialSort="{ key: 'id', dir: 'asc' }" 
      @page-change="onPageChange"
      @sort-change="onSortChange"
      @selection-change="onSelectionChange"
    >
      <template #actions="{ row }">
        <button @click="viewUser(row)">查看</button>
        <button @click="openEdit(row)">编辑</button>
        <button @click="deleteUser(row)" class="danger">删除</button>
      </template>
    </UserTable>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import UserTable from '@/components/writings/UserTable.vue' // 路径按你项目结构
import api from '@/api/http'

const loading = ref(false)
const error = ref<string | null>(null)
const query = ref('')

interface User {
  id: number
  username: string
  nickname?: string
  email?: string
  role?: string
}

const userService = {
  async listAllUsers(): Promise<User[]> {
    const res = await api.get('/users/all') // 注意 baseURL + '/users/all'
    console.log(res.data) // 返回对象
    return res.data.data || res.data || []
  }
}

const users = ref<any[]>([]) // 填充你的数据（比如 fetchUsers() 后赋值）
const columns = [
  { key: 'id', label: 'ID', sortable: true },
  { key: 'username', label: '用户名', sortable: true },
  { key: 'nickname', label: '昵称', sortable: true },
  { key: 'email', label: '邮箱', sortable: true },
  { key: 'role', label: '角色', sortable: true },
]

async function fetchUsers() {
  loading.value = true
  error.value = null
  try {
    // 若后端支持 query param，请改为带参数的服务端查询（更高效）
    const all = await userService.listAllUsers()
    // 如果需要基于 query 进行前端过滤（小数据集），做简单过滤：
    if (query.value.trim()) {
      const q = query.value.trim().toLowerCase()
      users.value = all.filter(u =>
        (u.username ?? '').toLowerCase().includes(q) ||
        (u.nickname ?? '').toLowerCase().includes(q) ||
        (u.email ?? '').toLowerCase().includes(q)
      )
    } else {
      users.value = all
    }
  } catch (e: any) {
    console.error('获取用户失败', e)
    error.value = e?.response?.data?.message ?? e?.message ?? '获取用户失败'
  } finally {
    loading.value = false
  }
}
onMounted(fetchUsers)


function onPageChange(p:number) {
  console.log('页码', p)
  // 若服务端分页则在这里触发接口请求
}

function onSortChange(payload:{key?:string, dir?:'asc'|'desc'}) {
  console.log('排序', payload)
  // 若服务端排序则在这里触发接口请求
}

function onSelectionChange(sel:any[]) {
  console.log('已选择', sel)
}

function viewUser(row:any) { /* ... */ }
function openEdit(row:any) { /* ... */ }
function deleteUser(row:any) { /* ... */ }
</script>

<style>
.avatar { width:36px;height:36px;border-radius:4px;object-fit:cover }
.avatar.placeholder { display:flex; align-items:center; justify-content:center; background:#eee; color:#666 }
</style>