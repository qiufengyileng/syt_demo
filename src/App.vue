<template>
  <div class="container">
    <hospital-top ></hospital-top>
    <div class="content">
      <router-view :key="+new Date()"></router-view>
    </div>
    <hospital-bottom></hospital-bottom>
<!-- 登入组件 -->
    <Login v-if="userStore.visible"/>
  </div>
</template>

<script setup lang="ts">
import request from '../src/utils/interceptors'
import { useUserStore } from './store/user'
import { onMounted } from 'vue'
let userStore = useUserStore()
</script>

<style scoped lang="scss">

// ::-webkit-scrollbar {


//   background-color: yellow;


// }
html,body{
  padding: 0;
}
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: center;
  .content{
    width: 1200px;
    margin-top: 70px;
    min-height: 590px;
    // background-color: yellow;
  }
  // background-color: red;
}
</style>