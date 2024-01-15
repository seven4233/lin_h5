<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import { RouterView, useRouter } from 'vue-router';
import {parseGender} from '@/utils/tools'
import { useUserStore } from '@/stores/userStore';
import NoLogin from './NoLogin.vue'
import { showConfirmDialog } from 'vant';
import { useRoute } from 'vue-router';
const route = useRoute()
const userStore = useUserStore()


const router = useRouter()
const goLogin = () => {
  router.push("/login")
}

const logout = () => {
  showConfirmDialog({
    title: '提示',
    message:
      '此操作将退出登陆，是否继续？',
  })
    .then(() => {
      userStore.clearUserInfo()
    })
}

</script>

<template>
  <div class="profile" v-if="userStore.token">
    <Navbar title="个人中心" />
    <div class="userinfo">
      <div class="baseinfo avatar">
        <span>头像：</span>
        <img :src="userStore.userInfo?.avatar" alt="">
      </div>
  
      <div class=" baseinfo nickname">
        <span>昵称：</span>
         <p>{{ userStore.userInfo?.nickname }}</p>
      </div>
      <div class="baseinfo gender">
        <span>性别：</span>
        <p>{{ parseGender(userStore.userInfo?.gender) }}</p>
      </div>
      <div class=" baseinfo email">
        <span>邮箱：</span>
         <p>{{ userStore.userInfo?.email ||  "暂无" }}</p>
      </div>
      <div class=" baseinfo phone">
        <span>电话：</span>
         <p>{{ userStore.userInfo?.phone ||  "暂无" }}</p>
      </div>
      <div  class="baseinfo"><span>个性签名：</span>
      <p>{{ userStore.userInfo?.sign || "暂无" }}
      </p></div>
    </div>

    <van-divider />
    <!-- menu -->
    <ul class="list">
      <li class="item setting" @click="$router.push('/profile/setting')">
        <button><van-icon name="setting-o" /><span>账号设置</span></button>
      </li>

      <li class="item"  @click="$router.push('/profile/collect')">
        <button>     <van-icon name="star-o" />
        <span>我的收藏</span></button>
   
      </li>

      <li class="item" @click="logout" >
        <button>
          <van-icon name="close" />
         <span>退出登录</span>
        </button>
      
      </li>
    </ul>
    <RouterView/>

  </div>

  <NoLogin v-else />
</template>

<style lang="less" scoped>
.profile {
  .userinfo {
    .baseinfo{
      font-size: 18px;
      margin: 10px 0;
      p {
        display: inline;
        text-decoration: underline;
        color: #666;
      }
    }
    .avatar{
       img {
        width: 50px;
       }
    }
    

  }

  .list{
    display: flex;
    .item{
      padding-left: 10px;
      font-size: 20px;
      button {
        padding: 0 4px;
        height: 35px;
        line-height: 35px;
      }
   
    }

  }


}</style>