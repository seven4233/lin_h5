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
export async function updateAvatarAPI(file: any, ) {
  return hlRequest.post('/user/avatar', file)
}