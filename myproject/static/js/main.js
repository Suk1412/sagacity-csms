
class Zyyo {
    constructor() {
        document.addEventListener('DOMContentLoaded', () => {
            console.log(" %c Theme Zyang Version " + 1.0 + " %c zyyo.net", "color:#fff;background:linear-gradient(90deg,#448bff,#44e9ff);padding:5px 0;", "color:#000;background:linear-gradient(90deg,#44e9ff,#ffffff);padding:5px 10px 5px 0px;");
            console.log('zyyonb');

            this.message = new Message();
            /*不需要pjax的方法*/
            this.handle_keydown();
            this.handle_scroll();
            this.handle_search();
            this.handle_moible_menu();
            this.handle_back_to_top();
            this.handle_theme_toggle();
            this.handle_guanxing();
            this.handle_init_animations();
            /* pjax初始化*/
            this.init_pjax();

        });



    }
    // pjax 回调方法
    pjaxCallback() {
        this.handle_yiyan();
        this.handle_pop();
        this.handle_toc();
        this.handle_fade_in();
        this.handle_lazyload();
        this.handle_imgbox();
        this.handle_code_highlight();
        this.handle_code_copy();
        this.handle_emoji();
        this.handle_post_copy();
        this.handle_donation();

    }
    // 初始化 pjax 相关
    init_pjax() {
        /*先执行一遍pjax回调*/
        this.pjaxCallback();
        const url = window.location.origin;
        $(document).pjax('a[href^="' + url + '"]:not(a[target="_blank"], a[no-pjax])', {
            container: '.container',
            fragment: '.container',
            timeout: 8000
        }).on('pjax:send', () => {
            NProgress.start();
        }).on('pjax:end', () => {
            this.pjaxCallback();
            NProgress.done();
        }).on('pjax:complete', () => {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.remove('open');
        });
    }

