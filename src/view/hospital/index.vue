<template>
  <div class="box">
    <div class="container">
      <div class="left">
        <el-row class="tac">
          <el-col>
            <!-- 侧边菜单 -->
            <el-menu class="el-menu-vertical-demo" :router="true">
              <p>
                <el-icon><HomeFilled /></el-icon
                ><span style="margin: 0 10px">/</span>医院信息
              </p>
              <el-menu-item
                v-for="(item, index) in subNarData"
                :key="index"
                :index="item.path"
                :route="item.path"
              >
                <el-icon><component :is="item.icon" /></el-icon>
                <span>{{ item.name }}</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <!-- 详情展示 -->
      <div class="right">
        <router-view :key="+new Date()"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  HomeFilled,
  Search,
  Document,
  Calendar,
  Warning,
  Bell,
} from "@element-plus/icons-vue";
import { ref, onUnmounted } from "vue";
import { useRoute } from "vue-router";
// 获取路由参数query
const query = useRoute().query;
// 导航栏菜单数据,并给所有路径加上query参数
console.log("creat");
console.log("getquery", query);
const subNarData = ref(
  [
    { name: "预约挂号", icon: Calendar, path: "register" },
    { name: "医院详情", icon: Document, path: "detail" },
    { name: "预约通知", icon: Bell, path: "notice" },
    { name: "停诊信息", icon: Warning, path: "close" },
    { name: "查询/取消", icon: Search, path: "search" },
  ].map((item) => {
    return {
      ...item,
      // path:item.path+'?code='+query.code||query.hoscode,
      /* 
    在 JavaScript 中，|| 的优先级高于 +。因此，item.path+'?code='+query.code||query.hoscode 实际上会被
    解析为 item.path + '?code=' + (query.code || query.hoscode)。
    如果 query.code 为 undefined 或 null，则 query.code || query.hoscode 会返回 query.hoscode。
    但如果 query.code 为 false、0、"" 等 falsy 值，也会导致 query.code || query.hoscode 返回 query.hoscode。
    */
      path: `${item.path}?code=${query.code || query.hoscode}`,
    };
  })
);
onUnmounted(() => {
  console.log("destory");
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
    //  background-color: pink;
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