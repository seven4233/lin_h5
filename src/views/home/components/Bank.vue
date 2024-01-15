<script lang="ts" setup>
// import { Card, Tag } from 'ant-design-vue'
import { onMounted } from 'vue'
import { useBankStore } from '@/stores/bank/bankStore'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import  Navbar from '@/components/Navbar.vue';

const list = ref([]);
const loading = ref(false);
const finished = ref(false);

const onLoad = () => {
  loading.value = false
}

const bankStore = useBankStore()
onMounted(() => {
  bankStore.getBankListAction()
})
const router = useRouter()
const itemClick = (bank: any) => {
  const { id } = bank
  router.push(`/bank/${id}`)
  //   uni.navigateTo({
  //     url: `/pages/index/components/sort?id=${id}`,
  //   })
}
</script>

<template>
  <Navbar title="题库"/>

  <div class="bank">
    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell @click="itemClick(item)" icon="star" v-for="item in bankStore.bankList" :key="item.id" :title="item.name" />
    </van-list>
  </div>
</template>

<style lang="less" scoped>
.bank {
  .title {
    display: flex;
    font-size: .20rem;
    margin-left: .05rem;
    .icon {
      transform: translate(.02rem, .05rem);
      width: .2rem;
      img {
        width: 100%;
      }
    }
    .text {
      margin-left: .05rem;
    }
  }
}
</style>
