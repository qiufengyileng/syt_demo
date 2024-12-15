<template>
  <div class="bottom">
    <div class="container">
      <div class="left">
        <span>京ICP备 130180369号</span>
        <span>电话挂号010-12345623</span>
      </div>
      <div class="right">
        <a href="">
          <span>联系我们</span>
        </a>
        <a href="">
          <span>合作关系</span>
        </a>
        <a href="">
          <span>用户协议</span>
        </a>
        <a href="">
          <span>隐私协议</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.bottom {
  width: 100%;
  height: 50px;
  display: flex;
  margin-top: 40px;
  justify-content: center;

  .container {
    width: 96%;
    height: inherit;
    display: flex;justify-content: center;
    
    align-items: center;

    .left {
      margin-right: 930px;
      span {
        color: #393838;
        margin-right: 10px;
      }
    }

    .right {
      a {
        text-decoration: none;

        span {
          margin-left: 10px;
          color: #000000b0
        }
      }
    }
  }
}
</style>
