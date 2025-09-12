<template>
  <div
    v-if="modelValue && anchorPosition"
    class="hover-popup"
    :style="popupStyle"
  >

    <div class="uesr-info">
      <img class="user-avatar" :src="userStore.avatar">
      <div>
        <p class="user-nickname">{{ userStore.username }}</p>
        <p class="user-role">管理员</p>
      </div>
    </div>

    <ul class="popup-menu">
      <li class="pb-8"><p><a class="exit_li"><img src="@/static/svg/我的主页.svg" alt="我的主页" />我的主页</a></p></li>
      <li><p><a class="exit_li"><img src="@/static/svg/个人中心.svg" alt="个人中心" />个人中心</a></p></li>
      <li><p><a class="exit_li"><img src="@/static/svg/内容管理.svg" alt="内容管理" />内容管理</a></p></li>
      <li class="pt-8"><p><a class="exit_li" @click="$emit('logout')"><img src="@/static/svg/退出登录.svg" alt="退出登录" />退出登录</a></p></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue'
import { useUserStore } from '@/store/user'
const userStore = useUserStore()



const props = defineProps<{
  modelValue: boolean,
  anchorPosition: { top: number; left: number }
}>()

const emit = defineEmits(['update:modelValue', 'logout'])

const popupStyle = computed(() => ({
  position: 'fixed',
  top: `${props.anchorPosition.top + 10}px`,
  left: `${props.anchorPosition.left + 80}px`,
  transform: 'translate(-100%, 0)',
  zIndex: 10000,
}))
</script>

<style scoped>
.hover-popup {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  padding: 8px 0px 8px 0px; 
}

.uesr-info{
  display: flex; 
  align-items: center;
  padding: 20px 24px;
  gap: 8px;
}

.uesr-info .user-avatar{
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.uesr-info .user-role{
  font-size: 12px;
}


.popup-menu {
  width:218px;
}

.popup-menu{
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.popup-menu li{
  height: 40px;
  display: flex;
  padding: 0 16px;
  align-items: center;
}


.popup-menu li.pb-8{
  padding-bottom: 8px;
  border-bottom: 1px solid #d3dae2;
}
.popup-menu li.pt-8{
  padding-top: 8px;
  border-top: 1px solid #d3dae2;
}

.popup-menu li a.exit_li {
  display: flex;
  align-items: center; /* 垂直居中所有子内容 */
}

.popup-menu li a.exit_li img {
  align-items: center; /* 垂直居中所有子内容 */
  width: 24px;
  height: 40px;         /* 固定高度有助于正确居中 */
  padding: 0px 8px 0px 0px;
}

.popup-menu li:hover {
  background: #f0f0f0;
}
</style>
