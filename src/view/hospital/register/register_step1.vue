<template>
 <div class="wrap">
  <div class="top">
    <div class="line">
      <span id="hname">{{hospitalAllWork.baseMap?.hosname}}</span>
      <span id="dname">{{hospitalAllWork.baseMap?.bigname}}</span>
      <span>{{hospitalAllWork.baseMap?.depname}}</span>
    </div>
  </div>
  <!-- 中心盒子 -->
  <div class="center">
    <h4>{{hospitalAllWork.baseMap?.workDateString}}</h4>
    <div class="container">
      <div 
      :class="{'container-item':true,'have':item.status!==-1&&item.status!==1&&item.availableNumber!==0}"
       v-for="(item,index)  in hospitalAllWork.bookingScheduleList"
        :key='index' @click="showDoctorDetail(item.workDate,item.status)">
        <div>{{item.workDate}}-{{item.dayOfWeek}}</div>
        <div v-if="item.status==1">即将放号</div>
        <div v-else>{{item.status===-1 ? '停止挂号':item.availableNumber===0? '约满':`有号(${item.availableNumber})`}}</div>
      </div>
      <!-- 分页 -->
    </div>
     <el-pagination
    v-model:current-page="currentPage"
    size="middle"
    background
    layout="prev, pager, next"
    :total="dataTotal"
    class="mt-4" 
      @current-change="handleCurrentChange"
    style="margin-top: 70px;margin-left: -200px;"
  />
  </div>
  <!-- 号源 -->
  <div class='bottom'>
    <!-- 即将放号 -->
      <h3  id='immediately' v-if="immediately"><span class="highlight">等待</span> 放号</h3>
    <!-- 有号 -->
    <div v-else>
     <div id='morning'>
      <p><el-icon style="margin-right:3px;color: skyblue;"><Sunny /></el-icon >上午号源</p>
      <ul class='morning-container'>
        <li v-for="(item,index) in doctorDatas_morning" :key="index" class="container-item">
          <div class="box">
          <div class="item-left">
              <div class="dname"><span>{{item.docname}}</span><span>{{item.title}}</span></div>
              <p style="font-size:15px">{{item.skill}}</p>
          </div>
          <div class="item-right">
            <div class="price">￥{{item.amount}}</div>
             <el-button type="primary" class="num" @click="goStep2(item)">剩余{{item.availableNumber}}张</el-button>
          </div>
          </div>
            <hr>
        </li>
      </ul>
     </div>
  <div id='afternoon'>
    <p><el-icon style="margin-right:3px;color: skyblue;"><Sunrise /></el-icon>下午号源</p>
    <ul class='afternoon-container'>
      <li v-for="(item,index) in doctorDatas_afternoon" :key="index" class="container-item">
          <div class="box">
          <div class="item-left">
              <div class="dname"><span>{{item.docname}}</span><span>{{item.title}}</span></div>
              <p style="font-size:15px">{{item.skill}}</p>
          </div>
          <div class="item-right">
            <div class="price">￥{{item.amount}}</div>
             <el-button type="primary" class="num"  @click="goStep2(item)">剩余{{item.availableNumber}}张</el-button>
          </div>
          </div>
            <hr>
        </li>
    </ul>
  </div>
  </div>
  </div>
 </div>
</template>

<script setup lang="ts">
import{getHospitalAllWork,getHospitalDoctor} from '../../../api/hospital/index'
import { ref,onMounted } from 'vue'
import {useRoute,useRouter} from 'vue-router'
import {Sunny,Sunrise} from '@element-plus/icons-vue'
const $route=useRoute()
const $router=useRouter()
//纯储科室的挂号数据
const hospitalAllWork=ref<any>({})
//dataTotal
let dataTotal=ref(0)
//当前页面
 let currentPage=ref(1)
 //医生排班信息morning
 let doctorDatas_morning=ref([])
 //医生排班信息afternoon
 let doctorDatas_afternoon=ref([])
 //放号
 let immediately=ref(false)
 //点击分页handleCurrentChange
 const handleCurrentChange=(val)=>{
  fetchHospitalAllkDatas()
 }
