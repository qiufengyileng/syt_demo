
import { createRouter,createWebHashHistory } from "vue-router"

const Home = () => import('../view/home/index.vue')
const hospital = () => import('../view/hospital/index.vue')
const h_register = () => import('../view/hospital/register/index.vue')
const h_search = () => import('../view/hospital/_search/index.vue')
const h_detail = () => import('../view/hospital/hospital_detial/index.vue')
const h_notice = () => import('../view/hospital/appointment_notice/index.vue')
const h_mess= () => import('../view/hospital/mess/index.vue')
const h_register_step1 = () => import('../view/hospital/register/register_step1.vue')
const h_register_step2 = () => import('../view/hospital/register/register_step2.vue')
const wxLogin = () => import('../view/wxlogin/index.vue')
//会员中心
const  user = () => import('../view/user/index.vue')
const  user_certification = () => import('../view/user/certification/index.vue')
const  user_order = () => import('../view/user/order/index.vue')
const  user_patient = () => import('../view/user/patient/index.vue')
const user_profile = () => import('../view/user/profile/index.vue')

const user_feedback = () => import('../view/user/feedback/index.vue')
const routes =[
  {
    path: '/',redirect: '/home',
  },
  {
    path: '/home',component: Home, meta: { title: '首页' }
  },
  {
    path: '/hospital',component: hospital,children:[
      {
        path: 'register',component: h_register, meta: { title: '预约挂号' }
      },
      {
        path: 'search',component: h_search,meta: { title: '查询/取消' }
      },
      {
        path: 'detail',component: h_detail,meta: { title: '医院详情' }
      },
      {
        path: 'notice',component: h_notice,meta: { title: '预约通知' }
     },
     {
        path: 'close',component: h_mess,meta: { title: '停诊信息' }
     },
     {
        path: 'register_step1',component: h_register_step1,meta: { title: '预约挂号步骤一' }
     },
     {
      path: 'register_step2',component:  h_register_step2,meta: { title: '预约挂号步骤二' }
     }
    ]
  },
  {
    path:'/wxlogin',component: wxLogin
  },
  {path:'/user',component: user,meta: { title: '会员中心' },
    children:[
     {path:'certification',component:user_certification,meta: { title: '实名认证' }},
     {path:'order',component:user_order,meta: { title: '挂号订单' }},
     {path:'patient',component:user_patient,meta: { title: '就诊人管理' }},
     {path:'profile',component:user_profile,meta: { title: '账号信息' }},
     {path:'feedback',component:user_feedback,meta: { title: '意见反馈' }}
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
   return { left: 0, top: 0 }
  }
})
export default router
