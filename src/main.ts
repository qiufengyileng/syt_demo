import { createApp } from 'vue'
import App from './App.vue'
import './style/reset.scss'
import router from './permisstion.ts'
import store from './store/index.ts'
import ElemtentPlus from 'element-plus'
import 'element-plus/dist/index.css'
//中文包
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import HospitalTop from './components/hospital_top/index.vue'
import HospitalBottom from './components/hospital_bottom/index.vue'
import login from './components/login/index.vue'

const app= createApp(App)
app.use(ElemtentPlus,{
  locale: zhCn
})
//@ts-ignore
app.use(store)
app.component('hospital-top', HospitalTop)
app.component('hospital-bottom', HospitalBottom)
app.component('Login', login)
app.use(router)
app.mount('#app')
