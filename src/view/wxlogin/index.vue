<template>
  <div></div>
</template>

<script setup lang="ts">
import{setUserInfo} from '../../utils/localStore'
import {useRoute} from 'vue-router'
import { json } from 'stream/consumers'
const $route=useRoute()
setUserInfo(JSON.stringify($route.query))
</script>

<style scoped lang="scss">

</style>