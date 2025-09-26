<template>
<div class="container">
    <section class="post fade-in visible">
        <div class="post_aside">
            <div class="post_aside_infor">
                <div class="logo">
                    <div class="logo_tips">👏</div>
                </div>
                <h2>WX</h2>
                <p>Just for fun</p>
                <div class="infor">
                    <div class="item">
                        <p>文章</p>
                        <p>23</p>
                    </div>
                    <div class="item">
                        <p>标签</p>
                        <p>25</p>
                    </div>
                    <div class="item">
                        <p>评论</p>
                        <p>507</p>
                    </div>
                </div>
            </div>
            <div class="post_aside_sticky">
                <div class="post_aside_card">
                    <h3>
                        <component :is="Icons.IconMulu" />
                        文章目录
                    </h3>
                    <ul id="toc">
                        <li class="toc-level-2 active"><a>我的介绍</a></li>
                        <li class="toc-level-2"><a>联系方式</a></li>
                        <li class="toc-level-2"><a>博客历史</a></li>
                        <li class="toc-level-2"><a>技术栈与兴趣</a></li>
                        <li class="toc-level-2"><a>个人特点</a></li>
                    </ul>
                </div>
                <div class="post_aside_card">
                    <h3><component :is="Icons.IconHot"/>数据统计</h3>

                    <div class="data">
                        <div class="item">
                            <p>成立</p>
                            <p>245天</p>
                        </div>
                        <div class="item">
                            <p>文章</p>
                            <p>23篇</p>
                        </div>
                        <div class="item">
                            <p>评论</p>
                            <p>507条</p>
                        </div>
                        <div class="item">
                            <p>标签</p>
                            <p>25个</p>
                        </div>
                    </div>
                    <div class="tags">
                        <div class="tag"><a>开源</a></div>
                        <div class="tag"><a>Typecho</a></div>
                        <div class="tag"><a>阿里云</a></div>
                        <div class="tag"><a>主机</a></div>
                        <div class="tag"><a>高中</a></div>
                        <div class="tag"><a>高考</a></div>
                        <div class="tag"><a>主页</a></div>
                        <div class="tag"><a>html</a></div>
                        <div class="tag"><a>css</a></div>
                        <div class="tag"><a>PHP</a></div>
                    </div>
                </div>
                <div class="post_aside_card random">
                    <h3><component :is="Icons.IconHot"/>最近文章</h3>
                    <ul>
                        <li>
                            <img src="@/static/img/default.webp" alt="一个综合树维教务系统的选课排课客户端基于nodejs">
                            <div class="info">
                                <a class="title">一个综合树维教务系统的选课排课客户端基于nodejs</a>
                                <span class="date">2025-07-09</span>
                            </div>
                        </li>
                        <li>
                            <img src="@/static/img/default.webp" alt="使用javscript手写json-parse">
                            <div class="info">
                                <a class="title">使用javscript手写json-parse</a>
                                <span class="date">2025-04-02</span>
                            </div>
                        </li>
                        <li>
                            <img src="@/static/img/default.webp" alt="Archlinux保姆级安装教程">
                            <div class="info">
                                <a class="title">Archlinux保姆级安装教程</a>
                                <span class="date">2025-02-27</span>
                            </div>
                        </li>
                        <li>
                            <img src="@/static/img/wallhaven-8opx8k.jpg" alt="闲来无事-Vue3实现贪吃蛇小游戏">
                            <div class="info">
                                <a class="title">闲来无事-Vue3实现贪吃蛇小游戏</a>
                                <span class="date">2025-02-02</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>    
        <!-- <GY /> -->
        <RouterView />
    </section>
</div>

</template>

<script setup lang="ts">
import * as Icons from '@/components/icons/Icons'
</script>

<style scoped>
.logo {
    background-image:url('@/static/img/wx-hero.jpg');
}

.post_aside_infor::before {
    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), var(--color0)), url('@/static/img/wallhaven-6dg7ll.jpg');
}

.post_aside_infor {
    background-color: var(--color0);
}

</style>
