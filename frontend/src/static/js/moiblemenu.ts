export function handle_moible_menu(): (() => void) | undefined {
  const sidebar = document.querySelector('.sidebar') as HTMLElement | null
  if (!sidebar) return
  const openBtn = document.getElementById('sidebar_open') as HTMLElement | null
  if (!openBtn) return

  const open = () => sidebar.classList.add('open')
  const close = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      sidebar.classList.remove('open')
    }
  }

  openBtn.addEventListener('click', open)
  sidebar.addEventListener('click', close)

  return () => {
    openBtn.removeEventListener('click', open)
    sidebar.removeEventListener('click', close)
  }
}
