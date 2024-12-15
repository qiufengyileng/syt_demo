//全局路由守卫
import router from '../src/router'
//@ts-ignore
import  Nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'


import {useUserStore }  from '../src/store/user'
// import pinia from '../src/store'
// const userStore = useUserStore(pinia)

//白名单
const whiteList = ['/home','/hospital/register','/hospital/detail','/hospital/notice','/hospital/close','/hospital/search']
//缓存

//前置守卫
router.beforeEach((to,from,next)=>{
  // 进度条开始
  Nprogress.start()
  //动态设置页面标题
  document.title = to.meta.title as string
  //通过token判断是否登录
  const token = useUserStore().userInfo.token
  if(token){
   // 已登录
    next()
  }else{
    //未登录
      if(whiteList.includes(to.path)){
        next()
        return
      }
       // 打开登录弹框
       useUserStore().visible=true
      next({path:'/home',query:{redirect:to.fullPath}})
  }
})
//后置守卫
router.afterEach((to,from)=>{
  // 进度条结束
  Nprogress.done()
})
export default router