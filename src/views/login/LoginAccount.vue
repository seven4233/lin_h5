<script setup lang="ts">
import { loginAPI, getUserInfoAPI } from "@/apis/user";
import Navbar from "@/components/Navbar.vue";
import { ref } from "vue";
import { useUserStore } from '@/stores/userStore'
import { showSuccessToast, showLoadingToast, showFailToast } from 'vant';
import { useRouter } from "vue-router";

const userStore = useUserStore()

const loginForm = ref({
    account: '15860181568',
    password: '123aaa'
})
const emits = defineEmits(['changeToMobile'])


const router = useRouter()
// login
const login = async () => {
    const res = await loginAPI('account', loginForm.value)
    if (res.code === 0) {
        userStore.setToken(res.token)

        const userInfo = await getUserInfoAPI()
        await userStore.getFavorList()
        // const uploadToken = await getUploadToken()
        // console.log(uploadToken);
        userStore.setUserInfo(userInfo)

        //  提示
        const toast = showLoadingToast({
            duration: 1000,
            forbidClick: true,
            message: '登录成功, 正在跳转~~~',
            // type:'success'
            onClose() {
                // 跳转首页
                router.replace('/home')
            }
        });
    }else {
         showFailToast({
            duration: 2000,
            forbidClick: true,
            message: res.message,
        });
    }


}

</script>

<template>
    <Navbar title="登录注册" leftArrow leftText="返回" :leftFn="$router.back" />

    <div class="login">
        <div class="account">
            <input type="text" placeholder="请输入账号" v-model="loginForm.account">
        </div>

        <div class="password">
            <input type="password" placeholder="请输入密码" v-model="loginForm.password">
        </div>

        <!-- 登陆按钮 -->
        <button class="btn" @click="login">登录</button>

        <!-- <p class="quick-btn">
            <span class="planBLogin" @click="changTo">短信验证码登录</span>
        </p> -->

        <!-- <p class="policy_tip"><input type="checkbox" class="policy_tip-checkbox">
            <span>我已阅读并同意</span> <a data-v-68a4521d="" href="#">《用户服务协议》</a>
            <a data-v-68a4521d="" href="#">《用户隐私政策》</a>
        </p> -->
    </div>
</template>

<style lang="less" scoped>
.login {
    margin-top: 20px;
    width: 100%;
    text-align: center;

    .account, .password{
        input {
            width: 300px;
            height: 35px;
            margin: 5px 0 ;
            padding-left: 5px;
        }
        
    }
    .btn {
        margin-top: 10px;

        width: 150px;
        height: 40px;
    }

}

</style>
