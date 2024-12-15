<template>
  <div id="choose">
    <div class="title" >医院</div>
    <div class="level"  ref="_level">
      <p id="level-subtitle">等级:</p>
    <div>
        <span v-for="(item,index) in level" :key="index"  @click="sendMessAndAddStyle($event,item,'level')">{{ item.name }} </span>
      </div>
    </div>
    <div class="district"  ref="_district">
      <p id="district-subtitle">地区:</p>
      <div>
        <span v-for="(item,index) in district" :key="index" @click="sendMessAndAddStyle($event,item,'district')">{{ item.name }}</span>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref,defineEmits,onMounted } from "vue"
import {getHospitalLevelAndRegion} from '../../api/home/index'
import type {HospitalLevelAndRegion} from '../../api/hospital/type'
//发送父组件
const emit:any = defineEmits(['searchByLevelAndDistrict'])

const _level=ref(null)
const _district=ref(null)
const district =ref([])
const level=ref([])

//点击事件添加样式
function addStyle(e,name){
    const element= name==='district'?  _district.value: _level.value
    element.querySelector('.active')?.classList.remove('active') 
    e.target.classList.add('active')
}
// @click="sendMess()",发送通知
function sendMessAndAddStyle(e,data:object,type:string){
  addStyle(e,type)
  // console.log('type',type)
  emit('searchByLevelAndDistrict',data,type)
}
//getLevel
async function getLevel(){
  const result:HospitalLevelAndRegion= await getHospitalLevelAndRegion('HosType')
  level.value=result.data
  // console.log('level',result) 
}
//getDistrict
async function getDistrict(){
  const result:HospitalLevelAndRegion= await getHospitalLevelAndRegion('Beijin')
  district.value=result.data
  // console.log('district',result) 
}
//onMounted
onMounted( ()=>{
  getLevel()
  getDistrict()
})

</script>

<style scoped lang="scss">
*{
  margin: 0;padding: 0;box-sizing: border-box;
}
#choose{
  color:#7f7f7f ;
  display: flex;
  flex-direction: column;
  div{
    margin-top:5px ;
  }
  .title{
    font-size: 19px;
    font-weight: 900;
  }
  }
  .level,.district{
    display: flex;
    #level-subtitle,#district-subtitle{
      width: 60px;
      // background-color: green;
      height: 30px;
      margin-top:10px ;
    }
    div {
      max-width: 86%;
      display: flex;
      flex-wrap: wrap;
       span{
        cursor: pointer;
        margin: 7px 12px;
        &:hover{
          color: #409eff;
        }
       }
      }
  }
  .active{
    color: #409eff!important;
    font-weight: 700!important;
  }
</style>