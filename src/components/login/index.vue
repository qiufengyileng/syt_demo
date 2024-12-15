<template>
  <div class="login-container">
    <el-dialog v-model="userStore.visible" title="用户登入" width="900" align-center>
      <div class="body">
        <div class="left">
          <div class="logint">
            <!-- 手机登录表单 -->
            <el-form v-if="!scene">
              <el-form-item>
                <el-input placeholder="请输入手机号:" :prefix-icon="User" 
                :class="phoneFormat? 'custom-suffix-icon-success':'custom-suffix-icon-fail'"
                  :suffix-icon="phone? phoneFormat? CircleCheck:CircleClose:''" v-model.trim="phone"></el-input>
                <el-input placeholder="请输入验证码:" :prefix-icon="Lock" 
               :class="captchaFormat? 'custom-suffix-icon-success':'custom-suffix-icon-fail'"
                  :suffix-icon="captcha? captchaFormat?CircleCheck:CircleClose:''" v-model.trim="captcha"></el-input>
                <el-button size="lager" @click="getCodeFun" :disabled="!phoneFormat||captchaCanUse">{{ captchaCanUse ?
                  `${time}s后重新获取`:'获取验证码' }}</el-button>
              </el-form-item>
              <div class="bottom">
                <el-button type="primary" style="width: 95%;" :disabled="!(phoneFormat&&captchaFormat)" @click="userLogin">用户登入</el-button>
                <p style="cursor: pointer;" @click="toggleLogin">微信扫码登入</p>
                <svg t="1733726932202" class="icon" viewBox="0 0 1024 1024" version="1.1" style="cursor: pointer;"
                  @click="toggleLogin" xmlns="http://www.w3.org/2000/svg" p-id="1575" width="32" height="32">
                  <path
                    d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                    fill="#28C445" p-id="1576"></path>
                  <path
                    d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                    fill="#28C445" p-id="1577"></path>
                </svg>
              </div>
            </el-form>
            <!-- 微信登录表单 -->
            <el-form v-else class="weichat">
              <!-- 二维码展示容器 -->
              <div id="login_container">
              </div>
              <!--  手机图标 -->
              <div class="svg" @click="toggleLogin">
                <svg t="1733730652908" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="5452" width="40" height="40">
                  <path
                    d="M752.941176 0H271.058824C237.748706 0 210.823529 28.611765 210.823529 63.969882v896.060236C210.823529 995.388235 237.748706 1024 271.058824 1024h481.882352c33.249882 0 60.235294-28.672 60.235295-63.969882V63.969882C813.176471 28.611765 786.191059 0 752.941176 0zM512 963.764706a60.235294 60.235294 0 1 1 0-120.470588 60.235294 60.235294 0 0 1 0 120.470588z m240.941176-180.705882H271.058824V120.470588h481.882352v662.588236z"
                    fill="#d81e06" p-id="5453"></path>
                </svg>
              </div>
              <p>使用手机号码登录</p>
            </el-form>
          </div>
        </div>
        <div class="right">
          <div class="_body">
            <div class="top">
              <div class="_left">
                <img src="../../assets/imge/wexing_login.png" alt="">
                <svg t="1733728618038" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="2091" width="16" height="16">
                  <path
                    d="M615.904 388.48c8.8 0 17.536 0.64 26.176 1.6-23.52-109.536-140.608-190.912-274.272-190.912C218.4 199.2 96 301.056 96 430.4c0 74.656 40.736 135.936 108.768 183.488l-27.2 81.792 95.04-47.648c33.984 6.72 61.28 13.632 95.2 13.632 8.544 0 16.992-0.416 25.376-1.088a202.496 202.496 0 0 1-8.384-56.96c0-118.752 101.984-215.136 231.104-215.136zM469.76 314.784c20.48 0 34.016 13.472 34.016 33.92 0 20.352-13.536 34.016-34.016 34.016-20.384 0-40.832-13.664-40.832-34.016 0-20.448 20.448-33.92 40.832-33.92zM279.52 382.72c-20.384 0-40.928-13.664-40.928-34.016 0-20.448 20.544-33.92 40.928-33.92 20.352 0 33.92 13.472 33.92 33.92 0 20.384-13.568 34.016-33.92 34.016z"
                    fill="" p-id="2092"></path>
                  <path
                    d="M864 600.352c0-108.672-108.736-197.28-230.88-197.28-129.344 0-231.2 88.576-231.2 197.28 0 108.864 101.856 197.248 231.2 197.248 27.072 0 54.368-6.816 81.568-13.632l74.56 40.8-20.448-67.904C823.328 715.936 864 661.664 864 600.352z m-305.856-34.016c-13.536 0-27.2-13.44-27.2-27.2 0-13.568 13.664-27.2 27.2-27.2 20.576 0 34.016 13.632 34.016 27.2 0 13.76-13.44 27.2-34.016 27.2z m149.536 0c-13.44 0-27.008-13.44-27.008-27.2 0-13.568 13.568-27.2 27.008-27.2 20.352 0 34.016 13.632 34.016 27.2 0 13.76-13.664 27.2-34.016 27.2z"
                    fill="" p-id="2093"></path>
                </svg>
                <p>微信扫一扫关注</p>
                <p>"快速预约挂号"</p>
              </div>
              <div class="_right">
                <img src="../../assets/imge/app_code.png" alt="">
                <svg t="1733728842517" class="icon" viewBox="0 0 1024 1024" version="1.1"
                  xmlns="http://www.w3.org/2000/svg" p-id="3393" width="16" height="16">
                  <path
                    d="M820.409449 797.228346q0 25.19685-10.07874 46.866142t-27.716535 38.299213-41.322835 26.204724-50.897638 9.574803l-357.795276 0q-27.212598 0-50.897638-9.574803t-41.322835-26.204724-27.716535-38.299213-10.07874-46.866142l0-675.275591q0-25.19685 10.07874-47.370079t27.716535-38.80315 41.322835-26.204724 50.897638-9.574803l357.795276 0q27.212598 0 50.897638 9.574803t41.322835 26.204724 27.716535 38.80315 10.07874 47.370079l0 675.275591zM738.771654 170.330709l-455.559055 0 0 577.511811 455.559055 0 0-577.511811zM510.992126 776.062992q-21.165354 0-36.787402 15.11811t-15.622047 37.291339q0 21.165354 15.622047 36.787402t36.787402 15.622047q22.173228 0 37.291339-15.622047t15.11811-36.787402q0-22.173228-15.11811-37.291339t-37.291339-15.11811zM591.622047 84.661417q0-8.062992-5.03937-12.598425t-11.086614-4.535433l-128 0q-5.03937 0-10.582677 4.535433t-5.543307 12.598425 5.03937 12.598425 11.086614 4.535433l128 0q6.047244 0 11.086614-4.535433t5.03937-12.598425z"
                    p-id="3394"></path>
                </svg>
                <p>扫一扫下载</p>
                <p>"预约挂号APP"</p>
              </div>
            </div>
            <div class="bottom">
              <h3>xxxxx官方指定平台</h3>
              <h3>快速挂号 安全放心</h3>
              <h3></h3>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="userStore.visible = false">关闭窗口</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import {getWeixinLoginData} from '../../api/hospital/index'
