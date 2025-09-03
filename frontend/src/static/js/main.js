export default class Wx {
  constructor() {
    this._unsubs = []      // 统一记录解绑函数
    this.bootstrap()
  }

  bootstrap() {
    if (document.readyState === 'loading') {
      const fn = () => { this._init(); document.removeEventListener('DOMContentLoaded', fn) }
      document.addEventListener('DOMContentLoaded', fn)
      this._unsubs.push(() => document.removeEventListener('DOMContentLoaded', fn))
    } else {
      this._init()
    }
  }

  _init() {
    this.message = new Message()
    this.handle_keydown()
    this.handle_scroll()
    this.handle_search()
    this.handle_moible_menu()
    this.handle_back_to_top()
    this.handle_theme_toggle()
    this.handle_guanxing()
    this.handle_init_animations()
    // ⚠️ 若你用 Vue Router，建议禁用 pjax，避免冲突
    // this.init_pjax()
  }

  // 包装一个工具，统一记录解绑
  _listen(target, type, handler, options) {
    target.addEventListener(type, handler, options)
    this._unsubs.push(() => target.removeEventListener(type, handler, options))
  }

  handle_keydown() {
    const k1 = (e)=>{ if(e.ctrlKey && e.key==='k'){ e.preventDefault(); document.querySelector('.seach_modal')?.classList.toggle('active') } }
    const k2 = (e)=>{ if(e.key==='F12' || (e.ctrlKey && e.shiftKey && e.key==='I')) this.message.info('检测到你打开控制台，请遵循网站协议') }
    this._listen(document, 'keydown', k1)
    this._listen(document, 'keydown', k2)
  }

  handle_scroll() {
    const header = document.querySelector('.header')
    if (!header) return
    let last = 0
    // 先执行一次
    const tick = () => {
      const y = window.pageYOffset || document.documentElement.scrollTop || 0
      header.classList.toggle('index',  y > document.documentElement.clientHeight)
      header.classList.toggle('active', y > document.documentElement.clientHeight + 100)
      if (y > last && y > document.documentElement.clientHeight + 200) header.classList.add('hide')
      else header.classList.remove('hide')
      last = Math.max(0, y)
    }
    tick()

    const onScroll = () => tick()
    this._listen(window, 'scroll', onScroll, { passive: true })
  }


  handle_scroll() {
    const header = document.querySelector(".header");
    if (!header) return;
    let lastScrollTop = 0;
    const onScroll = () => {
        const currentHeight = window.pageYOffset || document.documentElement.scrollTop || 0;
        header.classList.toggle("index", currentHeight > document.documentElement.clientHeight);
        header.classList.toggle("active", currentHeight > document.documentElement.clientHeight + 100);
        if (currentHeight > lastScrollTop && currentHeight > document.documentElement.clientHeight + 200) {
        header.classList.add("hide");
        } else {
        header.classList.remove("hide");
        }
        lastScrollTop = Math.max(0, currentHeight);
    };
    // 先执行一次
    onScroll();
    // 绑定
    window.addEventListener("scroll", onScroll, { passive: true });
    // 返回解绑方法，供 Vue 卸载时调用
    return () => window.removeEventListener("scroll", onScroll);
    }

  

  // …其余方法里凡是 addEventListener，都改为 this._listen(...)

  destroy() {
    // 统一解绑
    this._unsubs.forEach(fn => { try{ fn() } catch(_){} })
    this._unsubs = []
  }
}
