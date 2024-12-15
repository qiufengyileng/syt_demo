<template>
  <!-- 全部订单 -->

  <el-card style="max-width: 1280px">
    <template #header>
      <div class="card-header">
        <span>挂号订单</span>
      </div>
    </template>
    <el-form :inline="true">
      <el-form-item label="就诊人">
        <el-select
          v-model="patientId"
          placeholder="请选择就诊人"
          style="min-width: 380px"
           @change="selectChange"
        >
          <el-option
             v-for="(item, index) in patientList"
            :key="index"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select
          v-model="orderStatus"
          placeholder="请选择订单状态"
          style="min-width: 380px"
          @change="selectChange"
        >
          <el-option
            v-for="(item, index) in orderStatusList"
            :key="index"
            :label="item.comment"
            :value="item.status"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <!-- table，订单数据 -->
    <el-table :data="tableData">
      <el-table-column prop="reserveDate" label="就诊时间" />
      <el-table-column prop="hosname" label="医院" width="180"  show-overflow-tooltip/>
      <el-table-column prop="depname" label="科室" width="180" show-overflow-tooltip/>
      <el-table-column prop="title" label="医生" />
      <el-table-column prop="amount" label="医事服务费" />
      <el-table-column prop="patientName" label="就诊人"  show-overflow-tooltip/>
      <el-table-column prop="param.orderStatusString" label="订单状态" width="180" />
      <el-table-column  label="操作">
        <template #="{row}">
          <el-button type="text" @click="goDetail(row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[8,12,16,20]"
        :size="size"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="getOrderListData()"
        @current-change="getOrderListData()"
      />
    </template>
  </el-card>
</template>


<script setup lang="ts">
import { getOrderList,getPatientList,getOrderStatus } from "../../../../api/user";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import {useRouter} from "vue-router";
import { pa } from "element-plus/es/locale";
const $router = useRouter();
// 分页
let currentPage = ref(1);
let pageSize = ref(6);
let total = ref(100);

let patientId = ref("");
let orderStatus = ref("");

// 订单列表
const tableData = ref([]);
async function getOrderListData() {
  const result = await getOrderList(
    currentPage.value,
    pageSize.value,
    patientId.value,
    orderStatus.value
  );
  if (result.code == 200) {
    console.log("result", result);
    total.value = result.data.total;
   tableData.value=result.data.records
  }else{
    ElMessage.error("获取数据失败");
  }
}
getOrderListData();
//抢网详情页面
function goDetail(row:any){
  $router.push({
    path:'/user/order',
    query:{
      orderId:row.id
    }
  })

}
// 获取就诊人列表,和订单状态列表
let patientList = ref([]);
let orderStatusList = ref([]);
//获取当前账号所有就诊人列表
getPatientList().then((res) => {
  patientList.value=res.data.map((item:any) => {
    return {
      id: item.id,
      name: item.name,
    };
  })
  console.log("patientList", patientList.value);
}).catch((err)=>{
  ElMessage.error("获取就诊人列表失败")
})
// 获取订单状态列表
getOrderStatus().then((res) => {
  orderStatusList.value=res.data
  console.log("orderStatusList", orderStatusList.value);
}).catch((err)=>{
  ElMessage.error("获取订单状态失败")
})
//changeUser
function selectChange(){
  console.log("changeUser");
  getOrderListData()
}
</script>

<style scoped lang="scss">

</style>