import { useUserStore } from '../../store/user'
import { User, Lock, CircleCheck, CircleClose } from '@element-plus/icons-vue'
import { getCode } from '../../api/hospital/index'
import { ref, watch,nextTick,onUnmounted } from 'vue'
import { useRouter,useRoute } from 'vue-router'
const $router = useRouter()
const $route = useRoute()
let userStore = useUserStore()
//scene，控制手机登录和微信登入，false是手机，true是微信
let scene = ref(false)
//手机号码
let phone = ref('')
//验证码
let captcha = ref('')
//验证码是否可禁用
let captchaCanUse = ref(false)
//判断手机格式，验证码是否正确
let phoneFormat = ref(false)
let captchaFormat = ref(false)

//toggleLogin
async function toggleLogin() {
  scene.value = !scene.value
  //等待视图跟新, 再创建实例
  // await nextTick();
  //重定向地址
  let redirect_URL=encodeURIComponent(window.location.origin+'/wxlogin')
  //发送请求获取二维码需要的参数
 const result = await getWeixinLoginData(redirect_URL)
 console.log(result)
  //生成二维码

   //微信实例对象
//@ts-ignore
 new WxLogin({
 self_redirect:true,
 id:"login_container", 
 appid: result.data.appid, //应用的唯一标识
 scope: "snsapi_login",//授权作用域 
 redirect_uri: result.data.redirectUri,//授权后重定向的回调地址，请使用urlencode对链接进行处理
  state: result.data.state,
 style: "black",
 });
}
//给验证码按钮禁用时长
let time = ref(10)
//计时器
let timer
function disabledOfCaptcha() {
  captchaCanUse.value = true
}
//设置计时器时器,一定时间后会自动解除验证码按钮的禁用
function disabledCaptchaTimer() {
  disabledOfCaptcha()//默认禁用
  const Interval = setInterval(() => {
    if (time.value-- === 0) {
      undisabledOfCaptcha()//立即解除
      return clearInterval(Interval)
    }
  }, 1000)
  timer = Interval
}
//立即解除验证码按钮禁用
function undisabledOfCaptcha() {
  time.value = 10
  captchaCanUse.value = false
}
//getCode获取验证码
function getCodeFun() {
  // if (!isLegalPhonepNumber(phone.value)) return alert('请输入正确的手机号码')
  disabledCaptchaTimer()
  getCode(phone.value).then(res => {
    captcha.value = res.data
    undisabledOfCaptcha()
    //timer是否存在，存在移除
    timer ? clearInterval(timer) : null

  })
}

