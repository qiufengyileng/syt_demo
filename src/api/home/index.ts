
import request from '../../utils/interceptors'
import type { HospitalResponseData,HospitalLevelAndRegion,HospitalInfo } from './type'
enum API{
  hospital_url='/hosp/hospital/',
  hospital_level_url='cmn/dict/findByDictCode/',
  hospital_getdata_byname='hosp/hospital/findByHosname/'
}
// 获取医院列表
export const getHospital=(page:number,limit:number,hosType='',districtCode='')=>{
  return request.get<HospitalResponseData>(API.hospital_url+`${page}/${limit}?hostype=${hosType}&districtCode=${districtCode}`)
}
// 获取医院等级和地区
export const getHospitalLevelAndRegion=(hosType:string)=>{
  return request.get<HospitalLevelAndRegion>(API.hospital_level_url+`/${hosType}`)
}
// 根据医院名称获取医院详情
export const getHospitalDetailByName=(hosname:string)=>{
  return request.get<HospitalInfo>(API.hospital_getdata_byname+`${hosname}`)
}

