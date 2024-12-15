<template>
  <el-card style="max-width: 1080px">
    <template #header>
      <div class="card-header">
        <span>挂号详情</span>
      </div>
    </template>
    <!-- 展示body内容 的top结构-->
    <div class="top">
      <el-tag type="success" class="left">
        <svg
          t="1733983009937"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          style="margin-bottom: -3px"
          p-id="5601"
          width="19"
          height="19"
        >
          <path
            d="M892.064 261.888a31.936 31.936 0 0 0-45.216 1.472L421.664 717.248l-220.448-185.216a32 32 0 1 0-41.152 48.992l243.648 204.704a31.872 31.872 0 0 0 20.576 7.488 31.808 31.808 0 0 0 23.36-10.112L893.536 307.136a32 32 0 0 0-1.472-45.248z"
            p-id="5602"
            fill="#e6e6e6"
          ></path>
        </svg>
        {{ orderDetail.param?.orderStatusString }}</el-tag
      >
      <div class="right">
        <img src="../../../../assets/imge/code.png" alt="二维码" />
        <div class="word">
          <p>
            微信
            <svg
              t="1733982471873"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4307"
              width="20"
              height="20"
            >
              <path
                d="M664.250054 368.541681c10.015098 0 19.892049 0.732687 29.67281 1.795902-26.647917-122.810047-159.358451-214.077703-310.826188-214.077703-169.353083 0-308.085774 114.232694-308.085774 259.274068 0 83.708494 46.165436 152.460344 123.281791 205.78483l-30.80868 91.730191 107.688651-53.455469c38.558178 7.53665 69.459978 15.308661 107.924012 15.308661 9.66308 0 19.230993-0.470721 28.752858-1.225921-6.025227-20.36584-9.521864-41.723264-9.521864-63.862493C402.328693 476.632491 517.908058 368.541681 664.250054 368.541681zM498.62897 285.87389c23.200398 0 38.557154 15.120372 38.557154 38.061874 0 22.846334-15.356756 38.156018-38.557154 38.156018-23.107277 0-46.260603-15.309684-46.260603-38.156018C452.368366 300.994262 475.522716 285.87389 498.62897 285.87389zM283.016307 362.090758c-23.107277 0-46.402843-15.309684-46.402843-38.156018 0-22.941502 23.295566-38.061874 46.402843-38.061874 23.081695 0 38.46301 15.120372 38.46301 38.061874C321.479317 346.782098 306.098002 362.090758 283.016307 362.090758zM945.448458 606.151333c0-121.888048-123.258255-221.236753-261.683954-221.236753-146.57838 0-262.015505 99.348706-262.015505 221.236753 0 122.06508 115.437126 221.200938 262.015505 221.200938 30.66644 0 61.617359-7.609305 92.423993-15.262612l84.513836 45.786813-23.178909-76.17082C899.379213 735.776599 945.448458 674.90216 945.448458 606.151333zM598.803483 567.994292c-15.332197 0-30.807656-15.096836-30.807656-30.501688 0-15.190981 15.47546-30.477129 30.807656-30.477129 23.295566 0 38.558178 15.286148 38.558178 30.477129C637.361661 552.897456 622.099049 567.994292 598.803483 567.994292zM768.25071 567.994292c-15.213493 0-30.594809-15.096836-30.594809-30.501688 0-15.190981 15.381315-30.477129 30.594809-30.477129 23.107277 0 38.558178 15.286148 38.558178 30.477129C806.808888 552.897456 791.357987 567.994292 768.25071 567.994292z"
                fill="#209d28"
                p-id="4308"
              ></path>
            </svg>
            关注"北京114预约挂号"
          </p>
          <p>"快速预约挂号"</p>
        </div>
      </div>
    </div>
    <div class="body">
      <!-- 左边描述列表 -->
      <el-descriptions :column="1" size="default" border class="desc_list">
        <el-descriptions-item label="就诊人信息:">{{
          orderDetail.patientName
        }}</el-descriptions-item>
        <el-descriptions-item label="就诊日期:">{{
          orderDetail.reserveDate
        }}</el-descriptions-item>
        <el-descriptions-item label="就诊医院:">{{
          orderDetail.hosname
        }}</el-descriptions-item>
        <el-descriptions-item label="就诊科室:">{{
          orderDetail.depname
        }}</el-descriptions-item>
        <el-descriptions-item label="医生职称:">{{
          orderDetail.title
        }}</el-descriptions-item>
        <el-descriptions-item label="医事服务费:"
          ><span style="color: red">{{
            orderDetail.amount
          }}</span></el-descriptions-item
        >
        <el-descriptions-item label="挂号单号:">{{
          orderDetail.outTradeNo
        }}</el-descriptions-item>
        <el-descriptions-item label="挂号时间:">{{
          orderDetail.createTime
        }}</el-descriptions-item>
      </el-descriptions>
      <!-- 右边卡片 -->
      <el-card class="desc_card" shadow="never">
        <template #header>
          <div class="card-header" style="font-size: 16px">
            <span>注意事项</span>
          </div>
        </template>
        <p style="margin: 10px auto">
          1、请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担；
        </p>
        <p style="margin: 10px auto; color: red">
          2、【取号】就诊当天需在<span style="font-weight: 600">{{
            orderDetail.fetchTime
          }}</span
          >在医院取号，未取号视为爽约，该号不退不换；
        </p>
        <p style="margin: 10px auto">
          3、【退号】在{{ orderDetail.quitTime }}可在线退号
          ，逾期将不可办理退号退费；
        </p>
        <p style="margin: 10px auto">
          4、北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡
          在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号；
        </p>
        <p style="margin: 10px auto">
          5、请注意北京市医保患者在住院期间不能使用社保卡在门诊取号。
        </p>
        <!-- <template #footer>Footer content</template> -->
      </el-card>
    </div>
    <div
      style="margin-bottom: 10px; display: flex; flex-direction: row-reverse"
    >
      <el-button
        type="primary"
        v-if="orderDetail.orderStatus == 0"
        @click="toPayForBill"
        >支付</el-button
      >
      <el-popconfirm title="您确认要取消吗" @confirm="confirm">
        <template #reference>
          <el-button
            style="margin-right: 20px"
            v-if="orderDetail.orderStatus == 0 || orderDetail.orderStatus == 1"
            >取消预约</el-button
          >
        </template>
      </el-popconfirm>
    </div>
  </el-card>
  <!-- 微信支付对话框 -->
  <el-dialog
    v-model="centerDialogVisible"
    title="微信支付"
    width="400"
    align-center
    :append-to-body="true"
  >
    <div class="wexin_code">
      <img :src="weiXinCodedataURL" alt="支付维码" />
      <p>请使用微信扫一扫</p>
      <p>扫描二维码支付</p>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false"> 关闭窗口 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
