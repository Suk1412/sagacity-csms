

<script setup lang="ts">
import '@/static/css/index.css';
import '@/static/css/post.css';
import '@/static/js/main.js';
import * as Icons from '@/components/icons/Icons'
import { ref, computed, onMounted, onUnmounted } from "vue";
import { handle_moible_menu } from "@/static/js/moiblemenu.js";
import { handle_scroll } from "@/static/js/scroll.js";
let unbind;
onMounted(() => {unbind = handle_moible_menu(),handle_scroll();});
onUnmounted(() => {unbind && unbind();});



import NotFound from '@/pages/NotFound.vue'
import About from '@/pages/About.vue'
import Photo from '@/pages/Photo.vue'
// 路由表
const routes: Record<string, any> = {
  '/about': About,
 '/photo': Photo}
// 当前路径（去掉 hash）
const currentPath = ref(window.location.hash)
// 当前视图：根据 hash 计算要渲染的组件
const currentView = computed(() => {return routes[currentPath.value.slice(1) || '/'] || NotFound})
// 监听 hash 变化
function onHashChange() {currentPath.value = window.location.hash}
onMounted(() => {window.addEventListener('hashchange', onHashChange)})
onUnmounted(() => {window.removeEventListener('hashchange', onHashChange)})
</script>


<template>
    <div class="preloader" style="opacity: 0; display: none;">
      <div class="loader"></div>
    </div>
    <div class="header">
      <div class="header_container">
         <a class="header_logo">
          <!-- <IconHome/> -->
          <component :is="Icons.IconHome" />
          <div class="content">
            <img src="@/assets/favicon.ico" alt="" srcset="">WX
          </div>
         </a>
         <div class="nav_home_container">
            <div class="nav_item">
               <a>标签</a>            
            </div>
            <div class="nav_item">
               <a>分类<component :is="Icons.IconBottom" /></a>
               <ul>
                  <li><a>记录点滴</a></li>
                  <li><a>灵感相关</a></li>
                  <li><a>闲言碎语</a></li>
                  <li><a>实用分享</a></li>
                </ul>
            </div>
            <div class="nav_item">
               <a>页面<component :is="Icons.IconBottom" /></a>
                <ul>
                  <li><a href="#/photo">相册</a></li>
                  <li><a href="#/about">关于</a></li>
                  <li><a>友链</a></li>
                  <li><a>留言</a></li>
                </ul>
            </div>
         </div>
         <div class="header_icon_container">
             <a class="header_icon">
               <component :is="Icons.IconKaiWang" />
            </a>            
            <div id="seach_btn" class="header_icon">
                <component :is="Icons.IconSearch" />
            </div>
            <div id="user" onclick="window.location.href=&#39;/admin&#39;" class="header_icon">
               <component :is="Icons.IconUser" />
            </div>
            <div id="sidebar_open" class="header_icon">
                <component :is="Icons.IconMore" />
            </div>
        </div>
      </div>
    </div>
    <div class="sidebar">
      <div class="main">
         <div class="sidebar_infor">
            <div class="logo">
               <div class="logo_tips">👏</div>
            </div>
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
                  <p>504</p>
               </div>
            </div>
         </div>
         <div class="title">
            分类
         </div>
         <ul>
            <li><a>记录点滴</a></li>
            <li><a>灵感相关</a></li>
            <li><a>闲言碎语</a></li>
            <li><a>实用分享</a></li>
         </ul>
         <div class="title">
            页面
         </div>
         <ul>
            <li><a>相册</a></li>
            <li><a>关于</a></li>
            <li><a>友链</a></li>
            <li><a>留言</a></li>
         </ul>
         <div class="tags">
            <div class="tag"><a>#开源</a></div>
            <div class="tag"><a>#Typecho</a></div>
            <div class="tag"><a>#阿里云</a></div>
            <div class="tag"><a>#主机</a></div>
            <div class="tag"><a>#高中</a></div>
            <div class="tag"><a>#高考</a></div>
            <div class="tag"><a>#主页</a></div>
            <div class="tag"><a>#html</a></div>
            <div class="tag"><a>#css</a></div>
            <div class="tag"><a>#PHP</a></div>
        </div>
    </div>
    </div>
    <!-- <section class="wx-hero">
      <div class="main">
        <img src="@/static/img/wx-hero.jpg" class="avatar" alt="头像" />
        <div class="content">
            <h1 class="title">WX</h1>
            <div class="description">
              <div class="desc-typed">专注于现代Web开发技术</div>
              精通Vue/Node.js全栈开发
              持续探索前沿技术方案
            </div>
        </div>
      </div>
      <div class="wavess">
        <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
            <defs>
              <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
            </defs>
            <g class="parallax">
              <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(234,239,248,0.7)"></use>
              <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(234,239,248,0.5)"></use>
              <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(234,239,248,0.3)"></use>
              <use xlink:href="#gentle-wave" x="48" y="7" fill="rgba(234,239,248,1)"></use>
            </g>
        </svg>
      </div>
    </section>
    <div class="container">
      <section class="fade-in frist">
          <div class="author_infor">
              <div class="infor">
                  <div class="logo">
                      <div class="logo_tips">👏</div>
                  </div>
                  <h2>Zyyo</h2>
                  <p>Just for fun</p>
              </div>
              <div class="say1">一名在读大二学生，热衷于将所学到的知识、灵感付诸实践，包括不限于编程、设计、视频内容创作</div>
              <div class="links">
                  <a class="about">about</a>
                  <a class="link"><component :is="Icons.IconMail" /></a>
                  <a class="link"><component :is="Icons.IconQQ" /></a>
                  <a class="link"><component :is="Icons.IconGithub" /></a>
              </div>
          </div>
          <div class="author_photo">
              <img src="@/static/img/wallhaven-m9yky1.jpg" alt="" srcset="">
              <img src="@/static/img/wallhaven-83235k.png" alt="" srcset="">
              <img src="@/static/img/wallhaven-gp7mq3.jpg" alt="" srcset="">
          </div>

          <div class="author_other">
              <h1>欢迎光临</h1>
                      <a class="button">
                  <div class="svg">
                      <component :is="Icons.IconRight" />
                  </div>
                  <span>
                      更多文章
                  </span>
              </a>
              <div class="main">
                  <div class="main_1">
                      <div class="group">
                          <div class="icon" style="background:#7d7d7d">
                            <component :is="Icons.IconTechnology1" />
                          </div>
                          <div class="icon" style="background: #ffffff;">
                            <component :is="Icons.IconTechnology2" />
                          </div>
                      </div>
                      <div class="group">
                          <div class="icon" style="background:#bbc5ba">
                              <component :is="Icons.IconTechnology3" />
                          </div>
                          <div class="icon" style="background:#4aa181">
                              <component :is="Icons.IconTechnology4" />
                          </div>
                      </div>

                      <div class="group">
                          <div class="icon" style="background: #ffffff;">
                            <component :is="Icons.IconTechnology5" />
                          </div>
                          <div class="icon" style="background: #ffffff;">
                            <component :is="Icons.IconTechnology6" />
                          </div>
                      </div>

                      <div class="group">
                          <div class="icon" style="background:#df5b40">
                            <component :is="Icons.IconTechnology7" />
                          </div>
                          <div class="icon" style="background:#1f1f1f">
                            <component :is="Icons.IconTechnology8" />
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          <div class="author_div">
              <div class="yiyan">
                  <p id="text_yiyan">每一个不曾起舞的日子，都是对生命的辜负。</p>
                  <div id="refresh_yiyan" class="button">
                      <component :is="Icons.IconRefresh" />
                  </div>
              </div>
          </div>
          <div class="author_div">
                      <div class="stats">
                  <div class="stat-item">
                      <p>成立</p>
                      <h2>233天</h2>
                  </div>
                  <div class="stat-item">
                      <p>文章</p>
                      <h2>23篇</h2>
                  </div>
                  <div class="stat-item">
                      <p>评论</p>
                      <h2>504条</h2>
                  </div>
                  <div class="stat-item">
                      <p>标签</p>
                      <h2>25个</h2>
                  </div>
              </div>

          </div>

        <div class="author_div2222">
        </div>
      </section>
      <section class="articles">
            <a class="fade-in article-card">
                <div class="img">
                    <img style="" src="@/static/img/default.webp" alt="一个综合树维教务系统的选课排课客户端基于nodejs">
                                    </div>
                <div class="content">
                    <div class="tags">
                                            </div>
                    <h3> 一个综合树维教务系统的选课排课客户端基于nodejs</h3>
                    <p>2025-07-09</p>
                </div>
            </a>
            <a  class="fade-in article-card">
                <div class="img">
                    <img style="" src="@/static/img/default.webp" alt="使用javscript手写json-parse">
                                    </div>
                <div class="content">
                    <div class="tags">
                                            </div>
                    <h3> 使用javscript手写json-parse</h3>
                    <p>2025-04-02</p>
                </div>
            </a>
            <a class="fade-in article-card">
                <div class="img">
                    <img style="" src="@/static/img/default.webp" alt="Archlinux保姆级安装教程">
                                    </div>
                <div class="content">
                    <div class="tags">
                                            </div>
                    <h3> Archlinux保姆级安装教程</h3>
                    <p>2025-02-27</p>
                </div>
            </a>
            <a class="fade-in article-card">
                <div class="img">
                    <img style="" src="@/static/img/wallhaven-8opx8k.jpg" alt="闲来无事-Vue3实现贪吃蛇小游戏">
                                    </div>
                <div class="content">
                    <div class="tags">
                                            </div>
                    <h3> 闲来无事-Vue3实现贪吃蛇小游戏</h3>
                    <p>2025-02-02</p>
                </div>
            </a>
            <a class="fade-in article-card">
                <div class="img">
                    <img style="" src="@/static/img/wallhaven-vg6dqp.jpg" alt="Zyang一款从0打造的优雅Typecho主题">
                                    </div>
                <div class="content">
                    <div class="tags">
                                            </div>
                    <h3> Zyang一款从0打造的优雅Typecho主题</h3>
                    <p>2025-01-05</p>
                </div>
            </a>
            <a class="fade-in article-card">
                <div class="img">
                    <img style="" src="@/static/img/wallhaven-p2eg9e.jpg" alt="全新开源个人主页-ZYYO主页">
                                    </div>
                <div class="content">
                    <div class="tags">
                                                                                                                <span class="tag">
                                    #开源                                </span>
                                                                        </div>
                    <h3> 全新开源个人主页-ZYYO主页</h3>
                    <p>2024-12-23</p>
                </div>
            </a>
            <a class="fade-in article-card-1">
                <div class="img">
                    <img src="@/static/img/1125354000.jpg" alt="第一辆自行车-喜德盛ad300拿下">
                </div>
                <div class="content">
                    <div class="tags">
                                            </div>
                    <h3> 第一辆自行车-喜德盛ad300拿下</h3>
                    <p>2024-01-02</p>
                </div>
            </a>
            <a class="fade-in article-card-1">
                <div class="img">
                    <img src="@/static/img/1701412181.jpg" alt="临近期末的近况">
                </div>
                <div class="content">
                    <div class="tags">
                                            </div>
                    <h3> 临近期末的近况</h3>
                    <p>2023-12-16</p>
                </div>
            </a>
            <a class="fade-in article-card-1">
                <div class="img">
                    <img src="@/static/img/4110371063.png" alt="新跑表-华为GT Runner">
                </div>
                <div class="content">
                    <div class="tags">
                                            </div>
                    <h3> 新跑表-华为GT Runner</h3>
                    <p>2023-12-04</p>
                </div>
            </a>
            <a class="fade-in article-card-1">
                <div class="img">
                    <img src="@/static/img/default.webp" alt="从今天开始励志当一个高级前端工程师!">
                </div>
                <div class="content">
                    <div class="tags">
                                            </div>
                    <h3> 从今天开始励志当一个高级前端工程师!</h3>
                    <p>2023-11-20</p>
                </div>
            </a>
            <a class="fade-in article-card-1">
                <div class="img">
                    <img src="@/static/img/1259511291.png" alt="ZYYO  一款个人类型typecho主题">
                </div>
                <div class="content">
                    <div class="tags">
                                                                                                                <span class="tag">
                                    #开源                                </span>
                                                                        </div>
                    <h3> ZYYO  一款个人类型typecho主题</h3>
                    <p>2023-11-06</p>
                </div>
            </a>
            <a class="fade-in article-card-1">
                <div class="img">
                    <img src="@/static/img/default.webp" alt="进大学第一天小记">
                </div>
                <div class="content">
                    <div class="tags">
                                                                                                                <span class="tag">
                                    #记录点滴                                </span>
                                                                        </div>
                    <h3> 进大学第一天小记</h3>
                    <p>2023-09-03</p>
                </div>
            </a>
      </section>
    <ul class="pagination">
        <li class="active"><a>1</a></li>
        <li><a>2</a></li>
        <li><a>»</a></li>
      </ul>
    </div> -->
    <component :is="currentView" />
    <div class="footer">
        <div class="footer_container">
          <div class="left">
              <p>Zyyo © 2024</p>
              <a>你的备案号</a>
          </div>
          <div class="right">
              <!-- 如果不喜欢可以换成你自己的 -->
              <p><a>Designed by Zyyo</a></p>
              <p><a>Powered by typecho</a></p>
          </div>
      </div>
    </div>
