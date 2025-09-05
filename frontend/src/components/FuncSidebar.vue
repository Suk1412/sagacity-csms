<script setup lang="ts">
import '@/static/css/index.css';
import '@/static/css/post.css';
import '@/static/js/main.js';
import * as Icons from '@/components/icons/Icons'
</script>

<template>
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
</template>

