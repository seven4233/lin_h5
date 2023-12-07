import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import  type { UserInfo } from '@/types/user';
import { getUserInfoAPI } from '@/apis/user';

export const useUserStore = defineStore('user', () => {

  const userInfo = ref<UserInfo>();
  const token = ref()

//
const refreshUserInfo = async()=>{
  let res:any = await getUserInfoAPI()
  userInfo.value = res
}

//   保存用户资料
  const setUserInfo = (info: any)=>{
    userInfo.value = info
  }
// 保存token
  const setToken = (value: string)=>{
    token.value = value
  }
  const getToken = ()=>{
    return token.value
  }
// 清除用户信息
  const clearUserInfo = ()=>{
    (userInfo.value as any) = ''
    token.value = ''
  }

  return { userInfo, setUserInfo, setToken, clearUserInfo,getToken, token , refreshUserInfo}
}, {
    persist: true
})
