import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import  type { MultipleItem, MultipleOption,  SubmitQuestionParams } from '@/types/bank';
import { getMulListAPI, submitQuestionAPI } from '@/apis/bank';

export const useMultipleStore = defineStore(
  'multiple',
  () => {
    const multipleList = ref<MultipleItem[]>();
    const isSubmit = ref(false);
    const doneCount = ref(0);
    const totalCount = ref(0);
    const getMultipleListAction = async (bankId: number) => {
      //   获取多选题
      const res = await getMulListAPI(bankId) as any;
      console.log(res); 
      multipleList.value = res.list;
      doneCount.value = res.doneCount;
      totalCount.value = res.totalCount;
    };

    // 根据 选择情况 决定选项的状态
    const selectedAction = (selectedOption: MultipleOption) => {
      const { question_num, value } = selectedOption;
      // 找到目标题目
      let targetQuestion: any = multipleList.value?.find(
        (question) => question.question_num === question_num,
      );


      // 找到目标选项
      let target = targetQuestion?.options.find((item: any) => item.value === value);
      // 更新选择状态
      target.selected = !target.selected;

      // 更新选项列表
      const updatedOptions = targetQuestion?.options.map((item: any) =>
        item.value === value ? target : item,
      );
      if (targetQuestion) {
        targetQuestion.options = updatedOptions;
        targetQuestion.your = targetQuestion?.options.filter((item:any) => item.selected).map((item:any)=>item.value).join().replaceAll(',','');
      }
    };

    // 已选择的选项
    const selectedValue = computed(() => {
      let selectedList: MultipleOption[] = [];
      multipleList.value?.forEach((item) => {
        let selectedItem = item.options.find((i: any) => i.selected === true);
        if (selectedItem) {
          selectedList.push(selectedItem);
        }
      });
      return selectedList;
    });

    // 已做题目的索引
    const doneArr = computed(() => {
      let doneArr: any[] = [];
      let arr = selectedValue.value.filter((item) => item.selected);
      doneArr = arr.map((i) => i.question_index);
      return doneArr;
    });
    // 已做正确题目的索引
    const doneCorrectArr = computed(() => {
      let arr = correctList.value?.map((item) => item.question_index);
      return arr;
    });

    // 是否全部选完
    const isFinished = computed(() => selectedValue.value.length === multipleList.value?.length);

    // 还剩的题
    const leftQuestion = computed(() => multipleList.value?.length! - selectedValue.value.length);

    // 答对题数
    const correctCount = computed(
      () => multipleList.value?.filter((item) => item.answer === item.your).length,
    );

    // 答对题目列表 判断是否正确的逻辑
    const correctList = computed(() =>
      multipleList.value?.filter((item) => item.answer === item.your),
    );

    // 正确率
    const correctPercent = computed(
      () => (correctCount.value! / multipleList.value?.length!) * 100,
    );

    /**
     * 添加完成題目
     */
    const addFinishedQuestion = async (params: SubmitQuestionParams) => {
      let res = await submitQuestionAPI(params);
      // 重新获取 进度
      const r = await getMulListAPI(params.bankId) as any;
      doneCount.value = r.doneCount;
      console.log(res);
    };
    return {
      addFinishedQuestion,
      correctList,
      doneCount,
      multipleList,
      doneArr,
      selectedValue,
      getMultipleListAction,
      selectedAction,
      doneCorrectArr,
      isFinished,
      leftQuestion,
      isSubmit,
      correctCount,
      correctPercent,
      totalCount,
    };
  },
  {
    persist: true,
  },
);
