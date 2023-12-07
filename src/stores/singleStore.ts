import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { SingleItem, SingleOption, SubmitQuestionParams } from '@/types/bank'
import { getSingleListAPI, submitQuestionAPI } from '@/apis/bank'
import type { SingleListReturnType } from '@/types/bank'

export const useSingleStore = defineStore(
  'single',
  () => {
    const singleList = ref<SingleItem[]>()
    const isSubmit = ref(false)
    const doneCount = ref(0)
    const totalCount = ref(0)
    const getSingleListAction = async (bankId: number) => {
      //   获取单选题
      const res = (await getSingleListAPI(bankId)) as any as SingleListReturnType
      console.log(res)
      singleList.value = res.list
      doneCount.value = res.doneCount
      totalCount.value = res.totalCount
    }

    // 根据 选择情况 决定选项的状态
    const selectedAction = (selectedOption: SingleOption) => {
      const { question_num, value } = selectedOption
      // 找到目标题目
      const targetQuestion: any = singleList.value?.find(
        (question) => question.question_num === question_num,
      )

      // 单选题 先清空该题已选
       targetQuestion.options.map((item: any) => {
        if (item.value !== value) {
          item.selected = false
        }
        return item
      })

      // 找到目标选项
      const target = targetQuestion?.options.find((item: any) => item.value === value)
      // 更新选择状态
      target.selected = !target.selected

      // 更新选项列表
      const updatedOptions = targetQuestion?.options.map((item: any) =>
        item.value === value ? target : item,
      )
      if (targetQuestion) {
        targetQuestion.options = updatedOptions
        targetQuestion.your = value
      }
    }

    // 已选择的选项
    const selectedValue = computed(() => {
      const selectedList: SingleOption[] = []
      singleList.value?.forEach((item) => {
        const selectedItem = item.options.find((i: any) => i.selected === true)
        if (selectedItem) {
          selectedList.push(selectedItem)
        }
      })
      return selectedList
    })

    // 已做题目的索引
    const doneArr = computed(() => {
      let doneArr: any[] = []
      const arr = selectedValue.value.filter((item) => item.selected)
      doneArr = arr.map((i) => i.question_index)
      return doneArr
    })
    // 已做正确题目的索引
    const doneCorrectArr = computed(() => {
      const arr = correctList.value?.map((item) => item.question_index)
      return arr
    })

    // 是否全部选完
    const isFinished = computed(() => selectedValue.value.length === singleList.value?.length)

    // 还剩的题
    const leftQuestion = computed(() => singleList.value?.length! - selectedValue.value.length)

    // 答对题数
    const correctCount = computed(
      () => singleList.value?.filter((item) => item.answer === item.your).length,
    )
    // 答对题目列表
    const correctList = computed(() =>
      singleList.value?.filter((item) => item.answer === item.your),
    )

    // 正确率
    const correctPercent = computed(() => (correctCount.value! / singleList.value?.length!) * 100)

    /**
     * 添加完成題目
     */
    const addFinishedQuestion = async (params: SubmitQuestionParams) => {
      const res = await submitQuestionAPI(params)
      // 重新获取 进度
      const r = (await getSingleListAPI(params.bankId)) as any as SingleListReturnType
      doneCount.value = r.doneCount
      console.log(res)
    }
    return {
      addFinishedQuestion,
      correctList,
      doneCount,
      singleList,
      doneArr,
      selectedValue,
      getSingleListAction,
      selectedAction,
      doneCorrectArr,
      isFinished,
      leftQuestion,
      isSubmit,
      correctCount,
      correctPercent,
      totalCount,
    }
  },
  {
    persist: true,
  },
)