    //处理表情
    handle_emoji() {
        const emoji = document.getElementById('emoji');
        if (emoji) {
            emoji.addEventListener('click', () => {
                const content = document.querySelector('#comment-form .content');
                content.value = content.value + '😀';

            });
        }
    }
    // 处理键盘快捷键
    handle_keydown() {
        document.addEventListener('keydown', (event) => {
            if (event.ctrlKey && event.key === 'k') {
                event.preventDefault();
                document.querySelector('.seach_modal').classList.toggle('active');
            }
        });
        document.addEventListener('keydown', (event) => {
            // 检测 F12 键
            if (event.key === 'F12' || event.code === 'F12') {
                //event.preventDefault(); // 如果你想彻底禁止，请取消注释
                this.message.info('检测到你打开控制台，请遵循网站协议');
            }

            // 检测 Ctrl+Shift+I (开发者工具快捷键)
            if (event.ctrlKey && event.shiftKey && event.key === 'I') {
                //event.preventDefault(); // 如果你想彻底禁止，请取消注释
                this.message.info('检测到你打开控制台，请遵循网站协议');
            }
        });
    }
    // 处理滚动事件
    handle_scroll() {
        const header = document.querySelector(".header");

        if (header) {
            let lastScrollTop = 0;
            var currentHeight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            //先执行一遍
            header.classList.toggle("active", currentHeight > document.documentElement.clientHeight + 100);
            //再监听滚动
            window.addEventListener("scroll", () => {
                var currentHeight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                if (header) {
                    header.classList.toggle("active", currentHeight > document.documentElement.clientHeight + 100);
                    header.classList.toggle("index", currentHeight > document.documentElement.clientHeight);
                    if (currentHeight > lastScrollTop && currentHeight > document.documentElement.clientHeight + 200) {
                        header.classList.add("hide");
                    } else {
                        header.classList.remove("hide");
                    }
                    lastScrollTop = currentHeight <= 0 ? 0 : currentHeight; // 防止页面顶部时出现负值
                }
            });
        }
    }
    //惯性滚动
    handle_guanxing() {


    }
    // 处理搜索 modal
    handle_search() {
        const modal = document.getElementById('seach_modal');
        if (!modal) {
            return;
        }
        const modalBtn = document.getElementById('seach_btn');
        modalBtn.addEventListener('click', () => {
            modal.classList.add('active');
        });
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
    //赞赏
    handle_donation() {
        const modal = document.getElementById("donation_modal");
        const trigger = document.getElementById("trigger_donation");
        if (!trigger || !modal) {
            return;
        }
        document.querySelectorAll(".tab_btn").forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const tab = e.target.dataset.tab;
                document.querySelectorAll(".tab_btn").forEach((b) => b.classList.remove("active"));
                e.target.classList.add("active");
                document.querySelectorAll(".tab_item").forEach((item) => item.classList.remove("active"));
                document.getElementById(tab).classList.add("active");
            });
        });

        trigger.addEventListener("click", () => {
            modal.classList.add("active");
        });
        modal.addEventListener("click", () => {
            if (event.target === modal) {
                modal.classList.remove("active");
            }
        });
    }
    // 处理移动端菜单
    handle_moible_menu() {
        const sidebar = document.querySelector('.sidebar');
        if (!sidebar) {
            return;
        }
        const openBtn = document.getElementById('sidebar_open');
        openBtn.addEventListener('click', () => {
            sidebar.classList.add('open');


        });
        sidebar.addEventListener('click', (event) => {
            if (event.target.classList.contains('sidebar')) {
                sidebar.classList.remove('open');

            }
        });
    }
    // 处理返回顶部
    handle_back_to_top() {
        const upward = document.querySelector('.upward');
        if (!upward) {
            return;
        }
        upward.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        window.addEventListener("scroll", () => {
            var currentHeight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            if (upward) {
                if (currentHeight > 300) {
                    upward.style.display = 'flex';
                } else {
                    upward.style.display = 'none';
                }
            }
        });
    }
    // 处理主题切换
    handle_theme_toggle() {
        document.querySelector('.day_night').addEventListener('click', () => {
            const html = document.documentElement;
            html.classList.toggle("Dark");
            if (html.classList.contains('Dark')) {
                this.setCookie("themeState", "Dark", 1);
                this.message.info('黑夜模式');
            } else {
                this.setCookie("themeState", "Light", 1);
                this.message.info('白天模式');
            }
        });
        if (this.getCookie("themeState") === "Dark") {
            document.documentElement.classList.add("Dark");
        }
    }
    // 处理 yiyan
    handle_yiyan() {
        if (document.querySelector('.author_div .yiyan')) {
            const refreshButton = document.getElementById('refresh_yiyan');
            refreshButton.addEventListener('click', this.fetch_yiyan);
            this.fetch_yiyan();
        }
    }
    // 获取一言
    async fetch_yiyan() {
        const Text = document.getElementById('text_yiyan');
        if (Text) {
            Text.textContent = '加载中...';
            try {
                const response = await fetch('/?yiyan');
                const data = await response.json();
                Text.textContent = data.yiyan || '获取失败，请重试';
            } catch (error) {
                Text.textContent = '获取失败，请检查网络连接';
                console.error('Error fetching:', error);
            }
        }
    }
    // 处理弹窗
    handle_pop() {
        if (!this.tc) {
            this.tc = document.createElement('div');
            this.tc.className = 'tc';

            const tcMain = document.createElement('div');
            tcMain.className = 'tc-main';

            this.img = document.createElement('img');
            this.img.className = 'tc-img';

            tcMain.appendChild(this.img);
            this.tc.appendChild(tcMain);
            document.body.appendChild(this.tc);

            this.tc.addEventListener('click', () => this.tc.classList.remove('active'));
            tcMain.addEventListener('click', event => event.stopPropagation());
        }

        // 为所有触发元素绑定事件
        document.querySelectorAll('#pop').forEach(element => {
            element.addEventListener('click', (event) => {
                const imageURL = element.getAttribute('data-src'); // 获取图片链接
                if (imageURL) {
                    this.img.src = imageURL; // 更新图片
                    this.tc.classList.add('active'); // 显示弹窗
                }
            });
        });
    }


    // 目录高亮
    handle_toc() {
        const tocLinks = document.querySelectorAll("#toc li a");
        if (tocLinks.length > 0) {
            const headers = Array.from(tocLinks).map(link => document.querySelector(link.getAttribute("href")));
            // 防抖函数
            function debounce(func, wait) {
                let timeout;
                return function (...args) {
                    const context = this;
                    clearTimeout(timeout);
                    timeout = setTimeout(() => func.apply(context, args), wait);
                };
            }
            function highlightToc() {
                let activeIndex = -1;
                const scrollY = window.scrollY || document.documentElement.scrollTop;
                const documentHeight = document.documentElement.scrollHeight;
                const viewportHeight = window.innerHeight;

                if (scrollY < headers[0].offsetTop) {
                    activeIndex = 0;
                } else if (scrollY + viewportHeight >= documentHeight) {
                    activeIndex = headers.length - 1;
                } else {
                    for (let i = 0; i < headers.length; i++) {
                        const currentHeaderTop = headers[i].offsetTop;
                        const nextHeaderTop = headers[i + 1]?.offsetTop || Infinity;
                        if (scrollY >= currentHeaderTop && scrollY < nextHeaderTop) {
                            activeIndex = i;
                            break;
                        }
                    }
                }
                tocLinks.forEach(link => link.parentElement.classList.remove("active"));
                if (activeIndex >= 0) {
                    tocLinks[activeIndex].parentElement.classList.add("active");
                }
            }

            // 添加防抖后的高亮函数
            const debouncedHighlightToc = debounce(highlightToc, 10);
            tocLinks.forEach(link => {
                link.addEventListener("click", (e) => {
                    e.preventDefault();
                    const target = document.querySelector(link.getAttribute("href"));
                    target.scrollIntoView({ behavior: "smooth" });
                });
            });
            highlightToc();
            window.addEventListener("scroll", debouncedHighlightToc);
        }
    }
    // 处理页面加载动画
    handle_init_animations() {
        setTimeout(() => {
            const preloader = document.querySelector('.preloader');
            if (preloader) {
                preloader.style.opacity = '0';
                preloader.style.display = 'none';
            }
        }, 400);
        /*网速太快了，给我等400毫秒吧 */
    }
    handle_fade_in() {
        if (history.scrollRestoration) {
            history.scrollRestoration = 'manual';
        }
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0,
        };
        const callback = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        };
        const observer = new IntersectionObserver(callback, options);

        const fadeInElements = document.querySelectorAll('.fade-in');
        fadeInElements.forEach((element) => {
            observer.observe(element);
        });
        const post_elements = document.querySelectorAll('.post_content > *');
        post_elements.forEach((element) => {
            element.classList.add('fade-in');
            observer.observe(element);
        });
    }
    // 初始化懒加载
    handle_lazyload() {
        $("img.lazy").lazyload({
            placeholder: loadimg,
            load: function () {
                $(this).addClass("loaded1");
                setTimeout(() => {
                    $(this).addClass("loaded2");
                }, 300);
            },
            appear: function () {
                //$(this).addClass("loaded1");
                //如果你想在loading图展示阶段就模糊，就取消注释
            }
        });
        //他妈的这些参数原来是可以是配置的，最开始在zyyo主题使用lazyload时没看文档花了好长时间直接在jquery.lazyload.js里直接改源码，包括加载效果和默认图片，我蠢死了
        //我他妈蠢蛋
    }
    // 初始化图片灯箱
    handle_imgbox() {
        window.ViewImage && ViewImage.init('.lazy');
    }
    // 代码高亮
    handle_code_highlight() {
        window.hljs && hljs.highlightAll();
    }
    // 初始化复制代码按钮
    handle_code_copy() {
        const copyButtons = document.querySelectorAll('.copy-btn');
        copyButtons.forEach(button => {
            button.addEventListener('click', () => {
                const codeElement = button.parentElement.nextElementSibling.querySelector('code');
                if (!codeElement) {
                    console.error('未找到代码块');
                    return;
                }
                const code = codeElement.innerText;
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(code).then(() => {
                        button.textContent = '已复制';
                        this.message.info('已复制');
                        setTimeout(() => button.textContent = '复制', 2000);
                    }).catch(err => {
                        console.error('复制失败:', err);
                        button.textContent = '复制失败';
                    });
                } else {
                    // 回退方案：手动创建 textarea 进行复制
                    const textArea = document.createElement('textarea');
                    textArea.value = code;
                    document.body.appendChild(textArea);
                    textArea.select();
                    try {
                        document.execCommand('copy');
                        button.textContent = '已复制';
                        this.message.info('已复制');
                    } catch (err) {
                        console.error('回退复制失败:', err);
                        button.textContent = '复制失败';
                    }
                    document.body.removeChild(textArea);
                }
            });
        });
    }
    handle_post_copy() {
        const button = document.getElementById('post_copy');
        if (button) {
            button.addEventListener('click', () => {
                const text = window.location.href;
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(text).then(() => {
                        this.message.info('已复制');
                        button.textContent = '已复制';
                        setTimeout(() => button.textContent = '分享', 2000);
                    }).catch(err => {
                        console.error('复制失败:', err);
                    });
                } else {
                    // 回退方案：手动创建 textarea 进行复制
                    const textArea = document.createElement('textarea');
                    textArea.value = text;
                    document.body.appendChild(textArea);
                    textArea.select();
                    try {
                        document.execCommand('copy');
                        this.message.info('已复制');
                        button.textContent = '已复制';
                        setTimeout(() => button.textContent = '分享', 2000);
                    } catch (err) {
                        console.error('回退复制失败:', err);
                    }
                    document.body.removeChild(textArea);
                }
            });
        }

    }
    // 设置 cookie
    setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }
    // 获取 cookie
    getCookie(name) {
        var nameEQ = name + "=";
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1, cookie.length);
            }
            if (cookie.indexOf(nameEQ) == 0) {
                return cookie.substring(nameEQ.length, cookie.length);
            }
        }
        return null;
    }
}

// 实例化 Zyyo 类

var zyyo = new Zyyo();
