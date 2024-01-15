<script setup lang="ts">
import { getBankListAPI } from '@/apis/bank';
import { addSearchHistoryAPI, getSearchHistoryAPI,deleteSearchHistoryAPI, clearSearchHistoryAPI } from '@/apis/user';
import { onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue';
import { ref } from 'vue';
import { showFailToast } from 'vant';
import { useRouter } from 'vue-router';
const keyword = ref()
const historyList = ref<any>([])

const getSearchHistory = async()=>{
  let res:any = await getSearchHistoryAPI()
  historyList.value = res.result
}
onMounted(()=>{ 
  getSearchHistory()
})

const router = useRouter()
const onSearch  = async(v:string)=>{
  // 参数校验
  if(!v.trim()){
    showFailToast({message:"请输入关键词"})
    keyword.value = ''
    return 
  }
  // 添加history
  const res = await addSearchHistoryAPI(v)
  getSearchHistory()
  console.log(res);
  
  // 获取结果并跳转
  router.push('/search?keyword=' + keyword.value)
  
}

const deleteHistory = async(id:any)=>{
  await deleteSearchHistoryAPI(id)
  getSearchHistory()
}

const clearHistory = async()=>{
  await clearSearchHistoryAPI()
  getSearchHistory()
}

</script>

<template>
  <Navbar title="首页" />
  <!-- <Bank/> -->
  <!-- 搜索栏 -->
  <van-search  @search="onSearch" v-model="keyword" placeholder="请输入搜索关键词" />
  <div class="search-history">
    <van-tag @close="deleteHistory(item.id)"  v-for="item in historyList" type="default" size="large" closeable
    style="margin: 5px 5px;">{{item.keyword}}</van-tag>
  </div>
  <a v-show="historyList.length" @click="clearHistory" class="clear-history">清空搜索历史</a>

</template>

<style lang="less" scoped>
.search-history {
  padding: 0 12px;
}
.clear-history {
  font-size: 14px;
  text-decoration: underline;
  text-align: right;
  display: block;
  margin-right: 30px;
}
</style>