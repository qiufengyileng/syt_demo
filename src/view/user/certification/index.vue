<template>
  <el-card style="max-width: 960px">
    <template #header>
      <div class="card-header">
        <span class="title">实名信息</span>
      </div>
      <h3 class="tip">
        <el-icon style="margin-right: 5px"><Warning /></el-icon>
        完成实名认证后才能添加就诊人,正常进行挂号,为了不影响后续操作,建议提前进行实名认证
      </h3>
      <!-- 认证成功,认证列表 -->
      <el-descriptions
        :column="1"
        size="large"
        border
        label-width="150px"
        style="margin-bottom: 40px; min-height: 200px"
        v-if="userInfo.authStatus"
      >
        <el-descriptions-item label="用户姓名">{{
          userInfo.name
        }}</el-descriptions-item>
        <el-descriptions-item label="证件类型">{{
          userInfo.certificatesType
        }}</el-descriptions-item>
        <el-descriptions-item label="证件号码">{{
          userInfo.certificatesNo
        }}</el-descriptions-item>
      </el-descriptions>
      <!-- 未认证 -->
      <el-form
        style="width: 60%; margin: 20px auto"
        :model="Usersparams"
        :rules="rules"
        v-else
        ref="form"
      >
        <el-form-item label="用户姓名:" prop="userName">
          <el-input
            v-model="Usersparams.userName"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="证件类型:" prop="certificatesType">
          <el-select
            placeholder="请选择证件类型"
            v-model="Usersparams.certificatesType"
          >
            <el-option label="身份证" value="身份证"></el-option>
            <el-option label="户口本" value="户口本"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码:" prop="certificateNamber">
          <el-input
            v-model="Usersparams.certificateNamber"
            placeholder="请输入证件号码"
          ></el-input>
        </el-form-item>
        <!-- 照片 -->
        <el-form-item label="上传证件:" prop="certificatesUrl">
          <el-upload
            action="http://syt.atguigu.cn/api/oss/file/fileUpload?fileHost=userAuah"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            limit="1"
            ref="upload"
            :on-remove="removeUpload"
            :on-success="Onsuccess"
            :on-error="
              function () {
                ElMessage.error('上传失败');
              }
            "
            :on-exceed="
              function () {
                ElMessage.error('上传数量超过限制');
              }
            "
          >
            <img
              src="../../../assets/imge/user.png"
              style="width: 147px; height: 147px; object-fit: cover"
            />
          </el-upload>

          <el-dialog>
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
          </el-dialog>
        </el-form-item>
        <el-form-item style="margin-left: 71px">
          <el-button type="primary" @click="submitUserInfo">提交</el-button>
          <el-button @click="removeAll">清除重写</el-button>
        </el-form-item>
      </el-form>
    </template>
  </el-card>
  <!-- 图片预览 -->
  <el-dialog
    v-model="pictureShow"
    width="600"
    align-center
    append-to-body="true"
  >
    <img
      :src="dialogImageUrl"
      alt="预览图片"
      w-full
      style="width: 100%; height: 100%"
    />
    <template #footer> </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { Warning } from "@element-plus/icons-vue";
import { getUserInfo,userCreation } from "../../../api/user/index";
import { ref } from "vue";
import { ElMessage } from "element-plus";
//实名成功，信息
let userInfo = ref({});
//图片预览
let pictureShow = ref(false);
//
let upload = ref();
let form = ref();
// 获取用户信息方法
async function fetchUserInfo() {
  const result = await getUserInfo();
  if (result.code == 200) {
    userInfo.value = result.data;
    console.log("userInfo", userInfo.value);
  } else {
    ElMessage.error(result.message);
  }
}
fetchUserInfo();
////进行实名认证收集的信息
let Usersparams = ref({
  userName: "",
  certificatesType: "",
  certificateNamber: "",
  certificatesUrl: "",
});
//上传收集到的信息
async function submitUserInfo() {
 await form.value.validate()
 try {
   const result=await userCreation(Usersparams.value)
   console.log(result)
   if(result.code==200){
     ElMessage.success('提交成功')
     // 刷新用户信息
     fetchUserInfo()
   }else{
     ElMessage.error(result.message)
   }
 } catch (error) {
   ElMessage.error('提交失败')
 }

}
//handlePictureCardPreview,图片预览
// 图片路径资源
let dialogImageUrl = ref("");
function handlePictureCardPreview(file) {
  console.log("handlePictureCardPreview", file);
  pictureShow.value = true;
  dialogImageUrl.value = file.url;
}
//oNsuccess
async function Onsuccess(res) {
  Usersparams.value.certificatesUrl = await res.data;
  ElMessage.success("上传成功");
  // console.log(Usersparams)
}
//removeUpload
function removeUpload() {
  Usersparams.value.certificatesUrl = "";
}
//removeAll
function removeAll() {
  Usersparams.value = {
    userName: "",
    certificatesType: "",
    certificateNamber: "",
    certificatesUrl: "",
  };
  upload.value.clearFiles();
}
//
//vaildatorUserNmae
function validatorUserNmae(rules,value, callback:any) {
  //验证中文姓名
  let reg = /^[\u4E00-\u9FA5]{2,10}(·[\u4E00-\u9FA5]{2,10}){0,2}$/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("请输入正确的姓名"));
  }
}
function validatorCertificatesType(rules,value, callback:any) {
  //验证证件类型
  let reg = /^(身份证|户口本)$/;
  if (reg.test(value)) {
    callback();
  } else {
    callback(new Error("请输入正确的证件类型"));
  }
}
function validatorCertificateNamber(rules,value, callback:any) {
  //验证证件号码
  //户口
   var hukoureg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
   //身份证
   var idcardreg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
  if(hukoureg.test(value)||idcardreg.test(value)){
    callback();
  }else{
    callback(new Error("请输入正确的证件号码"));
  }
}
function validatorCertificatesUrl(rules,value, callback:any) {
  //验证上传证件
  if (value) {
    callback();
  } else {
    callback(new Error("请上传证件图片"));
  }
}
const rules = {
  userName: [{ required: true, validator: validatorUserNmae }],
  certificatesType: [
    { required: true,validator: validatorCertificatesType  },
  ],
  certificateNamber: [
   { required: true,validator: validatorCertificateNamber  },
  ],
  certificatesUrl: [{ required: true, validator:validatorCertificatesUrl }],
};
</script>

<style scoped lang="scss">
:deep(.el-card__body) {
  display: none;
}
.card-header {
  border-bottom: 1px solid #ebeef5;
  height: 40px;
  line-height: 40px;
}
.title {
  font-size: 21px;

  font-family: "宋体";
}
.tip {
  color: #999;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0;
  font-weight: normal;
  letter-spacing: 0.5px;
}
// :deep(.el-form-item__label){
//   &::before{
//     content: "*";
//     color: #ff0000;
//     margin-right: 2px;
//     margin-top: -2px;
//   }
// }
</style>