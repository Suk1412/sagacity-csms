<script setup>
</script>

<template>
  <div class="item">
    <div class="details">
      <slot name="heading"></slot>
      <slot name="icon"></slot>
    </div>

  </div>
</template>

<style scoped>
.item {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  color: black;
  background-color: #fff;
  border-radius: 20px;
  width: 100%;
  
}
.heading {
  display: inline-block;      /* 文字内容自适应宽度 */
}

.item:hover {
  color: #2867f0;     /* 悬停文字颜色 */
  border-color: #999;        /* 悬停边框颜色变化 */
}

.details {
  display: inline-flex;       /* 使用 flex 横向排列 */
  align-items: center;        /* 垂直居中 */
  padding-top: 2px;
  padding-bottom: 2px;
}



@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }
  

  .item:before {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:after {
    content: ' ';
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
}
</style>
