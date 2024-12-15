<template>
  <div id="list-container">
    <el-empty description="暂无数据" v-show="!hospitalArr.length" style="height: 410px; width: 200%;"/>
    <el-card style="height:100px;" shadow="hover" v-for="item in hospitalArr" :key="item" @click="goToDetail(item.hoscode)">
      <div class="card-item">
      <div class="left">
        <p class="name">{{ item.hosname }}</p>
        <p>
          <span> <el-icon><Histogram /></el-icon>{{ item.param.hostypeString }}</span>
          <span><el-icon><Phone /></el-icon>每天{{item.bookingRule.releaseTime}}放号</span><i></i></p>
      </div>
      <div class="right">
        <img :src="'data:image/jpeg;base64,'+item.logoData">
      </div>
    </div>
    </el-card>
<!-- 分页 -->
  </div>
  <el-pagination
      v-model:current-page="currentpage"
      v-model:page-size="pagesize"
      :page-sizes="[10, 14, 16, 20]"
      :size="size"
      :disabled="disabled"
      :background="background"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="margin-top: 40px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
</template>

<script setup lang="ts">
import {Histogram,Phone} from '@element-plus/icons-vue'
import {useRouter} from 'vue-router'
import {getHospital} from '../../api/home/index'
import { ref,defineProps,watch } from 'vue'

// 引入路由
const $router=useRouter()

//引入类型，进行约束
import type {Content,HospitalResponseData} from '../../api/home/type.ts'
import path from 'path'
const props=  defineProps({
  level: String,
  district: String
})
watch(
  ()=>{ return{level: props.level,district:props.district}},
  (newValue)=>{
  //  发送请求
  console.log('newValue')
  getHospitalData()
  }
)

const currentpage=ref<number>(1)
const pagesize=ref<number>(10)

//获取数据医院列表
getHospitalData()

const hospitalArr=ref<Content>([])
const total=ref<number>(0)
//获取数据
async function getHospitalData(){
  console.log(currentpage.value,pagesize.value,props.level,props.district)
  const data:HospitalResponseData= await getHospital(currentpage.value,pagesize.value,props.level,props.district)
  console.log(data)
  if(data.code==200){
    hospitalArr.value=data.data.content
    total.value=data.data.totalElements
    // console.log(hospitalArr.value)
  }
}

//点击跳转详情页
const goToDetail=(hoscode:string)=>{
  $router.push(`/hospital/register?code=${hoscode}`)
}


const handleSizeChange = () => {
  getHospitalData()
}
const handleCurrentChange = () => {
  getHospitalData()
}

</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#list-container {
  width: 100%;
  // background-color: yellow;
  margin-top: 60px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px 10px;

  .card-item {
    // padding: 0 10px 0 20px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      margin-top: -14px;
      flex-direction: column;
      justify-content: space-between;
      width: 318px;
      p{
        display: flex;
        width: 100%;
        justify-content: space-between;
        span {
          margin-top: 12px;
          margin-bottom: 4px;
          color: #999;
          font-size: 14px;
        }      }
      .name {
        display: block;
        height: 42px;
        display: flex;
        font-weight: 500;
        font-size: 16px;
        align-items: center;
        transition: all .2s ease;
        width: 100%;
      }
    }
    .right{
            img{
        margin-top: -10px;
        width: 80px;
        height:80px;
        border-radius: 50%;
      }
    }
  }
}
</style>