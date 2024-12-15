<template>
  <el-card style="max-width: 1080px" v-if="scene">
    <template #header>
      <div class="card-header">
        <div class="top">
        <p class="title">就诊人管理</p>
        <el-button type="success" style="margin-right: 20px;height:35px"
        @click="changeScene()"
        ><el-icon style="margin-right:5px"><User /></el-icon>添加就诊人</el-button>
      </div>
      </div>
    </template>
   <!-- 盒子 -->
   <div class="user">
   <Vistor 
  v-for="(item, index) in patientList"
          :key="index"
          :item="item"
          :index="index"
          class="user-item"
          @changescene="TochangeScene"
   >
   <template #default>
    <el-popover :visible="visibleMap[item.id]" placement="top" :width="160"  trigger="click">
    <div style="text-align: center; margin: 0">
      <p><el-icon style="margin-right:4px"><WarningFilled /></el-icon>您确认要删除吗?</p>
      <el-button size="small" text @click="visibleMap[item.id] = false">取消</el-button>
      <el-button size="small" type="primary" @click="toDeletePatientData(item.id)">
        确认
      </el-button>
    </div>
    <template #reference>
      <el-button type="danger" class="delete" @click="visibleMap[item.id] = !visibleMap[item.id]" >
    <el-icon>
      <DeleteFilled />
   </el-icon>
   </el-button>
    </template>
  </el-popover>
    </template>
   </Vistor>
   </div>
  </el-card>
  <!--添加或者修改信息-->
<el-card style="max-width: 1080px" v-else>
  <template #header>
      <div class="card-header" style="font-size:20px">
        增改就诊人信息
      </div>
    </template>
   <el-divider content-position="left">就诊人信息</el-divider>
   <el-form style="padding:0 130px;">
    <el-form-item label="用户姓名">
      <el-input v-model="userDatas.name" placeholder="请输入姓名"></el-input>
    </el-form-item>
    <el-form-item label="证件类型" style="width: 60%">
      <el-select  placeholder="请选择证件类型" v-model="userDatas.certificatesType">
        <el-option v-for="(item) in CertificatesType" 
        :key="item.id" :value="item.value" :label="item.name"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="证件号码">
      <el-input v-model="userDatas.certificatesNo" placeholder="请输入证件号码"></el-input>
    </el-form-item>
    <el-form-item label="用户性别">
      <el-radio-group v-model="userDatas.sex">
        <el-radio label="男" :value="1"></el-radio>
        <el-radio label="女" :value="0"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="出生日期" >
      <el-date-picker
      v-model="userDatas.birthdate"
      type="date"
      placeholder="选择日期"
      style="width: 200px"
      value-format="YYYY-MM-DD"
    ></el-date-picker>
    </el-form-item>
    <el-form-item label="手机号码">
      <el-input v-model="userDatas.phone" placeholder="请输入手机号码"></el-input>
    </el-form-item>
   </el-form>
   <!-- ------------------------------------------------------------- -->
<el-divider content-position="left">建档信息(完善后部分医院首次就诊不排队建档)</el-divider>
 <el-form style="padding:0 130px;">
   <el-form-item label="婚姻状况">
     <el-radio-group v-model="userDatas.isMarry">
        <el-radio label="已婚" :value="1"></el-radio>
        <el-radio label="未婚" :value="0"></el-radio>
      </el-radio-group>
   </el-form-item>
   <el-form-item label="自费/医保">
   <el-radio-group v-model="userDatas.isInsure">
        <el-radio label="自费" :value="1"></el-radio>
        <el-radio label="医保" :value="0"></el-radio>
      </el-radio-group>
   </el-form-item>
   <el-form-item  label="当前住址" style="width: 60%">
     <el-cascader :props="Cprops" v-model="userDatas.addressSelected" />
   </el-form-item>
   <el-form-item label="详细住址">
    <el-input v-model="userDatas.address" placeholder="请输入详细住址"></el-input>
   </el-form-item>
   </el-form>
   <!-- ------------------------------------------------------------- -->
   <el-divider content-position="left" style="margin-bottom: 30px">联系人信息(选填)</el-divider>
   <el-form style="padding:0 130px;">
    <el-form-item label="联系人姓名">
      <el-input v-model="userDatas.contactsName" placeholder="请输入联系人姓名"></el-input>
    </el-form-item>
    <el-form-item label="证件类型" style="width: 60%">
      <el-select  placeholder="请选择证件类型" v-model="userDatas.contactsCertificatesType">
        <el-option v-for="(item) in CertificatesType" 
        :key="item.id" :value="item.value" :label="item.name"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="证件号码">
      <el-input v-model="userDatas.contactsCertificatesNo" placeholder="请输入证件号码"></el-input>
    </el-form-item>
     <el-form-item label="手机号码">
      <el-input v-model="userDatas.contactsPhone" placeholder="请输入手机号码"></el-input>
    </el-form-item>
   </el-form>
   <el-form style="display: flex;justify-content: center;margin-top: 30px">
    <el-button @click="resetForm">重写</el-button>
    <el-button type="primary" @click="submitUserInfo">提交</el-button>
   </el-form>
