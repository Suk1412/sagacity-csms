<template>
<div class="container">
    <section class="post fade-in visible">
        <div class="post_aside">
            <div class="post_aside_infor">
                <div class="logo">
                    <div class="logo_tips">👏</div>
                </div>
                <h2>Wx</h2>
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
        <div class="post_article">
            <div class="post_cover">
                <div class="post_meta">
                    <span class="meta">
                      <component :is="Icons.IconDocument" />
                    </span>
                </div>
                <h1 class="post_title">关于</h1>
                <div class="post_meta">
                    <span class="meta">
                      <component :is="Icons.IconUser" />
                        Zyyo
                    </span>
                    <span class="meta">
                      <component :is="Icons.IconRili" />
                        2022-05-14                
                    </span>
                    <span class="meta">
                      <component :is="Icons.IconMessage" />
                        61                 
                    </span>
                </div>
            </div>
            <div class="post_content">
                <div class="tip tip-info fade-in visible">
                        <div class="tip-body">⚠️本文发布于 1208 天前，内容可能已过时，请注意甄别信息的准确性。</div>
                    </div><h2 id="我的介绍" class="fade-in visible">我的介绍</h2><ul class="fade-in visible"><li><strong>姓名</strong>：zyyo</li><li><strong>年龄</strong>：21</li><li><strong>坐标</strong>：河南</li><li><strong>身高</strong>：182cm</li></ul><h2 id="联系方式" class="fade-in visible">联系方式</h2><blockquote class="fade-in visible"><strong>邮箱</strong>：<a href="mailto:i@zyyo.net">i@zyyo.net</a><br><strong>QQ</strong>：<a href="https://zyyo.net/about.html">3509679579</a><br><strong>微信</strong>：<a href="https://zyyo.net/about.html">zyyonet</a></blockquote><h2 id="博客历史" class="fade-in">博客历史</h2><p class="fade-in">博客自<strong>2020</strong>年首次成立，经历了几次域名和网名的更换：</p><blockquote class="fade-in"><strong>xiamu6.com</strong> → <strong>321xt.com</strong> → <strong>zysay.com</strong> → <strong>zyyo.net</strong></blockquote><p class="fade-in">虽然更换了多个域名，但这与我自己对完美的追求（可能是强迫症）有关系。每次的更换，虽然带走了旧的文章，但也让新的博客更加符合自己的想法。目前，我希望将这个博客打造成<strong>生活记录类型的个人博客</strong>。</p><h2 id="技术栈与兴趣" class="fade-in">技术栈与兴趣</h2><p class="fade-in"><strong>前端开发</strong>：深入学习前端技术，尤其专注于<strong>Vue 3</strong>（组合式API）和<strong>JavaScript</strong>。<br><strong>开源项目</strong>：参与并发布了一些开源项目，包括个人主页设计和Typecho主题开发等。<br><strong>摄影与素描</strong>：热爱艺术创作，享受用镜头和画笔记录生活。<br><strong>跑步</strong>：跑步教会了我不放弃，给了我面对失败的坦然</p><h2 id="个人特点" class="fade-in">个人特点</h2><p class="fade-in"><strong>自主学习</strong>：热衷于前端开发，独立学习，注重实践和积累，尤其在技术细节上追求精益求精。<br><strong>喜欢记录生活</strong>：除了技术，博客也是我分享个人生活点滴的地方。<br><strong>乐意将所学融入生活</strong>：每天花费超过60s的事情，我可能会选择写一个脚本去处理它</p><hr class="fade-in"><blockquote class="fade-in">由于之前的个人介绍有些草率，等有时间我会进一步补充完善。</blockquote>            <div class="post_bottom_1 fade-in" style="background-image: url(https://zyyo.net/usr/themes/Zyang/static/img/default.webp);">
                    <div class="title">
                        <p>关于</p>

                    </div>
                    <div class="details">
                        <div class="item">
                            <p>发布于</p>
                            <p>May 14, 2022</p>
                        </div>
                                            <div class="item">
                            <p>版权协议</p>
                            <p>MIT</p>
                        </div>
                    </div>
                </div>
                            <div class="post_bottom_3 fade-in">
                    <div class="tags">
                                        </div>
                    <div class="shares">
                        <span id="trigger_donation" class="share">打赏</span>
                        <span id="post_copy" class="share">分享</span>
                    </div>
                </div>
            </div>
            <div id="respond-page-3" class="post_comment">
                <div class="title"><component :is="Icons.IconMessage"/>评论</div>
                    <form class="comment_card" id="comment-form" method="post" action="https://zyyo.net/about.html/comment">
                                <input type="text" name="author" placeholder="昵称" required="" class="name" value="dad">
                    <input type="email" name="mail" placeholder="邮箱" required="" class="mail" value="2472532764@qq.com">
                    <input type="url" name="url" placeholder="网站" class="url" value="https://blog.csdn.net/weixin_42300435/article/details/116951814">
                            <textarea class="content" name="text" required="" autocomplete="off" placeholder="说点什么..." maxlength="100000"></textarea>

                <div class="bottom">
                    <div id="emoji" class="emoji">😀</div>
                    <button type="submit" class="send">
                        <component :is="Icons.IconSubmit" />
                    </button>
                </div>
            </form>
            <div id="comments" class="comment_body">
                <div class="title">已有 0 条评论</div>               
                <ul class="comment_pagination">
                    <li class="active"><a>1</a></li>
                    <li><a>2</a></li>
                    <li><a>...</a></li>
                    <li><a >4</a></li>
                    <li><a >»</a></li>
                </ul>
            </div>
            </div>
        </div>
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

.post_cover::before {
    background-image: url('@/static/img/default.jpg');
}
.container {
    max-width: 1200px;
}

.post_aside_infor::before {
    background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), var(--color0)), url('@/static/img/wallhaven-6dg7ll.jpg');
}

.post_aside_infor {
    background-color: var(--color0);
}

</style>
