<script setup lang="ts">
import { getBankListAPI } from '@/apis/bank';
import { onMounted } from 'vue';
import Navbar from '@/components/Navbar.vue';
import { ref } from 'vue';
import Bank from './components/Bank.vue';

const bankList = ref([])
onMounted(()=>{ 
  
    // fetch('https://www.iccmsm.com:3001/question/bank').then((res)=>{
    //   res.json().then(res=> {
    //     console.log(res);
    //     bankList.value = res
    //   })
    
    // })
  getBankListAPI().then((res:any)=>{
    bankList.value = res
    console.log(res);
  })
})

</script>

<template>
  <Navbar title="夜深人静写代码（首页）" />
  
  <Bank/>
  <div>home</div>
  {{ bankList }}
  <van-button type="primary" >按钮</van-button>
</template>