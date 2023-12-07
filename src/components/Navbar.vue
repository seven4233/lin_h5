<script setup lang="ts">
const onClickLeft = () => history.back();

defineProps({
  leftText: {
    type: String,
  },
  leftArrow: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: "标题"
  }
})
</script> 

<template>
  <div class="navbar">
    <van-nav-bar :title="title" :left-text="leftText" :left-arrow=leftArrow @click-left="onClickLeft" />
  </div>

</template>
<style lang="less">


</style>