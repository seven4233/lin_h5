<script setup lang="ts">
import {useUserStore} from '@/stores/userStore'

const userStore = useUserStore()

const props = defineProps({
    item: {
        type: Object,
        default: ()=>({})
    }
})

</script>

<template>
    <div class="question-item" @click="$router.push('')">

        <div class="top">

            <div class="from"> 
                <van-tag color="#ffe1e1" text-color="#ad0000">{{ item.bank?.name }}</van-tag>
            </div>
            <div class="type"> 
                <van-tag type="primary">{{ item.type }}</van-tag>
            </div>
        </div>
      

   
        <div class="name">
            <van-text-ellipsis
                rows="1"
                :content="item.name"
                expand-text="展开"
                collapse-text="收起"
                />
        </div>

        <!-- action 区域 -->
        <!-- <div class="action">
            <div>题号：{{ item.question_num }}</div>
            <div> 难度：{{ item.level }}</div>

        </div> -->
    </div>
</template>

<style lang="less" scoped>

.question-item{
    border: 1px solid #cdcdcd;
    box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, .1);
    font-size: 12px;
    padding: 8px 5px;
    margin: 5px 0;

    .action {
        margin-top: 4px;
        display: flex;
    }
    .top {
        display: flex;
        justify-content: space-between;

    }

    .name {
        font-size: 16px;
        color: #666;
        margin-top: 2px;
    }

}

</style>