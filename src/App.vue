<script setup lang="ts">
import type { RouterView } from 'vue-router';
import Tabbar from './components/Tabbar.vue';


</script>

<template>
  <div id="app">
    <RouterView></RouterView>
    <Tabbar v-show="$route.meta?.showTabbar !==false"/>
  </div>
</template>

<style lang="less">
#app {
  font-size: .16rem;
  height: 100%;
}

</style>