//合法手机号码验证
function isLegalPhonepNumber(phonenNumber) {
  return /^1[3456789]\d{9}$/.test(phonenNumber)
}
//监听手机号校验格式
let phoneWathcer 
watch(phone, (newValue) => {
  //节流优化
  if (phoneWathcer) {
    clearTimeout(phoneWathcer)
  }
phoneWathcer = setTimeout(() => {
  phoneFormat.value = isLegalPhonepNumber(newValue)
}, 300)
})

//监听验证码，校验格式
let captchaWathcer
watch(captcha, (newValue) => {
  //验证码长度为6，直接跳出为通过
  console.log(newValue)
if (newValue.length !== 6) {
    captchaFormat.value = false
    captchaWathcer? clearTimeout(captchaWathcer) : null
    return
  }
  if (captchaWathcer) {
    clearTimeout(captchaWathcer)
  }
  captchaWathcer = setTimeout(() => {
    //验证码就不验证了，直接后端传来的，然也可以搞
    captchaFormat.value = true
}, 300)
})
//userLogin手机登录
function userLogin() {
  //手机号，验证码，是否是微信登录，是否是手机登录
  const data = {
    phone: phone.value,
    code: captcha.value,
  }
  userStore.userLogin(data)//仓库获取登录信息，并存储
  .then(res => {
    // console.log(res)
    userStore.visible = false
    const redirect=$route.query.redirect
    if(redirect){
      $router.push(redirect as string)
    }else{
      $router.push('/home')
    }
  }).catch(err => {
    //@ts-ignore
    ElMessage({
      type: 'error',
      message: err.message,
    })
  })
}
//判断微信是否登入成功
 let wxLinsenter
watch(()=>scene.value, (newValue) => {
  if(newValue===true){
  wxLinsenter = userStore.queryState()
  }else{
    wxLinsenter? clearInterval(wxLinsenter) : null
  }
})
//销毁监听
onUnmounted(()=>{
   wxLinsenter? clearInterval(wxLinsenter) : null
})
</script>

<style scoped lang="scss">
:deep(.el-input__suffix-inner) {
  font-size: 18px;
}

.custom-suffix-icon-success {
  :deep(.el-input__suffix-inner) {
    color: green; // 设置你想要的颜色
  }
}

.custom-suffix-icon-fail {
  :deep(.el-input__suffix-inner) {
    color: rgb(238, 114, 77); // 设置你想要的颜色
  }
}

/* 深度选择器 */
.login-container {
  :deep(.el-dialog__body) {
    border-top: 1px solid #ccc;
  }
}

.body {
  display: grid;
  grid-template-columns: 1fr 1fr;

  .left {
    margin-top: 20px;

    .logint {
      padding: 40px 20px;
      border: 1px solid #ccc;
      height: 80%;
      border-radius: 8px;

      .svg {
        --len: 44px;
        width: var(--len);
        height: var(--len);
        border: 1px solid #ccc;
        border-radius: 50%;
        display: flex;
        align-items: center;
        cursor: pointer;
        justify-content: center;
      }

      .bottom {
        text-align: center;
        margin-top: 40px;
      }

      :deep(.el-input__wrapper) {
        margin-bottom: 17px;
        height: 40px;
      }
    }
  }

}

.right {
  width: 100%;
  display: flex;
  justify-content: center;

  ._body {
    margin: 10px;

    .top {
      display: grid;
      grid-template-columns: repeat(2, 1fr);

      p {
        font-size: 15px;
        margin: 0;
      }

      ._left,
      ._right {
        padding: 25px;
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
          --len: 150px;
          width: var(--len);
          height: var(--len);
        }
      }
    }
  }

  .bottom {
    margin-top: 20px;

    h3 {
      margin: 0;
      display: block;
      font-size: 26px;
      font-weight: 500;
      font-family: '宋体';
      margin-bottom: 5px;
      letter-spacing: 0.3rem;
      text-align: center;
    }
  }
}
.weichat{
  display: flex;
  flex-direction: column;
  align-items: center;
  p{
    margin: 0;
    padding:5px 0;
  }
}
</style>

