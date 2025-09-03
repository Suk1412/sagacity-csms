<script setup>
import Bottom from './icons/IconBottom.vue' 
import TitleItem from './TitleItem.vue'
import HoverPopup from './HoverPopup.vue'
import { reactive } from 'vue'


const menus = reactive([
  { open: false, items: ['记录点滴', '灵感相关', '闲言碎语', '实用分享'] },
  { open: false, items: ['相册', '关于', '友链', '留言'] },
])

function toggleMenu(index) {
  // 关闭其他菜单
  menus.forEach((menu, i) => {
    menu.open = i === index ? !menu.open : false
  })
}

function closeMenu(index) {
  menus[index].open = false
}
</script>
<script>
export default {
  methods: {
    handleItemClick(item) {
      alert("你点击了：" + item);
    }
  }
};
</script>

<template>
  <div class="menu-bar">
    <!-- 第一个下拉 -->
    <div class="menu">
      <HoverPopup triggerText="标签">
      </HoverPopup>
    </div>

    <!-- 第二个下拉 -->
    <div class="menu" >
      <HoverPopup triggerText="分类"  :items="['记录点滴', '灵感相关', '闲言碎语', '实用分享']" @item-click="handleItemClick">
      </HoverPopup>
    </div>

    <!-- 第三个下拉 -->
    <div class="menu">
      <HoverPopup triggerText="页面"  :items="['相册', '关于', '友链', '留言']" @item-click="handleItemClick">
      </HoverPopup>
    </div>
  </div>
</template>



<style scoped>
.menu-bar {
  display: inline-flex;          /* 横向排列文字和图标 */
  align-items: center;           /* 垂直居中 */
  justify-content: center;       /* 水平居中 */
  padding: 0rem 1.2rem;
  background: #fff;
  border-radius: 100px;
  background-color: #fff;
}

.menu {
  display: flex;          /* 横向排列文字和图标 */
  position: relative;
  align-items: stretch;
  padding: 0rem 0rem;
  background-color: rgb(255, 255, 255);
}
</style>
