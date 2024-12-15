import request from '../../utils/interceptors'
import { SubmitOrder,OrderResponseData } from './type'

enum API{
  //提交订单，获取订单信息
  submitOrder_url='/order/orderInfo/auth/submitOrder/',
  //获取订单详情
  getOrderDetail_url='/order/orderInfo/auth/getOrderInfo/',
  //取消预约订单
  cancelOrder_url='/order/orderInfo/auth/cancelOrder/',
  //支付二维码接口
  weixinPay_url='/order/weixin/createNative/',
  //获取订单支付状态
  payStatus_url='/order/weixin/queryPayStatus/',
  //实名认证成功，获取用户信息
  UserInfo_url='/user/auth/getUserInfo',
  //实名认证接口
  usercretation_url='/user/auth/userAuah',
  //订单列表
  orderList_url='/order/orderInfo/auth/',
  //当前账号所有就诊人信息
  patientList_url='/user/patient/auth/findAll',
  //获取证件类型的接口
  CertificatesType_url='/cmn/dict/findByDictCode/',
  //当前订单状态
  orderStatus_url='/order/orderInfo/auth/getStatusList/',
  //获取地址数据
  address_url='/cmn/dict/findByParentId/',
  //新增就诊人接口
  addPatient_url='/user/patient/auth/save',
  //跟新就诊人接口
  updatePatient_url='/user/patient/auth/update',
  //删除就诊人接口
  deletePatient_url='/user/patient/auth/remove/',

}
export const getSubmitOrder=(hoscode:string,scheduleId:string,patientId:string)=>
  request.post<any,SubmitOrder>(API.submitOrder_url+`${hoscode}/${scheduleId}/${patientId}`)
export const getOrderDetail=(id:number)=>request.get<any,OrderResponseData>(API.getOrderDetail_url+id)
export const toCancelOrder=(id:string)=>request.get<any,any>(API.cancelOrder_url+id)
export const getWeiXinCode=(orderId:string)=>request.get<any,any>(API.weixinPay_url+orderId)
export const getPayStatus=(orderId:string)=>request.get<any,any>(API.payStatus_url+orderId)
export const getUserInfo=()=>request.get<any,any>(API.UserInfo_url)

export const getCertificatesType=(certificatesType='certificatesType')=>request.get(API.CertificatesType_url+certificatesType)
export const userCreation=(data:any)=>request.post<any,any>(API.usercretation_url,data)
export const getOrderList=(page:number,limit:number,patientId:string,orderStatus:string)=>
request.get<any,any>(API.orderList_url+`${page}/${limit}?patientId=${patientId}&orderStatus=${orderStatus}`)

export const getPatientList=()=>request.get<any,any>(API.patientList_url)

export const getOrderStatus=()=>request.get<any,any>(API.orderStatus_url)

export const getAddressList=(parentId:string)=>request.get<any,any>(API.address_url+parentId)
// export const addPatientData=(data:Object)=>request.post<any,any>(API.addPatient_url,data)
// export const toUpDatePateintDatas=(data:Object)=>request.post<any,any>(API.updatePatient_url,data)

export const addOrUpdatePatient=(data:any)=>{
  if(data.id){
    return request.put<any,any>(API.updatePatient_url,data)
  }else{
    return request.post<any,any>(API.addPatient_url,data)
  }
}

export const deletePatientData=(id:number)=>request.delete(API.deletePatient_url+id)