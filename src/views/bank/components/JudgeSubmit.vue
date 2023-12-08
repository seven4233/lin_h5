<script lang="ts" setup>
import { onMounted, ref, onBeforeMount, getCurrentInstance } from 'vue'
import { useJudgeStore } from '@/stores/bank/judgeStore'
import Navbar from '@/components/Navbar.vue';
import { useRoute } from 'vue-router';
import { showConfirmDialog , showSuccessToast} from 'vant';
import router from '@/router';
const route = useRoute()
// 拿到题库id
const bankId = ref(route.params.id)

const judgeStore = useJudgeStore()
const cardNumList = ref([
    {
        value: 1,
        done: false,
    },
    {
        value: 2,
        done: false,
    },
    {
        value: 3,
        done: false,
    },
    {
        value: 4,
        done: false,
    },
    {
        value: 5,
        done: false,
    },
])
const currentCardIndex = ref(0)


onMounted(() => {
    judgeStore.isSubmit = true
    showSuccessToast({
        message:"提交成功",
        position:'top'
    })
})


const  backToSort = ()=>{
    showConfirmDialog({
    title:'提示',
    message:'确认退出答题?',
  }).then(()=>{
    router.push(`/bank/${bankId.value}`)
  })
}
// 提交
const handleContinue = () => {
        showConfirmDialog({
            title: '温馨提示',
            message:
                `继续？`,
        })
            .then(async () => {
                router.push(`/bank/${bankId.value}/single`)
      
            })
            .catch(() => {
            });
    
}
const scrollToTop = () => {
    window.scrollTo(0,0)
};

const cardNumClick = (index: number) => {
    scrollToTop()
    currentCardIndex.value = index
   
}

const handlePre = ()=>{
    scrollToTop()
    currentCardIndex.value --
}
const handleNext = ()=>{
    scrollToTop()
    currentCardIndex.value ++
}
</script>

