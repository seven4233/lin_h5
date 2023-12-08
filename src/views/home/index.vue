<script setup lang="ts">
import { getBankListAPI } from '@/apis/bank';
import { onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue';
import { ref } from 'vue';
import Bank from './components/Bank.vue';

const bankList = ref([])
onMounted(()=>{ 
  


})

</script>

<template>
  <Navbar title="首页" />
  <Bank/>
</template>