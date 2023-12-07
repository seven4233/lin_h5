<script setup lang="ts">
import { ref } from 'vue';
import LoginAccount from './LoginAccount.vue';
import LoginMobile from './LoginMobile.vue';

const loginType = ref('mobile')

const changeTo = (value:any)=>{
  loginType.value = value
}
</script>

<template>
 
  <LoginAccount @changeToMobile ="changeTo" v-if="loginType==='mobile'"/>
  <LoginMobile @changeToAccount="changeTo" v-else/>

</template>

<style lang="less" scoped>

</style>
