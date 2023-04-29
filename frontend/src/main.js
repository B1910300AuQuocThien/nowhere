import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueSeetalert from 'vue-sweetalert2'
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import './assets/main.css'
import VueCookies from 'vue-cookies'
const app = createApp(App)

app.use(VueCookies)
app.use(VueSeetalert)
app.use(router)
// app.use(VueSession)

app.mount('#app')
