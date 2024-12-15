<template>
  <div id="search">
   <el-autocomplete
    v-model="state"
    :trigger-on-focus="false"
    :fetch-suggestions="querySearchAsync"
    placeholder="请输入医院名称"
    @select="handleSelect"
  />
  <el-button type="primary">
    <el-icon><Search /></el-icon>搜索</el-button>
</div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import {Search} from '@element-plus/icons-vue'
import {getHospitalDetailByName} from '../../api/home/index.ts'
import {HospitalInfo,Contnet} from '../../api/home/type.ts'

//定义路由
const $router=useRouter()

//收集搜索数据
const state = ref('')
//获取数据
async function querySearchAsync(keyword:string,callback:any){
  const result:HospitalInfo= await getHospitalDetailByName(keyword)
  console.log('result',result)
  //得到数据数组
const dataArr:[]=result.data.map(item=>{
  return{
    value:item.hosname,
    hoscode:item.hoscode
  }
})
console.log('dataArr',dataArr)
  callback(dataArr)

}
//handleSelect 选中事件
function handleSelect(item:any){
  // console.log('item',item)
  // 路由跳转
$router.push(`/hospital/register?code=${item.hoscode}`)
}

</script>

<style scoped lang="scss">
#search{ 
  scale: 1.2;
  margin: 0 auto;
  margin-top: 40px;
  width: 800px;
  display: flex;
  justify-content: center;

}
</style>