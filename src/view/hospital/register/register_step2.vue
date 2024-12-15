<template>
  <div class="box">
    <h4 class="title">确认挂号信息</h4>
    <el-card style="max-width: 1080px; margin-top: 30px;cursor: pointer;">
      <template #header>
        <div class="card-header">
          <span>请点击选择就诊人</span>
          <el-button type="success"
          @click="goUser"
            ><el-icon><User /></el-icon>添加就诊人</el-button
          >
        </div>
      </template>
      <div class="user">
        <Vistor
          v-for="(item, index) in userInfoList"
          :key="index"
          :item="item"
          :index="index"
          :currentIndex="currentIndex"
          class="user-item"
          @click="toSelect(index)"
          @changescene="TochangeScene"
        />
      </div>
    </el-card>
    <!-- 医生信息 -->
    <div class="info">
      <el-card style="max-width: 1080px; margin-top: 30px">
        <template #header>
          <div class="card-header">
            <span>挂号信息</span>
          </div>
        </template>
        <el-descriptions
    :column="2"
    size="default"
    border
  >
    <el-descriptions-item label="就诊日期:">{{doctorInfo.workDate}}</el-descriptions-item>
    <el-descriptions-item label="就诊医院:">{{doctorInfo.param?.hosname}}</el-descriptions-item>
    <el-descriptions-item label="就诊科室:">{{doctorInfo.param?.depname}}</el-descriptions-item>
    <el-descriptions-item label="医生姓名:">{{doctorInfo.docname}}</el-descriptions-item>
    <el-descriptions-item label="医生职称:">{{doctorInfo.title}}</el-descriptions-item>
    <el-descriptions-item label="医生专长:">{{doctorInfo.skill}}</el-descriptions-item>
    <el-descriptions-item label="医事服务费用:">
    <span style="color:red">{{doctorInfo.amount}}</span>
    </el-descriptions-item>
  </el-descriptions>
      </el-card>
    </div>
    <!-- 确认挂号 -->
    <div class="footer">
      <el-button
        type="primary"
        style="width: 160px; height: 40px; font-size: 18px"
        :disabled="currentIndex===-1"
        @click="toUserPart()"
        >确认挂号</el-button
      >
    </div>
  </div>
</template>

<script  setup lang="ts">
import { User } from "@element-plus/icons-vue";
import Vistor from "../../../components/register/vistor.vue";
import{getUserInfo,getDoctor} from "../../../api/hospital"
import{getSubmitOrder} from "../../../api/user"
import {useRoute,useRouter} from 'vue-router'
import {ElMessage} from 'element-plus'
import {ref} from 'vue'
const $route=useRoute()
const $router=useRouter()
// 就诊用户信息
let userInfoList=ref([])
//医生信息
let doctorInfo=ref({})
//当前选中的卡片索引
let currentIndex = ref(-1);
function toSelect(index){
 currentIndex.value = index;
 console.log(currentIndex.value);
}
//获取就诊用户信息
async function getUserDatas(){
  const result=await getUserInfo()
  userInfoList.value=result.data
  console.log('userInfo',userInfoList.value)
}
getUserDatas()
//获取医生信息
async function getDoctorDatas(){
  const result=await getDoctor($route.query.docId as string)
  doctorInfo.value=result.data
  // console.log('doctorInfo',doctorInfo.value)
}
getDoctorDatas()

//toUserPart()
async function toUserPart(){
  //医院编号
  const hoscode=$route.query.hoscode
  //医生编号
  const docId=$route.query.docId
  //患者id
  const patientId=userInfoList.value[currentIndex.value].id
  // console.log('patientId',patientId)
  const result=await getSubmitOrder(hoscode as string,docId as string,patientId)
  console.log('getSubmitOrder-result',result)
  //@ts-ignore
  if(result.code==200){
    $router.push({path:'/user/order',query:{orderId:result.data}})
  }else{
    //@ts-ignore
    ElMessage.error({
       //@ts-ignore
      message:result.message,
      type:'error'
    })
  }
}
//goUser
const goUser=()=>{
  $router.push('/user/patient?type=add')
}
//TochangeScene
const TochangeScene=(userData)=>{
  $router.push({path:'/user/patient',query:{
    type:'change',id:userData.id
  }})
}
</script>

<style scoped lang="scss">
.box {
  .title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .card-header {
    span {
      font-size: 18px;
      color: #666;
      padding-top: 3px;
    }
    display: flex;
    justify-content: space-between;
    font-weight: 600;
  }
  .user {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    .user-item {
      margin: 10px 5px;
    }
  }
  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
}
</style>