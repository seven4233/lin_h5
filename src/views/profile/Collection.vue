<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getFavorListAPI } from '@/apis/user';

import Navbar from '@/components/Navbar.vue';


const getFavorList = async()=>{
    let res = await getFavorListAPI()
    console.log(res);
    
}
onMounted(()=>{
    getFavorList()
})
</script>

<template>
    <Navbar title="收藏列表"/>

    <div>
        <h2>题目</h2>
        
        collect
    </div>
</template>

