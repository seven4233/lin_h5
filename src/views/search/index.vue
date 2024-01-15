<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { searchAPI } from "@/apis/file";
import Navbar from "@/components/Navbar.vue";
import { parseFileIcon, transFileSize } from "@/utils/tools";
const showLoading = ref(false);

const route = useRoute();
const keyword = ref(route.query.keyword);
const list = ref<any>([]);

onMounted(async () => {
  showLoading.value = true;
  console.log(keyword.value);
  let res: any = await searchAPI(keyword.value);
  list.value = res.result;
  setTimeout(() => {
    showLoading.value = false;
  }, 1000);
});

const preview = (item: any) => {
  var strurl =item.url
  var path = "";
  var serch = "";
  var index = strurl.indexOf("?");
  if (index > -1) {
    path = strurl.substr(0, index);
    serch = strurl.substr(index + 1);
    window.open(
      "http://pfile.com.cn/api/profile/onlinePreview?url=" +
        encodeURIComponent(decodeURIComponent(path) + "?" + serch)
    );
  } else {
    path = strurl;
    window.open(
      "http://pfile.com.cn/api/profile/onlinePreview?url=" +
        encodeURIComponent(decodeURIComponent(path))
    );
  }

};


</script>

<template>
  <Navbar title="搜索结果" />
  <van-loading v-show="showLoading" style="margin-top: 50px" vertical>
    <template #icon>
      <van-icon name="star-o" size="30" />
    </template>
    玩命搜索中...
  </van-loading>
  <div v-show="!showLoading" class="search">
    <div class="tip">
      共找到 {{ list.length }} 条结果
      <span style="font-size: 16px; color: #666">({{ keyword }})</span>
    </div>

    <van-divider />
    <ul v-if="list.length !== 0" class="list">
      <li class="item" v-for="item in list" :key="item.id">
        <div class="file-name" @click="preview(item)">
          <van-icon
            size="20"
            style="transform: translate(-2px, 5px)"
            :name="parseFileIcon(item.type)"
          />
          {{ item.name }} <span style="font-size: 14px; margin-left: 20px;">({{ transFileSize(item.size) }})</span>
        </div>
        <div class="userinfo">
          <span>来自：{{ item.user.nickname }}</span>
          <span style="margin-left: 10px">下载数：{{ item.download }}</span>
          <a class="download" :href="item.url" download>下载</a>
        </div>
      </li>
    </ul>
    <div v-else>
      <van-empty>
        <van-button @click="$router.back" round type="primary"
          >点击返回</van-button
        >
      </van-empty>
    </div>
  </div>


</template>

<style lang="less" scoped>
.search {
  padding: 10px;
  .tip {
    font-size: 20px;
  }
  .list {
    .item {
      color: #666;
      margin: 20px 0;
      padding-bottom: 4px;
      border-bottom: 1px solid #cecece;
      .file-name {
        text-decoration: underline;
      }
      .userinfo {
        display: flex;
        margin-top: 10px;
        position: relative;
        .download {
          position: absolute;
          right: 10px;
        }
      }
    }
  }
}
</style>
