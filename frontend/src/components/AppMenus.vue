<script setup lang="ts">
import axios from 'axios'
import { ref, reactive, onMounted,onUnmounted } from 'vue'
import '@/static/css/index.css';
import '@/static/css/post.css';
import '@/static/js/main.js';
import * as Icons from '@/components/icons/Icons'
import UserLoging from '@/components/UserLoging.vue'
import UserLogin from '@/components/UserLogin.vue'
const isLoggedIn = ref(false)
const loggedInUser = ref('')
const showLogin = ref(false)
const showHoverPopup = ref(false)


async function handleLogin({ username, password }: { username: string, password: string }) {
  try {
    const response = await axios.post('http://localhost:3000/login', {
      username,
      password
    })
    alert('✅ 登录成功：' + response.data.message)
    isLoggedIn.value = true
    loggedInUser.value = username
    showLogin.value = false
  } catch (err: any) {
      if (err.response?.data?.message) {
      alert('❌ 登录失败：' + err.response.data.message);
    } else if (err.response) {
      alert(`❌ 登录失败：HTTP ${err.response.status}`);
    } else if (err.request) {
      alert('❌ 登录失败：网络请求未收到响应或 CORS 错误');
    } else {
      alert('❌ 登录失败：' + err.message);
    }
  }
}

// 登录按钮位置
const anchorPosition = reactive({top: 0,left: 0})
// const hoverPosition = reactive({ top: 0, left: 0 })

// 切换登录弹窗
function toggleLogin() {
  updateAnchorPosition()
  showLogin.value = !showLogin.value
}

const hoverTimeout = ref<ReturnType<typeof setTimeout> | null>(null)

function handleMouseEnter() {
  clearTimeout(hoverTimeout.value!)
  updateAnchorPosition()
  showHoverPopup.value = true
}

function handleMouseLeave() {
  hoverTimeout.value = setTimeout(() => {
    showHoverPopup.value = false
  }, 200)
}

// 鼠标进入弹出层
function handlePopupMouseEnter() {
  clearTimeout(hoverTimeout.value!)
}

// 鼠标离开弹出层
function handlePopupMouseLeave() {
  hoverTimeout.value = setTimeout(() => {
    showHoverPopup.value = false
  }, 200)
}

function handleLogout() {
  isLoggedIn.value = false
  loggedInUser.value = ''
  showHoverPopup.value = false
}


// 获取登录按钮位置
function updateAnchorPosition() {
  const el = document.getElementById('user')
  if (el) {
    const rect = el.getBoundingClientRect()
    anchorPosition.top = rect.bottom
    anchorPosition.left = rect.right
  }
}
// 监听窗口变化时更新位置
onMounted(() => {
  window.addEventListener('resize', updateAnchorPosition)
})
onUnmounted(() => {
  window.removeEventListener('resize', updateAnchorPosition)
})
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
            <template v-if="!isLoggedIn">
              <div id="user" class="header_icon" ref="userBtnRef" @click.stop="toggleLogin">
                <component :is="Icons.IconUser" />
              </div>
            </template>
            <template v-if="isLoggedIn">
              <div id="user" class="header_icon user_avatar"  @mouseenter="handleMouseEnter"  @mouseleave="handleMouseLeave">
                <img src='@/static/img/wx-hero.jpg'>
              </div>
            </template>


            <div id="sidebar_open" class="header_icon">
                <component :is="Icons.IconMore" />
            </div>
        </div>
      </div>
    </div>
      <!-- 独立弹层组件 -->

  <UserLoging
      v-model="showLogin"
      :anchor-position="anchorPosition"
      @submit="handleLogin"
  />

  <UserLogin
    v-model="showHoverPopup"
    :anchor-position="anchorPosition"
    @mouseenter="handlePopupMouseEnter"
    @mouseleave="handlePopupMouseLeave"
    @logout="handleLogout"
  />

</template>