</el-card>
</template>

<script setup lang="ts">
import { CascaderProps, ElMessage } from 'element-plus'
import {User,DeleteFilled,WarningFilled} from '@element-plus/icons-vue'
import Vistor from '../../../components/register/vistor.vue'
import {getUserInfo} from  '../../../api/hospital/index'
import{getCertificatesType,getAddressList,addOrUpdatePatient,deletePatientData} from '../../../api/user/index'
import { ref ,onMounted,reactive} from 'vue'
import { useRoute,useRouter } from 'vue-router'
import { el, tr } from 'element-plus/es/locale'
const $route = useRoute()
const $router = useRouter()
//scene,场景切换
let scene = ref(true)
//气泡可见状态列表
const visibleMap = reactive({});
//visible
const visible = ref(false)
//就诊人信息
let patientList = ref([])
async function fetchPatientList(){
  const  result= await getUserInfo();
  //@ts-ignore
  if(result.code==200){
    patientList.value=result.data
      // 初始化 visibleMap
    patientList.value.forEach(item => {
      visibleMap[item.id] = false;
    });
    console.log('visibleMap',visibleMap)
    console.log("patientList",patientList.value)
  }else{
    //@ts-ignore
    ElMessage.error(result.message)
  }
}


//form表单收集到的信息
const userDatas=ref({
  name:'',
  certificatesType:'',
  certificatesNo:'',
  sex:1,
  birthdate:'',
  phone:'',
  isMarry:1,
 isInsure:1,
 addressSelected:[],
 address:'',
 contactsName:'',
 contactsCertificatesType:'',
 contactsCertificatesNo:'',
 contactsPhone:'',
})

// 切换场景
function changeScene(){
  scene.value=false
}
function TochangeScene(data){
  console.log("userData",data)
  //收集已有的用户信息
  Object.assign(userDatas.value,data)
  scene.value=false
}
//
let CertificatesType=ref([])
onMounted(async ()=>{
  // 获取患者信息列表
 await fetchPatientList()
  //获取证件类型
 await fetchCertificatesType()
  //判断路由上type
  if($route.query.type==='add'){
    scene.value=false
  }
  if($route.query.type==='change'){
    scene.value=false
    // console.log("_patientList-filter",patientList.value.filter(item=>item.id===+$route.query.id)[0])
    userDatas.value= patientList.value.filter(item=>item.id===+$route.query.id)[0]
  }
})
//获取证件类型函数
async function fetchCertificatesType(){
  let result=await getCertificatesType()
  //@ts-ignore
 if(result.code==200){
   CertificatesType.value=result.data
   console.log('CertificatesType',CertificatesType.value)
 }else{
   console.log('获取证件类型失败')
 }
} //级联选择器的Cprops
const Cprops: CascaderProps = {
  lazy: true,
 async lazyLoad(node, resolve) {
   const result=await getAddressList(node.data.value as string ||'86')
   if(result.code==200){
     resolve(result.data.map((item)=>{
      return{
        value:item.value,
        label:item.name,
        leaf:!item.hasChildren
      }
     }))
   }else{
     ElMessage.error('获取地址信息失败')
      resolve()
   }
  },
}
//提交
async function submitUserInfo(){
  console.log(userDatas.value)
  try{
    await addOrUpdatePatient(userDatas.value)
     ElMessage.success('提交成功')
     //切换场景
     //判断是否有query参数,为add
     if($route.query.type==='add'||$route.query.type==='change'){
      $router.back()
      return
     }
     scene.value=true
    fetchPatientList()
  }catch(e){
    ElMessage.error('提交失败')
  }
}
//重写
const resetForm=()=>{
  userDatas.value={
     name:'',
  certificatesType:'',
  certificatesNo:'',
  sex:1,
  birthdate:'',
  phone:'',
  isMarry:1,
 isInsure:1,
 addressSelected:[],
 address:'',
 contactsName:'',
 contactsCertificatesType:'',
 contactsCertificatesNo:'',
 contactsPhone:'',
  }
  //滑动到顶部
 window.scrollTo({
  top:0,
  behavior:'smooth'
 })
}
//删除用户信息
async function toDeletePatientData(id){
  const result=await deletePatientData(id)
  //@ts-ignore
 if(result.code==200){
  ElMessage.success('删除成功')
  fetchPatientList()
 }
 else{
  ElMessage.error('删除失败')
 }
 visibleMap[id] = false
}
</script>

<style scoped lang="scss">
.top{
display: flex;
justify-content: space-between;
align-items: center;

.title{
  font-size: 20px;
  }
}
 .user {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    .user-item {
      margin: 10px 5px;
    }
  }
  .delete{
     display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      font-size: 18px;
      border-radius: 50%;
      aspect-ratio: 1 / 1;

  }

</style>