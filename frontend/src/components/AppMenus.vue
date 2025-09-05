<script setup lang="ts">
import axios from 'axios'
import { ref, onMounted } from 'vue'
import '@/static/css/index.css';
import '@/static/css/post.css';
import '@/static/js/main.js';
import * as Icons from '@/components/icons/Icons'


import UserLogin from '@/components/UserLogin.vue'
const showLogin = ref(false)
const userBtnRef = ref<HTMLElement | null>(null)
function toggleLogin() {showLogin.value = !showLogin.value}
function onUserSubmit(payload: { username: string; password: string }) {
  console.log('提交登录：', payload)
  showLogin.value = false
}
onMounted(() => {
  userBtnRef.value = document.getElementById('user') as HTMLElement | null
})

async function handleLogin({ username, password }: { username: string, password: string }) {
  try {
    const response = await axios.post('http://localhost:3000/login', {
      username,
      password
    })

    alert('✅ 登录成功：' + response.data.message)
    showLogin.value = false

  } catch (err: any) {
    alert('❌ 登录失败：' + (err.response?.data?.message || '未知错误'))
  }
}
</script>

<template>
    <div class="header">
      <div class="header_container">
         <a class="header_logo" href="#/">
          <component :is="Icons.IconHome" />
          <div class="content">
            <img src="@/assets/favicon.ico" alt="" srcset="">WX
          </div>
         </a>
         <div class="nav_home_container">
            <div class="nav_item">
               <a href="#/title">标签</a>            
            </div>
            <div class="nav_item">
               <a>分类<component :is="Icons.IconBottom" /></a>
               <ul>
                  <li><a>记录点滴</a></li>
                  <li><a>灵感相关</a></li>
                  <li><a>闲言碎语</a></li>
                  <li><a>实用分享</a></li>
                </ul>
            </div>
            <div class="nav_item">
               <a>页面<component :is="Icons.IconBottom" /></a>
                <ul>
                  <li><a href="#/photo">相册</a></li>
                  <li><a href="#/writing">关于</a></li>
                  <li><a>友链</a></li>
                  <li><a>留言</a></li>
                </ul>
            </div>
         </div>
         <div class="header_icon_container">
             <a class="header_icon">
               <component :is="Icons.IconKaiWang" />
            </a>            
            <div id="seach_btn" class="header_icon">
                <component :is="Icons.IconSearch" />
            </div>
            <div id="user" class="header_icon" ref="userBtnRef" @click.stop="toggleLogin">
               <component :is="Icons.IconUser" />
            </div>
            <div id="sidebar_open" class="header_icon">
                <component :is="Icons.IconMore" />
            </div>
        </div>
      </div>
    </div>
      <!-- 独立弹层组件 -->
   <UserLogin
      v-model="showLogin"
      :anchor-el="userBtnRef"
      @submit="onUserSubmit"
   />
</template>

