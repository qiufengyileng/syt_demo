<template>
  <div>
    <!-- 轮播图 -->
    <Carousel />
    <!--  搜索 -->
    <Search />
    <!-- 展示 -->
     <div id="show" style="margin-top: 80px;min-height:600px ;">
    <el-row>
      <el-col :span="19">
        <Choose @searchByLevelAndDistrict="sendToHospitalList"/>
        <Hospital_list
        :level="level"
        :district="district"
        />
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="4">
        <Subside />
      </el-col>
    </el-row>
  </div>
  </div>
</template>

<script setup lang="ts">
import Carousel from '../../components/Carousel/index.vue'
import Search from '../../components/Search/index.vue'
import Choose  from '../../components/Choose/index.vue'
import Hospital_list from '../../components/hospital_list/index.vue'
import Subside from '../../components/subside/index.vue'

import { ref } from 'vue'

//等级和地区
const level=ref('')
const district=ref('')
function sendToHospitalList(data,type){
 if(type==='level'&&level.value!==data.value){
  console.log('data',data)
  level.value=data.value
  console.log('跟新level',level.value)
 }
 if(type==='district'&&district.value!==data.value){
  district.value=data.value
  console.log('跟新district',district.value)
 }
}
</script>

<style scoped lang="scss"></style>