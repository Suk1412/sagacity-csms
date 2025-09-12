<template>
    <div class="post_article">
        <div class="post_cover">
            <div class="post_meta">
                <span class="meta">
                    <component :is="Icons.IconDocument" />
                </span>
            </div>
            <h1 class="post_title">个人简介</h1>
            <div class="post_meta">
                <span class="meta">
                    <component :is="Icons.IconUser" />
                    WX
                </span>
                <span class="meta">
                    <component :is="Icons.IconRili" />
                    {{today}}                
                </span>
                <!-- <span class="meta">
                    <component :is="Icons.IconMessage" />
                    61                 
                </span> -->
            </div>
        </div>
        <div class="post_content">
            <div class="tip tip-info fade-in visible">
                <div class="tip-body">
                    最后一次更新时间：2025-09-12
                </div>
            </div>
            <h2 id="我的介绍" class="fade-in visible">我的介绍</h2>
                <ul class="fade-in visible">
                    <li><strong>姓名</strong>：王肖</li>
                    <li><strong>年龄</strong>：{{ age }}</li>
                    <li><strong>坐标</strong>：江苏</li>
                    <li><strong>身高</strong>：175cm</li>
                </ul>
            <h2 id="联系方式" class="fade-in visible">联系方式</h2>
                <blockquote class="fade-in visible">
                    <strong>邮箱</strong>：2472532732@qq.com<br>
                    <strong>QQ</strong>：2472532732<br>
                    <strong>微信</strong>：wangk2U
                </blockquote>
            <h2 id="博客历史" class="fade-in">博客历史</h2>
                <p class="fade-in">博客自<strong>2020</strong>年首次成立，经历了几次域名和网名的更换：</p>
                <blockquote class="fade-in">
                    <strong>xiamu6.com</strong> → <strong>321xt.com</strong> → <strong>zysay.com</strong> → <strong>zyyo.net</strong>
                </blockquote>
                <p class="fade-in">虽然更换了多个域名，但这与我自己对完美的追求（可能是强迫症）有关系。每次的更换，虽然带走了旧的文章，但也让新的博客更加符合自己的想法。目前，我希望将这个博客打造成<strong>生活记录类型的个人博客</strong>。</p>
            <h2 id="技术栈与兴趣" class="fade-in">技术栈与兴趣</h2>
                <p class="fade-in">
                    <strong>前端开发</strong>：深入学习前端技术，尤其专注于<strong>Vue 3</strong>（组合式API）和<strong>JavaScript</strong>。<br>
                    <strong>开源项目</strong>：参与并发布了一些开源项目，包括个人主页设计和Typecho主题开发等。<br>
                    <strong>摄影与素描</strong>：热爱艺术创作，享受用镜头和画笔记录生活。<br>
                    <strong>跑步</strong>：跑步教会了我不放弃，给了我面对失败的坦然</p>
            <h2 id="个人特点" class="fade-in">个人特点</h2>
                <p class="fade-in">
                    <strong>自主学习</strong>：热衷于前端开发，独立学习，注重实践和积累，尤其在技术细节上追求精益求精。<br>
                    <strong>喜欢记录生活</strong>：除了技术，博客也是我分享个人生活点滴的地方。<br>
                    <strong>乐意将所学融入生活</strong>：每天花费超过60s的事情，我可能会选择写一个脚本去处理它</p>
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