console.log("orderDetail组件");
//订单三种状态，orderStatus 0：待支付 1：已支付 -1：已取消
import {
  getOrderDetail,
  toCancelOrder,
  getWeiXinCode,
  getPayStatus
} from "../../../../api/user";
import { ref, onMounted,watch,onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
let centerDialogVisible = ref(false);
import QRCode from "qrcode";
//获取
const $route = useRoute();
//订单详情
const orderDetail = ref({});
//获取订单详情数据
async function fetchOrderDetail() {
  //@ts-ignore
  const result = await getOrderDetail($route.query.orderId as number);
  // console.log("getOrderDetail-result", result);
  if (result.code == 200) {
    orderDetail.value = result.data;
  } else {
    //@ts-ignore
    ElMessage.error({
      //@ts-ignore
      message: result.message,
      type: "error",
    });
  }
}
onMounted(() => {
  fetchOrderDetail();
});
//取消订单方法
async function cancelOrder() {
  const result = await toCancelOrder($route.query.orderId as string);
  console.log("toCancelOrder-result", result);
  if (result.code == 200) {
    //@ts-ignore
    ElMessage.success({
      //@ts-ignore
      message: result.message,
      type: "success",
    });
    //重新获取挂号状态
    fetchOrderDetail();
  } else {
    //@ts-ignore
    ElMessage.error({
      //@ts-ignore
      message: result.message,
      type: "error",
    });
  }
}
//confirm确认取消挂号
function confirm() {
  cancelOrder();
}
//获取支付二维码dataURL
let weiXinCodedataURL=ref('')
//获取支付二维码方法
async function toGetWeiXinCode() {
  const result = await getWeiXinCode($route.query.orderId as string);
  console.log("getWeiXinCode", result);
  // 生成二维码
  QRCode.toDataURL(result.data.codeUrl)
  .then(url => {
    weiXinCodedataURL.value=url
    // console.log(url)
  })
  .catch(err => {
    console.error('生成二维码失败')
  })
}
//询问服务器是否支付成功
 function toCheckIsPay() {
const itmer = setInterval( async () => {
   const result = await getPayStatus($route.query.orderId as string);
  console.log("toCheckIsPay", result);
  if(result.data){
    // 支付成功,关闭对话框
    centerDialogVisible.value=false
    ElMessage.success('支付成功')
    fetchOrderDetail()
  }
}, 500);
return () => {
  clearInterval(itmer);
};
}
//长轮询监听清除器
let wxToCheckIsPayClear
//toPayForBill
function toPayForBill() {
  centerDialogVisible.value = true;
  toGetWeiXinCode();
  //询问服务器是否支付成功,并给长轮询监听清除器赋值
 wxToCheckIsPayClear= toCheckIsPay()
}
//监听centerDialogVisible，当为false是，清除轮询
watch(centerDialogVisible, (newValue) => {
  if (!newValue) {
   wxToCheckIsPayClear? wxToCheckIsPayClear() : null
  }
})
onUnmounted(() => {
  wxToCheckIsPayClear? wxToCheckIsPayClear() : null
})
</script>

<style scoped lang="scss">
:deep(.el-dialog__body) {
  border-top: 1px solid #7f7f7f;
  border-bottom: 1px solid #7f7f7f;
}
.card-header {
  font-size: 24px;
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  .left {
    height: 60%;
    font-size: 16px;
    background-color: #67c23a;
    color: white;
    padding: 16px 21px;
  }
  .right {
    margin-right: 10px;
    display: flex;
    align-items: center;
    img {
      width: 50px;
      aspect-ratio: 1 / 1;
    }
    .word {
      margin-left: 4px;
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
    }
  }
}
.body {
  display: flex;
  padding-top: 30px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  justify-content: space-between;
  .desc_list,
  .desc_card {
    width: 48%;
  }
}
.wexin_code {
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0 !important;
  margin: 0;
  img {
    width: 200px;
    aspect-ratio: 1 / 1;
  }
  p {
    padding: 0;
    margin: 5px 0;
  }
}
</style>