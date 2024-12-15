import { defineStore } from "pinia"
import { LoginData,UserLoginResponseData } from "../api/hospital/type"
import{getUserLoginData} from "../api/hospital/index"
import {UserState} from './type'
import { UserInfo } from "../api/hospital/type"
import { setUserInfo,getUserInfo } from "../utils/localStore"

 const useUserStore= defineStore("User", {
  state: (): UserState => {
    return {
      visible: false,
      code:'',
      userInfo:(getUserInfo() as UserInfo)//用户信息
    }
  },
  actions: {
    // 手机用户登录
    async userLogin(data:LoginData){
      const result:UserLoginResponseData=await getUserLoginData(data)
     if(result.code===200){
      this.userInfo=result.data
      //本地存储用户信息
      setUserInfo(JSON.stringify(this.userInfo))
      return 'ok'
     }
     else{
      return Promise.reject(new Error(result.message))
     }
    },
    //查询微信扫码的结果
    queryState(){
      //开起定时器每隔一段时间访问本地是否有用户信息
      let timer=setInterval(()=>{
        console.log('queryState',getUserInfo())
        if(JSON.stringify(getUserInfo())!=='{}'){
          this.visible=false
          this.userInfo=getUserInfo()
          clearInterval(timer)
        }
      },1000)
      return timer
    }
  }
})
export{useUserStore}