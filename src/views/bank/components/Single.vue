<script lang="ts" setup>
import { onMounted, ref, onBeforeMount, getCurrentInstance } from 'vue'
import { useSingleStore } from '@/stores/bank/singleStore'
import type { SingleOption } from '@/types/bank'
import { useBankStore } from '@/stores/bank/bankStore'
import Navbar from '@/components/Navbar.vue';
import { useRoute , useRouter} from 'vue-router';
import { showConfirmDialog } from 'vant';
const route = useRoute()
const router = useRouter()
// 拿到题库id
const bankId = ref(route.params.id)

const singleStore = useSingleStore()
const bankStore = useBankStore()
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
  singleStore.isSubmit = false
  // 获取单选题列表
  singleStore.getSingleListAction(Number(bankId.value))

})

const itemClick = (item: SingleOption, index: number) => {
  singleStore.selectedAction(item)
  console.log(item)

}



// 提交
const handleSubmit = () => {
  console.log(singleStore.selectedValue)

  if (!singleStore.isFinished) {
    showConfirmDialog({
      title: '温馨提示',
      message:
        `你还有 ${singleStore.leftQuestion} 道未完成的题目, 确定交卷?`,
    })
      .then(async () => {
        // 发送提交请求
        await singleStore.addFinishedQuestion({
          bankId: +bankId.value,
          sort: '单选题',
          correctList: singleStore.correctList as any,
        })
        router.push(`/bank/${bankId.value}/single_submit`)
   
      })
      .catch(() => {
      });

  } else {
    showConfirmDialog({
      title: '温馨提示',
      message: `小伙子我劝你检查一下?`,
    })
      .then(async () => {
        //   发送提交请求
        await singleStore.addFinishedQuestion({
          bankId: +bankId.value,
          sort: '单选题',
          correctList: singleStore.correctList as any,
        })

        router.push(`/bank/${bankId.value}/single_submit`)
      })
      .catch(() => {
      });

  }
}

const  backToSort = ()=>{
  showConfirmDialog({
    title:'提示',
    message:'确认退出答题?',
  }).then(()=>{
    router.push(`/bank/${bankId.value}`)
  })
}

const cardNumClick = (index: number) => {
  currentCardIndex.value = index
}
</script>

<template>
  <Navbar title="单选题"  left-text="题型分类" :left-arrow="true" :left-fn="backToSort"/>

  <div id="single" class="single">
    <div v-show="singleStore.singleList?.length" class="header">
      <div class="header-content">
        <!-- 答题卡圈圈 -->
        <div class="answer_card_list">
          <div style="color: #666">答题卡</div>
          <div class="answer_card_item" v-for="(item, index) in cardNumList" :key="item.value"
            @click="cardNumClick(index)">
            <div >
              <div class="card_num empty" :class="{
                running: index === currentCardIndex,
                done: singleStore.doneArr?.includes(index),
              }">
                {{ item.value }}
              </div>
            </div>
          </div>
        </div>

        <!-- 提交答案 -->
        <div class="header-submitter">
          <div class="ab" @click="handleSubmit">
            <div class="cd">交卷</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 题目区域 -->
    <div v-if="singleStore.singleList?.length" class="page-wrapper">
      <template v-for="(item, index) in singleStore.singleList" :key="index">
        <!-- 一题 -->
        <div v-show="index === currentCardIndex" class="item" :id="index + ''">
          <div class="title">
            <div class="question-desc-header">
              <div class="commonClass singleClass">单选题</div>
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
            <div class="option-item" :class="{ 'option-item-selected': i.selected === true }"
              v-for="(i, index) in item.options" :key="i.value" @click="itemClick(i, index)">
              <div class="label">{{ i.value }}</div>
              <div class="content">{{ i.label }}</div>
            </div>
          </div>
        </div>
      </template>

      <!-- 操作区(上下题切换，提交 -->
      <div class="test-submit">
        <van-space size="1rem">
          <van-button :disabled="currentCardIndex <= 0" type="primary" @click="currentCardIndex--">上一题</van-button>
          <van-button v-if="currentCardIndex < 4" type="primary" @click="currentCardIndex++">下一题</van-button>
          <van-button v-else  type="primary" @click="handleSubmit">交卷</van-button>
        </van-space>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-else>
      <van-empty description="已经没了" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.single {
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
            border: .01remsolid rgb(240 240 240 / 100%);
            border-color: rgb(50 202 153 / 100%);
          }

          .done {
            border: .01rem solid rgb(148 227 201 / 100%);
            background-color: rgb(238 250 247 / 100%);
            color: rgb(50 202 153 / 100%);
          }

          .error {
            border: .01remsolid rgb(255 154 118 / 100%);
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

  .page-wrapper {
    position: relative;
    padding: .1rem .2rem;
    background: #fff;

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
