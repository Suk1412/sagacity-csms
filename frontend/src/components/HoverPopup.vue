<template>
  <div class="wrapper">
    <!-- 悬停目标 -->
    <div 
      class="hover-target"
      @mouseenter="showPopup = true"
      @mouseleave="showPopup = false"
    >
    
    <TitleItem>
        <template #heading>{{ triggerText }}</template>
        <template #icon v-if="hasItems"><Bottom  width="16" height="16" /></template>
    </TitleItem>
      
      <!-- 悬浮窗 -->
      <ul v-if="hasItems && showPopup" class="popup">
        <li
          v-for="(item, index) in items"
          :key="index"
          class="popup-item"
          @click="$emit('item-click', item)" 
        >
          <a>{{ item }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>


<script setup>
import TitleItem from './TitleItem.vue'
import Bottom from './icons/IconBottom.vue' 
</script>

<script>
export default {
  name: "HoverPopup",
  props: {
    triggerText: {
      type: String,
      default: "悬停我" // 默认文字
    },
    items: {type: Array,}
  },
  data() {
    return {
      showPopup: false
    };
  },
  computed: {
    // 判断 items 是否存在且非空
    hasItems() {
      return this.items && this.items.length > 0;
    }
  },
};
</script>

<style scoped>
.wrapper {
  display: inline-block;
  position: relative;

}
.hover-target {
  height: 45px;
  width: 75px;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
}

.popup {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 0px;
  border: 1px solid #ccc;
  padding: 10px 0;
  box-shadow: 0 8px 16px -4px #2c2d300c;
  border-radius: 10px;
  width: 140px;
  z-index: 1000;
  background-color: white;
  backdrop-filter: blur(20px);
  overflow: hidden;
}

.popup-item {
  color: black;
  padding: 5px 20px;
}

.popup-item:hover {
  color: #2867f0;
  background-color: #3575ff74;
}

.popup-item a {
  display: block; /* 必须 block 才能平滑移动 */
  padding: 0;
  list-style: none;
  transition: padding-left 0.5s ease;
}

.popup-item:hover a{
  padding-left: 25%;
}

</style>
