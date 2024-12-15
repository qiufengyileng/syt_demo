<template>
  <div class="title-wrapper">
    <span class="title">{{hospitalDetail.hosname}}</span>
    <span class="level-title">
      <el-icon style="margin-right: 5px;margin-left:5px"><Histogram /></el-icon>
      {{hosptial_hostypeString}}
    </span>
  </div>
  <div class="detail-wrapper">
 <img :src="'data:image/jpeg;base64,'+hospitalDetail.logoData" />
 <div class="content-wrapper">
  <div>
    <p class="title">挂号规则</p>
    <p>
      <span class='line'>
        <span class="que">预约周期:</span><span class="aws">{{bookingRule.cycle}}天</span>
      </span>
      <span class="line">
        <span class="que">放号时间:</span><span class="aws">{{bookingRule.releaseTime}}</span>
      </span>
      <span class="line">
         <span class="que">停挂时间:</span><span class="aws">{{bookingRule.stopTime}}</span>
      </span>
      </p>
      <p>
         <span class="que">退号时间:</span><span class="aws">{{`就诊前${-(+bookingRule?.quitDay||'0')}工作日${bookingRule.quitTime}前取消`}}</span>
      </p>
  </div>
  <div>
    <p class="title">医院预约规则</p>
    <!-- <p class="que">1. 西院区预约号取号地点西院区门诊楼一层大厅挂号窗口取号</p> -->
    <p v-for="(rule,index) in bookingRule.rule" :key="index" class="que">{{index+1}}.{{rule}}</p>
  </div>
 </div>
  </div>
  <!-- 科室详情 -->
   <h3 style="margin: 20px 0; position: sticky;
    top: 80px;">科室详情</h3>
  <div class="department-wrapper" >
    <div class="left">
      <ul>
        <li v-for="(item,index) in deptNames" :key="index" @click="scrollTo($event,index)" :class="{'active':index===active}">{{item}}</li>
      </ul>
    </div>
    <div class="right">
      <div class="part" :data-index="index" v-for="(item,index) in deptList" :key="index">
        <div class="title"><span class="icon"></span>{{deptNames[index]}}</div>
        <div class="container">
          <div class="container-item" v-for="(item,index)  in item" :key="index" @click="toRegisterItem(item)">{{item.depname}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {} from '../../../api/hospital/index'
import {useRoute,useRouter} from 'vue-router'
import {ref} from 'vue'
import {getHospitalDetailByHoscode,getHospitalDepartment} from '../../../api/hospital/index'
const $router=useRouter()
//得到query对象
const query = useRoute().query
//得到的HospitalDetail数据
const hospitalDetail=ref({})
//得到的bookingRules数据
const bookingRule=ref('')
//得到DepartmentData的数据
 const DepartmentData=ref([])
//vue3初始化数据结构，避免嵌套访问时的报错。
const hosptial_hostypeString=ref('')
//得到总医院科室数
 const deptNames=ref([])
 //得到医院个科室数据
 const deptList=ref([])
 //active 状态
 const active=ref(0)
// 获取医院详情
async function getHospitalDetail(hoscode:string){
 const result=await  getHospitalDetailByHoscode(hoscode)
 hospitalDetail.value=result.data.hospital
 bookingRule.value=result.data.bookingRule
 hosptial_hostypeString.value=result.data.hospital.param.hostypeString
  // console.log('result',result,hospitalDetail.value,bookingRule.value)

}
//获得科室detail
async function getHospitalDepartmentData(hoscode:string){
 const result=await  getHospitalDepartment(hoscode)
 await result.data.forEach((item,index)=>{
  deptNames.value.push(item.depname)
  deptList.value.push(item.children)
 }) 
//  console.log('Department',deptNames.value,deptList.value)
}
//scrollTo
function scrollTo(e,index:string){
  const el=document.querySelector(`[data-index="${index}"]`)
  let len=el.getBoundingClientRect().top-100
 window.scrollBy({
  top: len,
  behavior: 'smooth'
});
active.value=+index
}
//getHospitalDepartmentData
getHospitalDepartmentData(query.code as string)
getHospitalDetail(query.code as string)

//toRegisterItem,点击具体科室，前往科室挂号页面
function toRegisterItem(item){
  $router.push({
    path: '/hospital/register_step1',
    query:{
      hoscode:query.code,
      depcode:item.depcode
    }
  })
  // console.log('item.depcode',item.depcode)
}


</script>

<style scoped lang="scss">
::-webkit-scrollbar {
    width: 13px;
    background-color: #fff;
}
::-webkit-scrollbar-thumb{
  width: 13px;
  height: 3px;
  background-color:#eeebeb21;
  border-radius: 6px;
}

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
}
.que{
    color:#999;
  }
  // 激活样式,科室查询
.active{
  background-color: #fff;
  font-weight: 700!important;
}
//激活样式,科室详情
.active-detail{
  background-color: #fafafa;
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
.detail-wrapper{
  display: flex;
  margin-top: 50px;
  div{
    margin-bottom: 30px;
  }
  img{
    --len:90px;
    width: var(--len);
    height: var(--len);
    border-radius: 50%;
  }
  .content-wrapper{
    max-width: 60%;
    margin-left: 35px;
    p{
      font-size: 14px;
      margin-top: 8px;
      .line{
       margin-right: 50px;
      }
      &.title{
        font-size: 17px;
      }
      .aws{
        margin-left: 5px;
      }
    }
  }
}
.department-wrapper{
  display: flex;
  .left{
    position: sticky;
    top: 130px;
    background-color: #f4f9ff;
    width: 17%;
     max-height: 550px;
    text-align: center;
    padding: 10px 0;
    overflow-y: scroll;
    ul{
      li{
      font-size: 17px;
      font-weight: 500;
      margin: 0 auto;
      padding: 12px;
      min-height: 40px;
      cursor: pointer;
      &:hover{
        background-color: #fff;
      }
      }
    }
  }
  .right{
    width: 100%;
    display: flex;
    margin-left: 40px;
    padding: -30px 0 20px 30px;
    border-radius: 4px;
    flex-direction: column;
    .part{
       display: inherit;
    flex-direction: inherit;
    margin-top: 30px;
    .title{
      display: flex;
      align-items: center;
      letter-spacing: 1px;
      font-weight: 700;
      margin-bottom: 10px;
      .icon{
        display: inline-block;
        width: 5px;
        height: 16px;
        margin-right: 6px;
        border-radius: 2.5px;
        background-color: skyblue;
      }
      
    }
    .container{
      display: grid;
      grid-template-columns: repeat(3,1fr);
      margin-bottom: 20px;
      }
      .container-item{
        color: #666;
        margin-top: 10px;
        cursor: pointer;
        &:hover{
          color: skyblue;
}
      }
    }
  }
}
</style>