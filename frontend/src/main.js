import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import './assets/main.css'
import VueCookies from 'vue-cookies'
import vue3GoogleLogin from 'vue3-google-oauth2'
const app = createApp(App)

const gauthOption = {
    clientId: '305120883812-d5mh367se09icv3fujvsnfvhve76jj0d.apps.googleusercontent.com',
    scope: 'profile email',
    prompt: 'consent',
    fetch_basic_profile: true,
    plugin_name: 'gmail'
}
app.use(vue3GoogleLogin, gauthOption)
app.use(VueCookies)
app.use(router)
// app.use(VueSession)

app.mount('#app')


