<script setup lang="ts">
import { watch } from "vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
watch(
  () => route.fullPath,
  (newValue) => {
    if (newValue === "/home") {
      active.value = 0;
    } else if (newValue === "/bank") {
      active.value = 1;
    } else if (newValue === "/file") {
      active.value = 2;
    }else if(newValue === "/profile"){
        active.value = 3;
    }
  },
  { immediate: true }
);

const active = ref(0);

const icon = {
  active: "~@/assets/icons/home_active.png",
  inactive: "~@/assets/icons/home.png",
};
</script>

<template>
  <van-tabbar v-model="active">
    <van-tabbar-item badge="3" icon="wap-home-o" to="/home">
      首页
    </van-tabbar-item>
    <van-tabbar-item icon="search" to="/bank">题库</van-tabbar-item>
    <van-tabbar-item icon="search" to="/file">文件</van-tabbar-item>
    <van-tabbar-item icon="user-o" to="/profile">我的</van-tabbar-item>
  </van-tabbar>
</template>