</template>


<style>
#mount {
  --font-family: system-ui, -apple-system, "Segoe UI", "Roboto", "Ubuntu",
    "Cantarell", "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Noto Color Emoji";
  --line-height: 1.5;
  --font-weight: 400;
  --font-size: 16px;
  --border-radius: 0.25rem;
  --border-width: 1px;
  --outline-width: 3px;
  --spacing: 1rem;
  --typography-spacing-vertical: 1.5rem;
  --block-spacing-vertical: calc(var(--spacing) * 2);
  --block-spacing-horizontal: var(--spacing);
  --grid-spacing-vertical: 0;
  --grid-spacing-horizontal: var(--spacing);
  --form-element-spacing-vertical: 0.75rem;
  --form-element-spacing-horizontal: 1rem;
  --nav-element-spacing-vertical: 1rem;
  --nav-element-spacing-horizontal: 0.5rem;
  --nav-link-spacing-vertical: 0.5rem;
  --nav-link-spacing-horizontal: 0.5rem;
  --form-label-font-weight: var(--font-weight);
  --transition: 0.2s ease-in-out;
  --modal-overlay-backdrop-filter: blur(0.25rem);
}


.container,
.container-fluid {
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  padding-right: var(--spacing);
  padding-left: var(--spacing);
}

@media (min-width: 992px) {
  .container {
    max-width: 920px;
  }
}
@media (min-width: 1200px) {
  .container {
    max-width: 1130px;
  }
}

</style>
