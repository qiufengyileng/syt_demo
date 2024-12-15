<template>
  <div class="card" >
    <div class="top"  @click.stop>
      <div class="left">
        <div class="yibao">医保</div>
        <div class="name">{{ item.name }}</div>
      </div>
      <!-- 右侧按钮 -->
      <div style="display: flex">
      <el-button type="primary" class="right" @click="$emit('changescene',item)">
        <el-icon><Edit /></el-icon>
      </el-button>
       <slot ></slot>
       </div>
    </div>
    <div class="body" >
      <ul>
        <li>证件类型:{{ item.param?.certificatesTypeString || "暂无信息" }}</li>
        <li>证件号码:{{ item.certificatesNo || "暂无信息" }}</li>
        <li>用户性别:{{ !item.sex ? "女" : "男" || "暂无信息" }}</li>
        <li>出生日期:{{ item.birthdate || "暂无信息" }}</li>
        <li>手机号码:{{ item.phone || "暂无信息" }}</li>
        <li>婚姻状况:{{ item.isMarry ? "已结婚" : "未结婚" || "暂无信息" }}</li>
        <li>当前住址:{{ item.address || "暂无信息" }}</li>
        <li>详细住址:{{ item.param.fullAddress || "暂无信息" }}</li>
      </ul>
      <!-- 选中样式 -->
      <transition name="selected">
         <div class="selected" v-show="currentIndex===index">已选择</div>
      </transition>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Edit } from "@element-plus/icons-vue";
import { defineProps, ref } from "vue";
const props = defineProps(["item",'index','currentIndex']);

</script>

<style scoped lang="scss">
.card {
  box-shadow: #99999945 0px 0px 10px;
  border-radius: 6px;
  .top {
    display: flex;
    justify-content: space-between;
    background-color: #99999945;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    align-items: center;
    height: 60px;
    padding: 0 20px;
    margin-bottom: 10px;
    .left {
      display: flex;
      .yibao {
        margin-right: 10px;
        border-radius: 4px;
        padding: 6px;
        background-color: #fff;
      }
      .name {
        display: flex;
        align-items: center;
      }
    }
    .right {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      font-size: 18px;
      border-radius: 50%;
      aspect-ratio: 1 / 1;
    }
  }
  .body {
    position: relative;
    ul {
      padding-bottom: 8px;
      list-style: none;
      li {
        font-size: 18px;
        margin: 12px 8px;
      }
    }
     .selected {
        position: absolute;
        top: 50%;
        left: 50%;
       width: 200px;
       display: flex;
       justify-content: center;
       align-items: center;
       aspect-ratio: 1 / 1;
        border: 1px dotted red;
        // background-color: yellow;
          border-radius: 50%;
        font-size: 30px;
        opacity: 0.4;
        transform: translate(-50%, -50%) rotate(30deg);
        color: red;
      }
  }
}
.selected-enter-from {
  opacity: 0;
}
.selected-enter-to {
  opacity: 1;
}
.selected-enter-active {
  transition: all 0.5s;
}
</style>