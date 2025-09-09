<template>
  <div
    v-if="modelValue && anchorPosition"
    class="hover-popup"
    :style="popupStyle"
  >
    <ul class="popup-menu">
      <li><a>我的主页</a></li>
      <li class="pb-8"><a>设置</a></li>
      <li class="pt-8"><p><a class="exit_li" @click="$emit('logout')"><img src="@/static/svg/exit.svg" alt="退出图标" />退出登录</a></p></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from 'vue'


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
}
.popup-menu li.pt-8{
  padding-top: 8px;
  border-top: 1px solid #f6f7f8;
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
