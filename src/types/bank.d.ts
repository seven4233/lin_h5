export type BankItem = {
    id: number
    year: string
    name: string
    fever: number
  }
  
  export type SortInfo = {
    bankInfo: BankItem
    count: {
      singleCount: number
      multipleCount: number
      blankCount: number
      judgeCount: number
    }
    doneCount: {
      singleDoneCount: number
      multipleDoneCount: number
      blankDoneCount: number
      judgeDoneCount: number
    }
  }
  export type SingleOption = {
    label: string
    value: string
    question_num: string
    selected: boolean
    question_index: number
  }
  export type SingleItem = {
    question_num: string
    type: string
    name: string
    source: string
    source_dic: string
    options: SingleOption[]
    answer: string
    question_index: number
    your?: string
  }
  export type SingleListReturnType = {
    doneCount: number
    totalCount: number
    list: SingleItem[]
  }
  export type JudgeListReturnType = {
    doneCount: number
    totalCount: number
    list: JudgeItem[]
  }
  export type MulListReturnType = {
    doneCount: number
    totalCount: number
    list: MultipleItem[]
  }
  export type SubmitQuestionParams = {
    bankId: number
    sort: string
    correctList: any[]
  }
  