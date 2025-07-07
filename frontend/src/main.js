import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style.css'
import { Field, Form, ErrorMessage } from 'vee-validate'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.component('VeeForm', Form)
app.component('VeeField', Field)
app.component('ErrorMessage', ErrorMessage)
app.mount('#app')
