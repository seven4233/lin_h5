<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import { useRouter } from 'vue-router';

import { useUserStore } from '@/stores/userStore';
const userStore = useUserStore()

const router = useRouter()
const goLogin = () => {
  router.push("/login")
}

const logout = ()=>{
  userStore.clearUserInfo()
}
</script>

<template>
  <div class="profile">
    <Navbar title="个人中心" />
    <div class="base-info" @click="goLogin">
      <div class="avatar">
        <img src="@/assets/images/noLogin.png" alt="">
      </div>
      <div class="nickname" >去登录 <van-icon name="arrow" /></div>
      <div class="icon"></div>
    </div>
    <!-- menu -->
    <ul class="list">
      <li class="item setting">
        <div class="logo">
          <img src="@/assets/icons/setting.png" alt="">
        </div>
        <span>账号设置</span>
        <van-icon name="arrow" class="arrow" />
      </li>

      <li class="item">
        <div class="logo">
          <img src="@/assets/icons/favor.png" alt="">
        </div>
        <span>我的收藏</span>
        <van-icon name="arrow" class="arrow" />
      </li>

      <li class="item"  @click="logout">
        <div class="logo">
          <img src="@/assets/icons/exit.png" alt="">
        </div>
        <span>退出登录</span>
        <van-icon name="arrow" class="arrow" />
      </li>
    </ul>

  </div>
</template>

<style lang="less" scoped>
.profile {
  background: #f0f0f0;
  .base-info {
    background: #fff;
    display: flex;
    align-items: center;
    height: 1rem;
    width: 100%;
    border-bottom: 1px solid #c1c2c3;

    .avatar {
      margin: 10px 0 0 20px;
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background: #fff;
      overflow: hidden;
      border: 1px solid rgba(0, 0, 0, .1);

      img {
        width: 100%;
        height: 100%;
      }
    }

    .nickname {
      margin-left: .1rem;
      color: #000;
      font-weight: 700;
    }
  }

  .list {
    margin-top: .15rem ;
    background: #f0f0f0;
    border-top: 1px solid #c2c2c2;
    
    .item {

      border-bottom: 1px solid #c2c2c2;
      background: #fff;
      position: relative;
      padding: .03rem .1rem;
      display: flex;
      align-items: center;
      font-size: .2rem;
      height: .5rem;
      .logo {
        transform: translateY(.03rem);
        width: .3rem;
        margin-right: .1rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .arrow {
        position: absolute;
        right: 0.12rem;
      }
    }
    .setting{
      margin-bottom: .15rem;
      border-bottom: 1px solid #c2c2c2;
    }
  }
}
</style>