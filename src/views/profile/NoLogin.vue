<script setup lang="ts">

</script>


<template>
  <div class="nologin" style="margin: 10px 10px; font-size: 22px;">
    请登陆后操作!
    <a @click="$router.push('/login')" style="text-decoration: underline;">去登录</a>
  </div>
</template>