<style>
.base {
  /* 文字样式*/
  color:aliceblue;  /* 文字颜色 */
  background-color: #f5f5f5;  /* beij颜色 */
  font-size: 14px;  /* 字体大小 */
  font-weight: 400;  /* 字体粗细 */
  font-style: normal;  /* 倾斜风格 */
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;  /* 字体 */
  font-variant: normal;  /* 字体变体 */
  line-height: 1.5;  /* 行高 */
  letter-spacing: normal;  /* 字符间距 */
  word-spacing: normal;  /* 字间距 */
  text-align: left;  /* 文本对齐方式 */
  text-decoration: dashed;  /* 文本装饰 */
  text-transform: none;  /* 文本转换 */
  white-space: inherit;  /* 空白处理 */
  word-break: break-all;  /* 单词换行 */
  overflow-wrap: anywhere;  /* 文本溢出处理 */
  direction: ltr;  /* 文本方向 */
  unicode-bidi: bidi-override;  /* 文本方向 */

  /* 盒子样式 */
  width: 100%;  /* 宽度 */
  min-width: none;  /* 最小宽度 */
  max-width: none;  /* 最大宽度 */
  height: 100%;  /* 高度 */
  min-height: auto;  /* 最小高度 */
  max-height: none;  /* 最大高度 */
  margin: 0;  /* 外边距 */
  margin-top:auto;  /* 上外边距 */
  margin-bottom:auto;  /* 下外边距 */
  margin-left: auto;  /* 左外边距 */
  margin-right: auto;  /* 右外边距 */
  padding: 0;  /* 内边距 */
  padding-top: 0;  /* 上内边距 */
  padding-bottom: 0;  /* 下内边距 */
  padding-left: 0;  /* 左内边距 */
  padding-right: 0;  /* 右内边距 */
  border: none;  /* 边框 */
  border-top: none;  /* 上边框 */
  border-bottom: none;  /* 下边框 */
  border-left: none;  /* 左边框 */
  border-right: none;  /* 右边框 */
  border-radius: 0;  /* 边框圆角 
        单值：border-radius: 10px; → 四角统一
        双值：border-radius: 10px 20px; → 左上右下 10px，右上左下 20px
        四值：border-radius: 10px 20px 30px 40px; → 分别对应左上、右上、右下、左下
        百分比：border-radius: 50%; → 圆形/椭圆形*/
  box-shadow: none;  /* 阴影 
        offset-x：水平偏移量（正数向右，负数向左）
        offset-y：垂直偏移量（正数向下，负数向上）
        blur-radius：模糊半径（数值越大，越模糊）
        spread-radius：扩展半径（数值越大，阴影越大）
        color：阴影颜色
        inset：可选，内阴影*/
  box-sizing:border-box;  /* 盒子模型 */
  

  /* 背景 */
  background-color: #f5f5f5;  /* 背景颜色 */
  background-image: none;  /* 背景图片 */
  background-position: 0 0;  /* 背景位置 */
  background-repeat: repeat;  /* 背景重复 */
  background-size: auto auto;  /* 背景尺寸 */
  background-clip: border-box;  /* 背景裁剪 */
  background-origin: padding-box;  /* 背景起点 */
  background-attachment: scroll;  /* 背景固定 */

  /* 定位&布局 */
  display: block;  /* 显示方式
        block：块级元素，占满一整行，可设置宽高。
        inline：行内元素，不独占一行，宽高由内容决定。
        inline-block：行内块，像文字一样排列，但可以设置宽高。
        flex：启用 弹性布局。
        grid：启用 网格布局。
        inline-flex / inline-grid：内联版 flex/grid。
        none：元素不显示，不占空间。*/
  position: static;  /* 定位方式
        static（默认）：正常文档流定位，不能用 top/left 等偏移。
        relative：相对定位，相对自身原始位置偏移。
        absolute：绝对定位，相对于最近的 非 static 父元素定位。
        fixed：固定定位，相对于 视口（viewport），不会随滚动条移动。
        sticky：粘性定位，介于 relative 和 fixed 之间，根据滚动位置切换。*/
  top: auto;  /* 上偏移 */
  bottom: auto;  /* 下偏移 */
  left: auto;  /* 左偏移 */
  right: auto;  /* 右偏移 */
  z-index: auto;  /* 层级 */
  float: none;  /* 浮动方式
        none（默认）：不浮动。
        left：左浮动。
        right：右浮动。*/
  clear: none;  /* 清除浮动
        none（默认）：不清除。
        left：左浮动元素之后。
        right：右浮动元素之后。*/
  overflow: visible;  /* 内容溢出处理
        visible：默认，内容溢出会显示出来。
        hidden：溢出部分被裁切，不显示。
        scroll：始终显示滚动条。
        auto：根据需要显示滚动条。*/


/* Flex 布局 */
flex-direction: row;  /* 主轴方向
        row（默认）：从左到右。
        row-reverse：从右到左。
        column：从上到下。
        column-reverse：从下到上。*/
flex-wrap: nowrap;  /* 换行方式
        nowrap（默认）：不换行。
        wrap：换行，第一行在上方。
        wrap-reverse：换行，第一行在下方。*/
flex-flow: row nowrap;  /* flex-direction 和 flex-wrap 的简写 */
justify-content: flex-start;  /* 主轴对齐方式
        flex-start（默认）：左对齐。
        flex-end：右对齐。
        center：居中。
        space-between：两端对齐，项目之间的间隔平均分布。
        space-around：两端对齐，项目之间的间隔比项目间距大一倍。*/
align-items: flex-start;  /* 交叉轴对齐方式
        flex-start：交叉轴的起点对齐。
        flex-end：交叉轴的终点对齐。
        center：交叉轴的中点对齐。
        baseline：项目的第一行文字的基线对齐。
        stretch（默认）：如果项目未设置高度，将占满整个容器的高度。*/
align-content: flex-start;  /* 多轴对齐方式
        flex-start：与交叉轴的起点对齐。
        flex-end：与交叉轴的终点对齐。
        center：与交叉轴的中点对齐。
        space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
        space-around：与交叉轴两端对齐，轴线之间的间隔比轴线间距大一倍。
        stretch（默认）：轴线占满整个交叉轴。*/
order: 0;  /* 元素的排列顺序 */
flex-grow: 0;  /* 项目的放大比例 */
flex-shrink: 1;  /* 项目的缩小比例 */
flex-basis: auto;  /* 项目的初始大小 */


/* Grid 布局 */
grid-template-columns: none;  /* 网格列定义
        none（默认）：不显示网格线。
        auto-fit：自动适应容器宽度，尽可能多的占用空间。
        auto-fill：自动填充，自动适应容器宽度，尽可能少的占用空间。
        长度值：固定网格列宽。
        百分比值：根据容器宽度等比例分配网格列宽。
        关键字：repeat()，重复指定次数的网格列宽。*/
grid-template-rows: none;  /* 网格行定义 */
grid-template-areas: none;  /* 网格区域定义 */
grid-row: auto;  /* 网格行位置 */
grid-column: auto;  /* 网格列位置 */
row-gap: 0;  /* 行间距 */
column-gap: 0;  /* 列间距 */
align-self: auto;  /* 单个项目的对齐方式 */
justify-self: start;  /* 单个项目的对齐方式 */


/* 表格 */
border-collapse: collapse;  /* 边框合并 */
border-spacing: 0;  /* 边框间距 */
table-layout: auto;  /* 表格布局 */
caption-side: top;  /* 标题位置 */
empty-cells: hide;  /* 空单元格处理 */

/* 列表 */
list-style: none;  /* 列表样式 */
list-style-position: outside;  /* 列表样式位置 */
list-style-image: none;  /* 列表样式图片 */
list-style-type: disc;  /* 列表样式类型 */


/* 颜色&渐变 */
opacity: calc(var(--opacity, 1) * 100%);  /* 透明度 */
filter: blur(var(--blur, 0));  /* 模糊 */
mix-blend-mode: color-dodge;  /* 混合模式 */
background-blend-mode: color-dodge;  /* 背景混合模式 */

/* 动画 & 过渡 */
transform: matrix();
transition-property: all;   /* 指定需要过渡的 CSS 属性 */
transition-duration: 0.3s;  /* 过渡持续时间  */
transition-delay: 0s;   /* 过渡延迟 */
transition-timing-function: ease-in-out; /* 动画速度曲线 
            linear：匀速
            ease（默认）：先慢后快再慢
            ease-in：加速
            ease-out：减速
            ease-in-out：先加速再减速
            cubic-bezier(x1, y1, x2, y2)：自定义曲线*/

translate: (50px, 50px);    /* 移动元素 
                translateX(50px)
                translateY(20px) 
                skew: 30deg;  /* 倾斜元素
                matrix: (1, 2, 3, 4, 5, 6);  变换矩阵
                            
            rotate: 10deg;  旋转元素
            scale: 1.5;  缩放元素 */

}
</style>