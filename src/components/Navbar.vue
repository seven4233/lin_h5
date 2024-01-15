<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter()

const onClickLeft = () => {
  if(props.leftFn){
    props.leftFn()
  }else {
    router.push('/')
  }
}

const props =  defineProps({
  leftText: {
    type: String,
  },
  leftFn:{
    type: Function
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
  <div class="navbar" >
    <van-nav-bar :title="title" :left-text="leftText" :left-arrow=leftArrow @click-left="onClickLeft" />
  </div>

</template>
<style lang="less">

.navbar {
  position: sticky;
  z-index: 99999;
  top: 0;
  left: 0;
  right: 0;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1); /* 添加底部阴影效果 */
  
}

</style>