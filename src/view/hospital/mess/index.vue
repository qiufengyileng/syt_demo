<template>
  <div>
    <h2 class="title">{{stopInfo}}停诊信息</h2>
    <el-empty description="暂无信息" />
  </div>
</template>

<script setup lang="ts">
import {getHospitalDetailByHoscode} from '../../../api/hospital/index'
import {ref} from 'vue'
import {useRoute} from 'vue-router'

//得到query对象
const query = useRoute().query
//得到停诊信息,没有信息，所以这是只是拿到了名字
const stopInfo=ref<any>()
// 获取医院详情
async function getHospitalDetail(hoscode:string){
 const result=await  getHospitalDetailByHoscode(hoscode)
 stopInfo.value=result.data.hospital.hosname
  //  console.log('result',stopInfo.value)

}
getHospitalDetail(query.code as string)
</script>

<style scoped lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.title{
  font-weight: 500;
  text-align: center;
  margin-bottom: 80px;
}
</style>