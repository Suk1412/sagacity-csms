
import { createApp } from 'vue'
import { createPinia } from 'pinia'
// import App from './demo/App.vue'
// import App from './pages/About.vue'
// import App from './pages/Photo.vue'
// import App from './components/HomeBackGround.vue'
// import App from './components/writings/About.vue'

import App from './App.vue'
import './style.css'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')