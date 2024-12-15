<template>
  <div class="title-wrapper">
    <span class="title">{{hospitalDetail.hosname}}</span>
    <span class="level-title">
      <el-icon style="margin-right: 5px;margin-left:5px"><Histogram /></el-icon>
      {{hosptial_hostypeString}}
    </span>
  </div>
  <div class="route-to">
    <img :src="'data:image/jpeg;base64,'+hospitalDetail.logoData" />
      <el-icon style="margin:0 15px;font-size:17px"><Promotion /></el-icon>
    <p class="route-describe">
      {{hospitalDetail.route}}</p>
  </div>
  <div class="hospital-detail">
    <h3>医院介绍</h3>
    <p class="hosptial-describe">
      {{hospitalDetail.intro}}
    </p>
  </div>
</template>

<script setup lang="ts">
import {getHospitalDetailByHoscode} from '../../../api/hospital/index'
import {useRoute} from 'vue-router'
import {ref,onMounted} from 'vue'

import {Histogram,Promotion} from '@element-plus/icons-vue'
//得到query对象
const query = useRoute().query
//得到的HospitalDetail数据
const hospitalDetail=ref({})
//vue3初始化数据结构，避免嵌套访问时的报错。
const hosptial_hostypeString=ref('')
// 获取医院详情
async function getHospitalDetail(hoscode:string){
 const result=await  getHospitalDetailByHoscode(hoscode)
//  console.log('result',result)
 hospitalDetail.value=result.data.hospital
 hosptial_hostypeString.value=result.data.hospital.param.hostypeString

}
getHospitalDetail(query.code as string)




</script>
<style scoped lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.title-wrapper{
  .title{
   color: #333;
    font-size: 26px;
    font-weight: 700;
    margin-right: 15px;
  }
  .level-title{
    color: #999;
    font-size: 16px;
  }
}
.route-to{
  display: flex;
  margin-top: 50px;
  img{
    --len:90px;
    object-fit: contain;
   width: var(--len);
   height: var(--len);
    margin-right: 10px;
  }
  .route-describe{
    color: #333;
    width: 76%;
    font-size: 16px;
  }
}
.hospital-detail{
  margin-top: 40px;
  h3{
    margin-bottom: 20px;
  }
  .hosptial-describe{
    text-indent: 2rem;
    line-height: 2.5;
      width: 88%;
  letter-spacing: 0.5px; 
    
  }
}
</style>