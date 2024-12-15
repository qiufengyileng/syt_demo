<template>
  <div>
  <el-carousel height="350px">
      <el-carousel-item v-for="{src,id} in imageSource" :key="id" style="display: flex; justify-content: left;">
       <img :src="src" alt="" style="object-fit: cover;" width="100%">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import imge from '../../assets/imge/banner.png'
const imageSource = ref([
  { src: imge,id:1 },
  { src: imge,id :2 },
  { src: imge,id:3 },
  { src: imge ,di:4}
])

</script>

<style>

</style>