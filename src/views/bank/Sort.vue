
<script lang="ts" setup>
import { useBankStore } from '@/stores/bankStore'
import { getCurrentInstance } from 'vue'
import { onMounted, onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import Navbar from '@/components/Navbar.vue';

const route = useRoute()
const router = useRouter()
const bankStore = useBankStore()

// 拿到题库id
const bankId = ref(route.params.id)

onMounted(() => {
  // 根据题库id获取题库分类
  bankStore.getSortInfoAction(+bankId.value)
})
const itemClick = (item: any) => {
  console.log(item)
  router.push(`/bank/${route.params.id}/${item.value}`)
  // go(`/bank/${'1'}/${item.value}`)
//   uni.navigateTo({
//     url: `/pages/bank/${item.value}?id=${bankId.value}`,
//   })
}
</script>
<template>
  <Navbar title="分类" v-bind:left-arrow="true" left-text="返回首页"/>
  <div class="question_sort">
    <div class="sort_list">
      <div
        class="sort_item"
        @click="itemClick(item)"
        v-for="item in bankStore.sortArr"
        :key="item.type"
      >
        <div class="sort_name">
          <div class="title">
            {{ item.type }}
            <!-- <Tag v-if="item.type==='判断题'" color="#cd201f" style="transform: scale(0.7)" >new</Tag> -->
          </div>
        </div>
        <div class="sort_num">
          已做
          <text>{{ item.doneCount }}</text>
          /{{ item.count }}题
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.question_sort {
  .sort_list {
    margin-top: .2rem;
    display: flex;
    flex-wrap: wrap;
    .sort_item {
      width: 100%;
      height: .7rem;
      margin-bottom: .2rem;
      padding: .1rem .2rem .2rem .2rem;
      transition: all 0.2s ease;
      border-width: .1rem;
      border-radius: .1rem;
      border-color: transparent;
      background-color: rgba(248, 248, 248);
      color: rgb(51 51 51 / 100%);

      .sort_name {
        display: flex;
        position: relative;
        align-items: center;
        margin-bottom: .1rem;

        .title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          .new {
            position: absolute;
            top: -3rpx;
            left: 5rpx;
            padding: 0 2rpx;
            border: 1rpx solid red;
            border-radius: 10rpx;
            color: red;
            font-size: 12rpx;
          }
        }
      }

      .sort_num {
        color: rgb(187 187 187 / 100%);
        font-size: 32rpx;

        text {
          color: rgb(50 202 153 / 100%);
        }
      }
    }
  }
}
</style>