//获取挂号列表信息
const fetchHospitalAllkDatas=async()=>{
  const result=await getHospitalAllWork(currentPage.value,6,$route.query.hoscode as string,$route.query.depcode as string)
  hospitalAllWork.value=result.data
  //dataTotal
  dataTotal.value=result.data.total
  console.log('dataTotal',result.data)
  console.log('hospitalAllWork',hospitalAllWork.value)
}
//获取医生排班信息
async function getDoctor(workDate,Tstatus){
  // console.log('item',workDate)
  //Tstatus==1,表明今天要放号还没放
 if(Tstatus===1){
  //放号页面展示
    immediately.value=true
    return
 }
 //放号页面不展示
 immediately.value=false
 let result=await getHospitalDoctor($route.query.hoscode as string,$route.query.depcode as string,workDate)
 //@ts-ignore
 result.data.forEach(item => {
  if(item.workTime){
    //上午
    doctorDatas_morning.value.push(item)
  }else
    //下午
    doctorDatas_afternoon.value.push(item)

 });
 console.log('doctorDatas_morning',doctorDatas_morning.value,'doctorDatas_afternoon',doctorDatas_afternoon.value)
}
onMounted(()=>{
  fetchHospitalAllkDatas().then(()=>{
    //第一条的日期
    let workDate=hospitalAllWork.value.bookingScheduleList[0].workDate
    let Statue=hospitalAllWork.value.bookingScheduleList[0].status
    // console.log('_hospitalAllWork',hospitalAllWork.value.bookingScheduleList[0].workDate)
    getDoctor(workDate,Statue).catch(err=>{
      console.log('err',err)
    })
  })
})
//showDoctorDetail
function showDoctorDetail(workDate,status){
  getDoctor(workDate,status)
}
//goStep2(),要医生的编号信息
function goStep2(doc){
// console.log('doc',doc)
$router.push({path:"/hospital/register_step2",query:{hoscode:$route.query.code||$route.query.hoscode,docId:doc.id}})
}
</script>

<style scoped lang="scss">
.have{
  background-color:rgb(62 191 245 / 72%) !important;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
}
.wrap{
  .top{
    .line{
      font-size: 17px;
      color:#666;
     #hname::after{
      content: '|';
      font-size: 15px;
      display: inline-block;
      margin: 0 6px;
     }
     #dname::after{
      content: '.';
      font-size: 15px;
      line-height: 15px;
      margin: 0 10px;
     }
    }
  }
  .center{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 70px;
    h4{
      color: #666;
      font-size: 20px;
      margin-bottom: 40px;
    }
    .container{
      width: 100%;
      display: grid;
      grid-template-columns: repeat(6,1fr);
      .container-item{
        cursor: pointer;
        width:80%;
        height:90px;
        border-radius: 3px;
        display: flex;
        flex-direction: column;
        align-items: center;
         font-size: 17px;
          color: #3a3838a6;
        background-color: #66666654;
        & :nth-child(1){
          height: 40%;
          line-height: 2;
          font-weight: 600;
        }
        & :nth-child(2){
          height: 56%;
          width: 98%;
          font-weight: 550;
          text-align: center;
          line-height: 2.5;//?????
          border-radius: 5px;
          background-color: #fff;
        }
        &:hover{
          border: 1.5px solid #8e8d8dd9;
        }
      }
    }
  }
  .highlight{
   color: #0ab3f8;
  }
  .bottom{
    margin-top: 40px;
    font-size: 17px;
    font-weight: 550;
    color: #666;
    #immediately{
      text-align: center;
      margin-left: -200px;
    }
    #morning,#afternoon{
      .morning-container,.afternoon-container{
        .container-item{
          margin:30px 15px;
          .box{
             display: flex;
        justify-content: space-between;
         
          .item-left{
            font-weight: 545;
            color: #666;
            .dname{
            color: skyblue;
            margin-bottom: 8px;
          & :nth-child(1){
           &::after{
            content: '|';
            margin: 0 11px;
           }
          }
        }
          }
          .item-right{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .price{
              font-size: 14px;
              margin-right: 50px;
              font-weight: normal;
            }
            .num{
              margin-right: 35px;
               font-weight: normal;
              color: #fff;
              font-size: 14px;
              height: 75%;
              width: 80px;
              border-radius: 4px;
              background-color:#0ab3f8;
            }
          }
        }
          hr{
            margin-top: 8px;
          }
       }
      }
    }
  }
}
</style>