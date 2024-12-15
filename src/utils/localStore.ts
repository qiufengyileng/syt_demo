const key="syt_hospital_"
export const setUserInfo=(userInfo:string)=>{
  localStorage.setItem(key+"userInfo",userInfo)
}
export const getUserInfo=()=>{
  return JSON.parse(localStorage.getItem(key+"userInfo")||"{}")
}
export const removeUserInfo=()=>{
  localStorage.removeItem(key+"userInfo")
}