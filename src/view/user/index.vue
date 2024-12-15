<template>
  <div class="box">
    <div class="container">
      <div class="left">
        <el-row class="tac">
          <el-col>
            <!-- 侧边菜单 -->
            <el-menu
              class="el-menu-vertical-demo"
              :default-active="2"
              :router="true"
            >
              <p><el-icon><HomeFilled /></el-icon><span style="margin: 0 10px;">/</span>会员中心</p>
              <el-menu-item v-for="(item, index) in subNarData" :key="index" :index="index + 1" :route="item.path">
                <el-icon><component :is="item.icon" /></el-icon>
                <span>{{ item.name }}</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <!-- 详情展示 -->
      <div class='right'>
        <router-view :key="+new Date()" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HomeFilled, ChatDotRound, Document, Warning, Postcard, Memo, User } from '@element-plus/icons-vue';
import { ref, computed,watch } from 'vue';
import { useRoute } from 'vue-router';

// 获取路由参数 query
const $route = useRoute();
// 导航栏菜单数据, 并给所有路径加上 query 参数
let $query = ref($route.query);

const subNarData = computed(() => {
  return [
    { name: '实名认证', icon: Postcard, path: 'certification' },
    { name: '挂号订单', icon: Memo, path: 'order' },
    { name: '就诊人管理', icon: User, path: 'patient' },
    { name: '账号信息', icon: Document, path: 'profile' },
    { name: '意见反馈', icon: ChatDotRound, path: 'feedback' },
  ].map((item) => {
    return {
      ...item,
      path: item.path + ($query.value.orderId ? '?orderId=' + $query.value.orderId : '')
    };
  });
});
watch(() => $route.query, (newQuery) => {
  console.log('$route.query', newQuery);
  $query.value = newQuery

});
</script>

<style scoped lang="scss">
.el-menu:deep() {
  border-right: none;
}

.box {
  // 只用来定个位
  .container {
    position: relative;
    display: flex;
    left: 50%;
    transform: translateX(-50%);
    width: 120%;
    // background-color: pink;
    margin: 0 auto;
  }

  .left {
    flex: 1;
    height: 100%;
    position: sticky;
    top: 80px;
    border-right: 1px solid #ededed;
  }

  .right {
    flex: 5;
    margin-left: 50px;
    margin-top: 30px;
    height: 100%;
  }
}
</style>