<template>
    <Navbar  left-text="题型分类" :left-arrow="true" :left-fn="backToSort" title="判断题" />

    <div id="single" class="single_submit">
        <div v-show="judgeStore.judgeList?.length" class="header">
            <div class="header-content">
                <!-- 答题卡圈圈 -->
                <div class="answer_card_list">
                    <div style="margin-right: 10rpx; color: #666">答题卡</div>
                    <div class="answer_card_item" v-for="(item, index) in cardNumList" :key="item.value"
                        @click="cardNumClick(index)">
                        <div style="margin-right: 8rpx; padding-top: 4rpx">
                            <div class="card_num done" :class="{
                                'error': !judgeStore.doneCorrectArr?.includes(index),
                                'running': index === currentCardIndex,

                            }">
                                {{ item.value }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 提交答案 -->
                <div class="header-submitter">
                 
                    <div class="ab" @click="handleContinue">
                        <div class="cd">继续</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 题目区域 -->
        <div class="page-wrapper-submit">
            <template v-for="(item, index) in judgeStore.judgeList" :key="index">
                <!-- 一题 -->
                <div v-show="index === currentCardIndex" class="item" :id="index + ''">
                    <div class="title">
                        <div class="question-desc-header">
                            <div class="commonClass singleClass">判断题</div>
                            <div class="rightAction">
                                <div class="collectIcon">
                                    <van-icon name="star-o" size=".27rem" />

                                </div>
                            </div>
                        </div>

                        <div class="question-info">
                            <div class="question-num">
                                <span>{{ index + 1 }}</span>
                            </div>
                            <div class="question-name">
                                <span>【{{ item.question_num }}】{{ item.name }}</span>
                            </div>
                        </div>
                    </div>
                    <!-- 选项区 -->
                    <div class="question-select">
                        <div class="option-item" :class="{
                            'option-item-selected': item.answer === i.value,
                            'option-item-error': judgeStore.isSubmit && i.selected && i.value !== item.answer,
                        }" v-for="(i, idx) in item.options" :key="i.value" >
                            <div class="label">{{ i.value }}</div>
                            <div class="content">{{ i.label }}</div>
                        </div>
                    </div>
                    <!-- 答案区 -->
                    <div v-if="judgeStore.isSubmit" class="answer_wrapper">
                        <div class="answer_compare">
                            <div class="correct_answer">
                                正确答案：
                                <span>{{ item.answer }}</span>
                            </div>
                            <div class="your_answer">
                                你的答案：
                                <span :class="item.answer === item.your ? 'green' : 'red'">{{
                                    item.your || "未选择"
                                }}</span>
                            </div>
                        </div>
      
                        <div class="source">
                            <span>知识点：</span>
                            <span>{{ item.source }}</span>
                        </div>
                    </div>
                </div>
            </template>

            <!-- 操作区(上下题切换，提交 -->
            <div class="test-submit">
                    <van-button :disabled="currentCardIndex <= 0" type="primary" @click="handlePre">上一题</van-button>
                    <van-button :disabled="currentCardIndex >= 4"  type="primary" @click="handleNext">下一题</van-button>
            </div>
        </div>
  
    </div>
</template>

<style lang="less" scoped>
.single_submit {
    .header {
    position: sticky;
    z-index: 999;
    top: 0;
    height: .5rem;
    background-color: rgb(255 255 255);
    box-shadow: 0 .1rem .1rem 0 rgb(0 0 0 / 2%), 0 .1rem .1rem 0 rgb(0 0 0 / 4%);

    .header-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: .1rem .1rem .2rem .2rem;

      // 答题卡圈圈
      .answer_card_list {
        display: flex;
        align-items: center;

        .answer_card_item {
          position: relative;

          .card_num {
            display: flex;
            position: relative;
            align-items: center;
            justify-content: center;
            width: .3rem;
            height: .3rem;
            border-width: 0.01rem;
            border-radius: 100%;
            font-weight: 400;
            margin: 0 .05rem;
          }

          .empty {
            border: .01rem solid rgb(240 240 240 / 100%);
            color: rgb(153 153 153 / 100%);
          }

          .running {
            border: .01rem solid rgb(240 240 240) !important;
            border-color: rgb(50 202 153 / 100%) !important;
          }

          .done {
            border: .01rem solid rgb(148 227 201 / 100%);
            background-color: rgb(238 250 247 / 100%);
            color: rgb(50 202 153 / 100%);
          }

          .error {
            border: .01rem  solid rgb(255 154 118 / 100%);
            background-color: rgb(255 246 243 / 100%);
            color: rgb(255 86 27 / 100%);
          }
        }
      }

      .header-submitter {
        display: flex;
        align-items: center;
        color: rgb(153 153 153);
        font-weight: 500;

        .ab {
          display: flex;
          align-items: center;
          justify-content: center;
          height: .3rem;
          width: .6rem;
          margin-right: .1rem;
          border: .01rem solid rgb(50 202 153 / 100%);
          border-radius: .1rem;
          color: rgb(50 202 153 / 100%);

          .cd {
            font-weight: 600;
            text-align: center;
          }
        }
      }
    }
  }

    .page-wrapper-submit {
        position: relative;
        padding: .1rem .2rem;
        background: #fff;
        padding-bottom: 1rem;;
        .item {
            padding: .1rem 0;

            // 题目
            .title {
                font-size: .2rem;
                margin-bottom: .2rem;

                .question-desc-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: .1rem;

                    .commonClass {
                        padding: .02rem .05rem;
                        border-radius: .1rem;
                        font-weight: 400;
                    }

                    .singleClass {
                        background-color: rgb(227 243 255);
                        color: rgb(0 117 255);
                    }

                    .rightAction {
                        .collectIcon {
                            color: rgb(153 153 153);
                        }
                    }
                }

                .question-info {
                    display: flex;
                    color: rgb(51 51 51);
                    font-weight: 600;

                    .question-num {
                        width: .3rem;
                        height: .3rem;
                        line-height: .3rem;
                        border: .01rem solid #32ca99;
                        border-radius: 50%;
                        text-align: center;

                    }

                    .question-name {
                        flex: 1 1 0%;
                        word-wrap: break-word;
                        word-break: break-all;
                    }
                }
            }

            // 选项区
            .question-select {
                font-size: .18rem;

                .option-item {
                    display: flex;
                    margin-top: .05rem;
                    padding: .1rem .2rem;
                    border: .01rem solid transparent;
                    border-radius: .1rem;

                    &:first-child {
                        margin-top: 0;
                    }

                    .label {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: .3rem;
                        height: .3rem;
                        margin-right: .1rem;
                        border: .01rem solid;
                        border-radius: 50%;
                        border-color: rgb(221 221 221);
                    }

                    .content {
                        display: flex;
                        flex: 1 1 0%;
                        color: rgb(51 51 51);
                    }
                }

                .option-item-selected {
                    border: 0.01rem solid rgb(148 227 201);
                    background-color: rgb(238 250 247);
                    .label {
                        border-color: rgb(50 202 153);
                        background-color: rgb(50 202 153);
                        color: rgb(255 255 255);
                    }
                }

                .option-item-error {
                    border-color: rgb(255 187 164);
                    background-color: rgb(255 246 243);
                }
            }

            // 答案区
            .answer_wrapper {
                --tw-bg-opacity: 1;
                --tw-text-opacity: 1;

                position: relative;
                margin-top: 20px;
                padding: 20px 40px 0;
                padding: 18px 24px 20px;
                border-radius: 8px;
                background-color: rgb(248 248 248 / var(--tw-bg-opacity));
                color: rgb(51 51 51 / var(--tw-text-opacity));
                font-size: 16px;
                line-height: 27px;

                &::after {
                    --tw-bg-opacity: 1;

                    content: '';
                    display: block;
                    position: absolute;
                    top: 25px;
                    left: 0;
                    width: 4px;
                    height: 12px;
                    border-top-right-radius: 4px;
                    border-bottom-right-radius: 4px;
                    background-color: rgb(85 85 85 / var(--tw-bg-opacity));
                }

                .answer_compare {
                    display: flex;
                    align-items: center;
                    margin-bottom: 16px;

                    .correct_answer {
                        font-weight: 500;

                        span {
                            --tw-text-opacity: 1;

                            display: inline-block;
                            color: rgb(50 202 153 / var(--tw-text-opacity));
                        }
                    }

                    .your_answer {
                        margin-left: 20px;
                        font-weight: 500;

                        span {
                            display: inline-block;
                        }
                    }

                    .red {
                        --tw-text-opacity: 1;

                        color: rgb(255 86 27 / var(--tw-text-opacity));
                    }

                    .green {
                        --tw-text-opacity: 1;

                        color: rgb(50 202 153 / var(--tw-text-opacity));
                    }
                }

                .jiexi {
                    margin-top: 16px;
                }
            }
        }

        .operation {
            position: relative;
            width: 400rpx;
            margin-top: 50rpx;
            margin-left: 50%;
            transform: translateX(-50%);

            .submit {
                position: absolute;
                right: 0;
            }
        }
    }

    .test-submit {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1rem;
        z-index: 999;
        background: #fff;
        display: flex;
        justify-content: space-around;
        align-items: center;
    
    }
}
</style>
