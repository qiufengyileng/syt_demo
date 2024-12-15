<template>
  <div class="content">
    <h2>首都医科大学宣武医院预约挂号须知</h2>
    <p>为方便您早日就医康复，请您认真阅读预约挂号须知：</p>
    <h4>{{'一、预约实名制：'}}</h4>
    <p>{{`统一平台电话预约和网上预约挂号均采取实名制注册预约
      ，请您如实提供就诊人员的真实姓名、有效证件号（身份证、护照）、性别、手机号码、社保卡号等基本信息。`}}</p>
  </div>
</template>

<script setup lang="ts">
import {getHospitalDetailByHoscode} from '../../../api/hospital/index'
import {ref} from 'vue'
import {useRoute} from 'vue-router'

//得到query对象
const query = useRoute().query
//得到的HospitalDetail数据
const hospitalDetail=ref({})
//得到的bookingRules数据
const bookingRule=ref('')
//vue3初始化数据结构，避免嵌套访问时的报错。
const hosptial_hostypeString=ref('')
// 获取医院详情
async function getHospitalDetail(hoscode:string){
 const result=await  getHospitalDetailByHoscode(hoscode)
 hospitalDetail.value=result.data.hospital
 bookingRule.value=result.data.bookingRule
 hosptial_hostypeString.value=result.data.hospital.param.hostypeString
  // console.log('result',result,hospitalDetail.value,bookingRule.value)

}
getHospitalDetail(query.code as string)
</script>

<style scoped lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
p,li{
  color: #666;
  text-indent: 2rem;
}
p{
  line-height: 2rem;
  letter-spacing:0.5px
}
.content{
  width: 100%;
  h4{
    margin: 20px 0;
  }
  h2{
    text-align: center;
    margin-bottom: 20px;
  }
}

</style>