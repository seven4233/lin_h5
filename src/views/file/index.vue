<script setup lang="ts">
import { showLoadingToast, showSuccessToast, showToast } from "vant";
import { ref } from "vue";
import { createFileAPI, getFileListAPI } from "@/apis/file";
import { onMounted } from "vue";
import { parseFileIcon, formatTime, transFileSize } from "@/utils/tools";
import Navbar from "@/components/Navbar.vue";
import { useUserStore } from "@/stores/userStore";
import type { SuccessContext } from "tdesign-mobile-vue/es/upload/type";

import { Toast } from "tdesign-mobile-vue";

const userStore = useUserStore();
const files = ref<any>([]);
const fileList = ref<any>([]);

const showDialog = ref(false);
const percentage = ref(0);
const uploading_file = ref("");
const afterRead = async (file: any) => {
  file.state = "loading";
  let toast = showLoadingToast({
    message: `文件 ${file.file.name} 正在上传...`,
    forbidClick: true,
    duration: 0,
  });

  const formdata = new FormData();
  console.log(file);

  formdata.append("file", file.file);
  let res: any = await createFileAPI(formdata);

  if (res.code === 0) {
    file.state = "success";
    toast.close();
    showSuccessToast({
      message: `文件 ${file.file.name} 上传成功!`,
    });
    // 获取文件
    getFileList();
  }
};

onMounted(() => {
  getFileList();
});

const getFileList = async () => {
  let res: any = await getFileListAPI();
  fileList.value = res.result;
};

const preview = (item: any) => {
  var strurl = item.url;
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

const onSelectChange = async (v: any, currentFiles: any) => {
  showDialog.value = true;

  uploading_file.value = currentFiles.currentSelectedFiles[0].name;

  timer = setInterval(() => {
    percentage.value += 6;
  }, 100);
};

let timer: any;
const success = (context: SuccessContext) => {
  showDialog.value = false;
  percentage.value = 0;
  clearInterval(timer);
  console.log(context.fileList);
  getFileList();

  Toast({
    theme: "success",
    direction: "column",
    message: `${uploading_file.value} 上传成功!`,
  });
};
const onFail = () => {
  showDialog.value = false;
  percentage.value = 0;
  clearInterval(timer);
  getFileList();
};

const onProgress = (v: any) => {
  console.log(v.percent);
};

// 滚动

const loading = ref('');
let number = ref(5)
const loadData = (data: any, isRefresh?: Boolean) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      number.value += 5


      resolve(data);
    }, 1000);
  });
};

const onLoad = () => {
  if ((number.value >= fileList.value.length) || loading.value) {
    return;
  }
  loading.value = 'loading';
  loadData(fileList).then(() => {
    loading.value = '';
  });
};

const onScroll = (scrollBottom: number) => {
  if (scrollBottom < 50) {
    onLoad();
  }
};
</script>

<template>
  <Navbar title="文件" />

  <t-dialog
    v-model:visible="showDialog"
    :title="`${uploading_file} 正在上传...`"
    :close-on-overlay-click="false"
  >
    <t-progress :percentage="percentage" />
  </t-dialog>

  <div class="file">
    <span class="tip">注意：每次只能上传一个文件</span>

    <div class="upload-btn">
      <var-uploader v-model="files" maxlength="1">
        <div></div>
      </var-uploader>

      <t-upload
        v-model="files"
        :multiple="false"
        :useMockProgress="true"
        :mockProgressDuration="10"
        :max="1"
        accept="all"
        :on-select-change="onSelectChange"
        action="http://localhost:3000/file"
        :headers="{
          authorization: userStore.token,
        }"
        :on-success="success"
        :on-fail="onFail"
        :on-progress="onProgress"
      >
        <button style="width: 90vw; height: 45px">点此上传文件</button>
      </t-upload>
    </div>
    <h3 style="margin: 50px 10px 10px">最近上传</h3>

    <!-- 文件列表 -->
    <t-list :async-loading="loading" @scroll="onScroll">
      <van-cell
        v-for="item in fileList.slice(0, number)"
        :key="item.id"
        :title="item.name"
        icon="shop-o"
        center
        clickable
      >
        <template #icon>
          <van-icon
            size="26"
            style="margin-right: 10px"
            :name="parseFileIcon(item.type)"
          />
        </template>

        <template #title>
          <div
            style="width: 250px; text-decoration: underline"
            @click="preview(item)"
          >
            {{ item.name }}
          </div>
          <div>
            By:
            <van-tag color="#ffe1e1" text-color="#ad0000">
              {{ item.user.nickname }}</van-tag
            >
          </div>
          <div style="font-size: 12px">
            Time：{{ formatTime(item.createTime) }}

            <span style="margin-left: 20px"
              >Size：{{ transFileSize(item.size) }}</span
            >
          </div>
        </template>
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <a :href="item.url" :download="item.name">
            <span>{{ item.download }}</span>
            <van-icon name="down" style="color: rgb(0, 0, 255)" />
          </a>
        </template>
      </van-cell>

    </t-list>

    <div class="file-list">
    
    </div>
  </div>
</template>

<style lang="less" scoped>
.file {
  padding-bottom: 60px;
  .tip {
    display: block;
    margin-top: 5px;
    padding-left: 5px;
    font-size: 16px;
    color: #666;
  }
  :deep(.upload-btn) {
    margin-top: 10px;
    .t-upload {
      .t-upload__item {
        display: none !important;
      }
    }
  }
}
</style>
