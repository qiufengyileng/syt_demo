import request from '../../utils/interceptors'
import type { LoginData,UserLoginResponseData,WXLoginResponseData ,HospitalWorkData} from './type'
enum API{
  hospitaldata_url='/hosp/hospital/',
  //获取科室信息
  hospitalDepartment_url='/hosp/hospital/department/',
 //验证码接口
  getCode_url='/sms/send/',
  //用户登录接口
  getUerLogin_url='/user/login',
  //微信扫码登录接口
  weixinlogin_url='/user/weixin/getLoginParam',
  //医院挂号信息接口
  hospitalallwork_url='/hosp/hospital/auth/getBookingScheduleRule/',
  //医院挂号医生排班详情接口
  hospitaldoctor_url='/hosp/hospital/auth/findScheduleList/', 
  //获取某一个账号下就诊人信息接口
  getuser_url='/user/patient/auth/findAll',
  // 获取就诊医生列表
  getDoctor_url='/hosp/hospital/getSchedule/',

}
// 根据医院编号获取医院详情
export const getHospitalDetailByHoscode=(hoscode:string)=>{
  return request.get(API.hospitaldata_url+`${hoscode}`)
}
export const getHospitalDepartment=(hoscode:string)=>{
  return request.get(API.hospitalDepartment_url+`${hoscode}`)
}
export const getCode=(phone:string)=>{
  return request.get(API.getCode_url+`${phone}`)
}
export const getUserLoginData=(data:LoginData)=>{
  return request.post<any,UserLoginResponseData>(API.getUerLogin_url,data)
}
export const getWeixinLoginData=(wxRedirectUri:string)=>{
  return request.get<any,WXLoginResponseData>(API.weixinlogin_url+`?wxRedirectUri=${wxRedirectUri}`)
}
export const getHospitalAllWork=(page:number,limit:number,hoscode:string,depcode:string)=>{
  return request.get<any,HospitalWorkData>(API.hospitalallwork_url+`${page}/${limit}/${hoscode}/${depcode}`)
}
export const getHospitalDoctor=(hoscode:string,depcode:string,workDate:string)=>{
  return request.get(API.hospitaldoctor_url+`${hoscode}/${depcode}/${workDate}`)
}
export const getUserInfo=()=>{
  return request.get(API.getuser_url)
}
export const getDoctor=(scheduleId:string)=>{
  return request.get(API.getDoctor_url+`${scheduleId}`)
}