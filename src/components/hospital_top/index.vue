<template>
  <div class="top">
    <div class="content">
      <div class="left-part">
        <img src="../../assets/imge/logo.png" alt="logo">
        <p>尚医通<span>预约统一挂号平台</span></p>
      </div>
      <div class="right-part">
          <span>帮助中心</span>
          <span @click="toLogin" v-if="!userStore.userInfo.name">登录/注册</span>
          <span v-else> <el-dropdown>
    <span>
      {{ userStore.userInfo.name }}
      <el-icon>
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="changeRouter('certification')">实名认证</el-dropdown-item>
        <el-dropdown-item @click="changeRouter('order')">挂号订单</el-dropdown-item>
        <el-dropdown-item @click="changeRouter('patient')">就诊管理</el-dropdown-item>
        <el-dropdown-item  @click="logOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useUserStore} from '../../store/user.ts'
import { ArrowDown } from '@element-plus/icons-vue'
import{removeUserInfo} from '../../utils/localStore.ts'
import {useRouter} from 'vue-router'
let userStore=useUserStore()

const $router=useRouter()
//toLogin
const toLogin=()=>{
  userStore.visible=true
}
//logOut
const logOut=()=>{
  // 清除仓库数据
  userStore.userInfo={}
  // 清除本地存储
  removeUserInfo()
}
//切换路由
function changeRouter(path:string){
$router.push(`/user/${path}`)
}
</script>

<style scoped lang="scss">
:deep(.el-dropdown){
  border: none!important;
  outline: none!important;
  font-size: 16px!important;
}
:deep(.el-tooltip__trigger:focus-visible) {
      outline: unset;
    }
.top {
  position: fixed;
  top: 0;
  z-index: 99;
  width: 100vw;
  height: 70px;
  // background: pink;
  border-bottom: #f5f5f5 1px solid;
  .content {
    width: 90%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    .left-part {
      display: inline-flex;
      justify-content: left;
      align-content: center;
      img{
        width: 60px;
        // aspect-ratio: 1 / 1;
        height: 60px;
        border-radius: 50%;
        background-size: contain;
        background-position: center;
        // background: #c9bbbb;
      }
      p{
        margin: 0;
        display: block;
        line-height: 70px;
        font-size: 25px;
        margin-left: 20px;
        color:#25a6db;
        span{
          display: inline-block;
          padding-left: 10px;
        }
      }
    }
    .right-part {
      display: flex;
      align-items: center;
      a{
        text-decoration: none;
    }
     span{
        margin-right: 30px;
        color: #8e8a8a;
        cursor: pointer;
      }
    }
  }
}
</style>
import { userInfo } from 'os';
import { userInfo } from 'os';

