import axios from 'axios'
import { ElMessage } from 'element-plus'
import {useUserStore} from '../store/user'

const instance = axios.create({
  baseURL: 'http://syt.atguigu.cn/api',
  timeout: 5000,
})

instance.interceptors.request.use(function (config) {
  const token = useUserStore().userInfo.token
  if(token){
    config.headers.token=token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data
},function (error) {
  ElMessage({
    offset: 90,
    showClose: true,
    message: error.message,
    type: 'error',
  })
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})
export default instance
