import type { UserInfo } from "@/types/user";
import hlRequest from "@/utils/http";
import type { AxiosResponse } from "axios";


type LoginAccountParams = {
    account: string;
    password:string;
}
type loginMobileParams = {
    mobile: string;
    sms: string;
}
type LoginResult = {
    token : string;
    message:string
    code: number
}
// login
export async function loginAPI(mode: 'account' | 'mobile', loginParam: LoginAccountParams | loginMobileParams) {
    if(mode === 'account'){
      return hlRequest.post<any, LoginResult>('/user/login', loginParam )
    }else {
      return hlRequest.post<any, LoginResult >('/user/login/mobile', loginParam )
    }
}

//获取用户信息
export async function getUserInfoAPI() {
  return hlRequest.get('/user/getUserInfo')
}

// 更新用户信息
export async function updateUserInfoAPI(userToUpdate: UserInfo) {
  return hlRequest.put("/user/update", userToUpdate)
}

// 上传头像
export async function updateAvatarAPI(file: any) {
  return hlRequest.post('/user/avatar', file)
}

// 添加搜索历史
export async function addSearchHistoryAPI(keyword:string) {
  return hlRequest.post('/user/history', {keyword})
}

// 获取搜索历史
export async function getSearchHistoryAPI() {
  return hlRequest.get('/user/history')
}

// 删除搜索历史
export async function deleteSearchHistoryAPI(id: number) {
  return hlRequest.delete('/user/history?id=' + id)
}

// 清空搜索历史
export async function clearSearchHistoryAPI() {
  return hlRequest.delete('/user/history/all' )
}
// 添加收藏
export async function addFavorAPI(body:any) {
  return hlRequest.post('/user/favor', body)
}

// 获取收藏列表
export async function getFavorListAPI() {
  return hlRequest.get('/user/favor',)
}