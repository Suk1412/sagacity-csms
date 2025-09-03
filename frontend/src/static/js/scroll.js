// utils/scroll.js
export function handle_scroll() {
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
