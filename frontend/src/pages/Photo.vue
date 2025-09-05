<template>
    <div class="container">
        <section class="friends fade-in visible">
            <div class="post_article">
                <div class="post_cover">
                    <div class="post_meta">
                        <span class="meta">
                            <component :is="Icons.IconDocument" />
                        </span>
                    </div>
                    <h1 class="post_title">相册</h1>
                    <div class="post_meta">
                        <span class="meta">
                            <component :is="Icons.IconUser" />
                            Zyyo                
                        </span>
                        <span class="meta">
                            <component :is="Icons.IconRili" />
                            2025-01-12                
                        </span>
                        <span class="meta">
                            <component :is="Icons.IconMessage" />
                            0                 
                        </span>
                    </div>
                </div>

                <div class="post_content">
                    <p class="fade-in visible"></p>
                        <div class="photos-list fade-in visible">
                            <div class="img_container">
                                <img class="lazy loaded1 loaded2" data-original="https://picsum.photos/200/300?!" alt="测试" src="@/static/img/photo/163-200x300.jpg" style="">
                                <div class="photo_text"><p>测试</p><p>这是一张测试图</p></div>
                            </div>
                            <div class="img_container">
                                <img class="lazy loaded1 loaded2" data-original="https://picsum.photos/200/300?2" alt="测试" src="@/static/img/photo/381-200x300.jpg" style="">
                                <div class="photo_text"><p>测试</p><p>这是一张测试图</p></div>
                            </div>
                            <div class="img_container">
                                <img class="lazy loaded1 loaded2" data-original="https://picsum.photos/200/300?3" alt="测试" src="@/static/img/photo/591-200x300.jpg" style="">
                                <div class="photo_text"><p>测试</p><p>这是一张测试图</p></div>
                            </div>
                            <div class="img_container">
                                <img class="lazy loaded1 loaded2" data-original="https://picsum.photos/200/300?4" alt="测试" src="@/static/img/photo/649-200x300.jpg" style="">
                                <div class="photo_text"><p>测试</p><p>这是一张测试图</p></div>
                            </div>
                            <div class="img_container">
                                <img class="lazy loaded1 loaded2" data-original="https://picsum.photos/200/300?5" alt="测试" src="@/static/img/photo/240-200x300.jpg" style="">
                                <div class="photo_text"><p>测试</p><p>这是一张测试图</p></div>
                            </div>
                            <div class="img_container">
                                <img class="lazy loaded1 loaded2" data-original="https://picsum.photos/200/300?6" alt="测试" src="@/static/img/photo/983-200x300.jpg" style="">
                                <div class="photo_text"><p>测试</p><p>这是一张测试图</p></div>
                            </div>
                            <div class="img_container">
                                <img class="lazy loaded1 loaded2" data-original="https://picsum.photos/200/300?7" alt="测试" src="@/static/img/photo/848-200x300.jpg" style="">
                                <div class="photo_text"><p>测试</p><p>这是一张测试图</p></div>
                            </div>
                            <div class="img_container">
                                <img class="lazy loaded1 loaded2" data-original="https://picsum.photos/200/300?8" alt="测试" src="@/static/img/photo/875-200x300.jpg" style="">
                                <div class="photo_text"><p>测试</p><p>这是一张测试图</p></div>
                            </div>
                            <div class="img_container">
                                <img class="lazy loaded1 loaded2" data-original="https://picsum.photos/200/300?9" alt="测试" src="@/static/img/photo/137-200x300.jpg" style="">
                                <div class="photo_text"><p>测试</p><p>这是一张测试图</p></div>
                            </div>
                        </div>
                        <p class="fade-in"></p>        
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import '@/static/css/other.css';
import * as Icons from '@/components/icons/Icons'
</script>

<style scoped>
.post_cover::before {
    background-image: url('@/static/img/default.jpg');
}

.post_aside_infor::before {
    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), var(--color0)), url('@/static/img/wallhaven-6dg7ll.jpg');
}

.post_aside_infor {
    background-color: var(--color0);
}
</style>
