import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { getBankListAPI, getSortInfoAPI } from '@/apis/bank'
import type { BankItem, SortInfo } from '@/types/bank'

export const useBankStore = defineStore('bank', () => {
  const bankList = ref<BankItem[]>()
  const singleDoneCount = ref(0)
  const multipleDoneCount = ref(0)
  const blankDoneCount = ref(0)
  const judgeDoneCount = ref(0)

  const singleCount = ref(0)
  const multipleCount = ref(0)
  const blankCount = ref(0)
  const judgeCount = ref(0)
  const bankInfo = ref<BankItem>()

  //   获取题库列表
  const getBankListAction = async () => {
    const res = await getBankListAPI()
    console.log(res)
    bankList.value = res as any
  }

  // 根据 题库id 获取分类信息
  const getSortInfoAction = async (bankId: number) => {
    const res = (await getSortInfoAPI(bankId)) as any as SortInfo
    console.log(res)
    bankInfo.value = res.bankInfo
    singleCount.value = res.count.singleCount
    multipleCount.value = res.count.multipleCount
    blankCount.value = res.count.blankCount
    judgeCount.value = res.count.judgeCount

    singleDoneCount.value = res.doneCount.singleDoneCount
    multipleDoneCount.value = res.doneCount.multipleDoneCount
    blankDoneCount.value = res.doneCount.blankDoneCount
    judgeDoneCount.value = res.doneCount.judgeDoneCount
  }

  // 组成题型数量 数组
  const sortArr = computed(() => {
    return [
      {
        type: '单选题',
        count: singleCount.value,
        doneCount: singleDoneCount.value,
        value: 'single',
      },
      {
        type: '判断题',
        count: judgeCount.value,
        doneCount: judgeDoneCount.value,
        value: 'judge',
      },
      {
        type: '多选题',
        count: multipleCount.value,
        doneCount: multipleDoneCount.value,
        value: 'multiple',
      },
      {
        type: '填空题',
        count: blankCount.value,
        doneCount: blankDoneCount.value,
        value: 'blank',
      },
    ]
  })

  return {
    bankList,
    getBankListAction,
    sortArr,
    getSortInfoAction,
    bankInfo,
  }
})
