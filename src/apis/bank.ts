import hlRequest from "@/utils/http";
import type { BankItem, SortInfo, SingleListReturnType, SubmitQuestionParams } from '@/types/bank'

export const getBankListAPI = async ()=>{
    return hlRequest.get("/question/bank", {
  
    })
}


// 获取分类信息
export function getSortInfoAPI(bankId: number) {
  return hlRequest.get(`/question/${bankId}/sort` )
}

// 获取单选题列表
export function getSingleListAPI(bankId: number) {
  return hlRequest<SingleListReturnType>({ method: 'GET', url: `/question/${bankId}/single` })
}

// 提交題目
export function submitQuestionAPI(params: SubmitQuestionParams) {
  return hlRequest({ url: `/question/finish`, method: 'POST', data: params })
}