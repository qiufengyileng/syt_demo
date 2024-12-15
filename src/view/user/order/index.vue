<template>
  <component :is="Showcomponent? DetailPage:AllPage"/>
</template>

<script setup lang="ts">
import DetailPage from './orderDetail/index.vue'
import AllPage from './allOrder/index.vue'
import {useRoute} from 'vue-router'
const $route = useRoute()
//用来决定是显示详情页面还是全部订单页面,不用包ref
let Showcomponent = $route.query.orderId

</script>

<style scoped lang="scss">

</style>