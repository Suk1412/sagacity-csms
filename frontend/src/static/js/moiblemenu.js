// src/utils/mobileMenu.js
export function handle_moible_menu() {
  const sidebar = document.querySelector('.sidebar')
  if (!sidebar) return
  const openBtn = document.getElementById('sidebar_open')
  if (!openBtn) return
  const open = () => sidebar.classList.add('open')
  const close = (e) => {
    if (e.target.classList.contains('sidebar')) {
      sidebar.classList.remove('open')
    }
  }

  openBtn.addEventListener('click', open)
  sidebar.addEventListener('click', close)

  // 返回解绑函数，避免 Vue 热更新或路由切换时重复绑定
  return () => {
    openBtn.removeEventListener('click', open)
    sidebar.removeEventListener('click', close)
  }
}
