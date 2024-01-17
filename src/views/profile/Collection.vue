<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getFavorListAPI } from '@/apis/user';
import {useUserStore} from '@/stores/userStore'
import Navbar from '@/components/Navbar.vue';
import QuestionItem from '@/components/QuestionItem.vue'

const userStore = useUserStore()

onMounted(()=>{
    userStore.getFavorList()
})
</script>

<template>
    <Navbar title="收藏列表"/>

    <div>
        <h2>题目</h2>
        <template v-for="item in userStore.favorList" :key="item.id">
            <QuestionItem :item="item"/>
        </template>  
    </div>
</template>

