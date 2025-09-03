import { handle_scroll, handle_moible_menu } from "@/static/js/uiHandlers.js"

export default {
  install(app) {
    app.config.globalProperties.$ui = {
      handle_scroll,
      handle_moible_menu
    }
  }
}