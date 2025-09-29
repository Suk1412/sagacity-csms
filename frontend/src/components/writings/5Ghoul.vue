<template>
    <div class="post_article">
        <div class="post_cover">
            <div class="post_meta">
                <span class="meta">
                    <component :is="Icons.IconDocument" />
                </span>
            </div>
            <h1 class="post_title">[主题]</h1>
            <div class="post_meta">
                <span class="meta">
                    <component :is="Icons.IconUser" />
                    [作者]
                </span>
                <span class="meta">
                    <component :is="Icons.IconRili" />
                    {{today}}                
                </span>
            </div>
        </div>
        <div class="post_content">
            <div class="tip tip-info fade-in visible">
                <div class="tip-body"></div>
            </div>
            <h2 class="fade-in">[二级标题 1]</h2>
            <h2 class="fade-in">[二级标题 2]</h2>
            <h2 class="fade-in">[二级标题 3]</h2>
            <h2 class="fade-in">[二级标题 4]</h2>
            <h2 class="fade-in">[二级标题 5]</h2>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as Icons from '@/components/icons/Icons'
import '@/static/css/post.css';
import { computed, ref } from 'vue';
const today = ref(new Date().toISOString().slice(0, 10))
const birthday = "1998-07-16";
const age = computed(() => {
  const birthDate = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const hasBirthdayPassed =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() &&
     today.getDate() >= birthDate.getDate());
  if (!hasBirthdayPassed) age--;
  return age;
});
</script>

<style scoped>

.post_cover::before {
    background-image: url('@/static/img/default.jpg');
}
</style>
