<script setup lang="ts">
import { loginAPI, getUserInfoAPI } from "@/apis/user";
import Navbar from "@/components/Navbar.vue";
import { ref } from "vue";
import { useUserStore } from '@/stores/userStore'
import { showSuccessToast, showLoadingToast, showFailToast } from 'vant';
import { useRouter } from "vue-router";

const userStore = useUserStore()
const showPass = ref(false)

const loginForm = ref({
    account: '',
    password: ''
})
const emits = defineEmits(['changeToMobile'])

const changTo = () => {
    emits('changeToMobile', 'mobile')
}

const changeEye = () => {
    showPass.value = !showPass.value
}

const router = useRouter()
// login
const login = async () => {
    const res = await loginAPI('account', loginForm.value)
    if (res.code === 0) {
        userStore.setToken(res.token)

        const userInfo = await getUserInfoAPI()
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
            duration: 1000,
            forbidClick: true,
            message: res.message,
        });
    }


}

</script>

<template>
    <Navbar title="登录注册" leftArrow leftText="返回" />

    <div class="login">
        <p class="input-container">
            <input id="username" v-model="loginForm.account" maxlength="11" placeholder="请输入账号（手机号）" type="text"
                autocomplete="off" class="acc-input username ">
            <i class="icon icon-clear" :style="{ display: loginForm.account.length ? 'block' : 'none' }"></i>
        </p>

        <p class="input-container">
            <input id="pwd" v-model="loginForm.password" placeholder="请输入密码" :type="showPass ? 'text' : 'password'"
                autocomplete="off" class="acc-input pwd " style="padding-right: 1.8rem;">
            <i class="icon icon-clear pwd-clear" :style="{ display: loginForm.password.length ? 'block' : 'none' }"></i>
            <!-- 控制 off-pwd控制眼睛开关 -->
            <span class="checkbtn" :class="{ 'off-pwd': showPass }" @click="changeEye"></span>
        </p>
        <div v-show="false" class="notice"></div>
        <!-- 登陆按钮 -->
        <a class="btn btn-active" @click="login">登 录</a>

        <p class="quick-btn">
            <span class="planBLogin" @click="changTo">短信验证码登录</span>
        </p>

        <p class="policy_tip"><input type="checkbox" class="policy_tip-checkbox">
            <span>我已阅读并同意</span> <a data-v-68a4521d="" href="https://in.m.jd.com/help/app/register_info.html">《用户服务协议》</a>
            <a data-v-68a4521d="" href="https://in.m.jd.com/help/app/private_policy.html">《用户隐私政策》</a>
        </p>
    </div>
</template>

<style lang="less" scoped>
.login {
    text-align: left;
    background: #fff;
    padding: 0 0.25rem 0.25rem;

    .input-container {
        position: relative;
        height: 0.5rem;
        padding-top: 0.1rem;
        padding-bottom: 0.1rem;
        overflow: hidden;
        margin-top: 0.1rem;
        background: #fff;
        border-bottom: 0.01rem solid #efefef;

        .checkbtn {
            position: absolute;
            right: 0.13rem;
            top: 0.13rem;
            width: 0.24rem;
            height: 0.24rem;
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAUVBMVEUAAADNzc3Ozs7W1tbNzc3Pz8/Nzc3MzMzNzc3MzMzNzc3Nzc3Nzc3Nzc3Nzc3MzMzNzc3Nzc3MzMzNzc3Ozs7Nzc3Ozs7R0dHX19f////MzMxg+QCeAAAAGnRSTlMA+zoKaiT28One25uCfXPIt6eRTD4zKiETA+EbngEAAACZSURBVEjH7czHDsMgEEXRoYMxuLf5/w8NJIvIlEjJLhJned9ooGma5je0p1+NG0GyQMUSxi1pHhGVgCKhwuiTuJMQjSjemzCRPc0cA00hQzUGPB9s7GRm98pmEruF3GUx0u58t9NpjOwFJQ6f5OjpwdhB/ShfxUHF2mFBt0IV6xUmVM/gE8a723eenecEnwYjpRkmLqBp/tgDwI4Nr7IO2JwAAAAASUVORK5CYII=);
            background-repeat: no-repeat;
            background-size: 100% auto;
            z-index: 99;
        }

        .off-pwd {
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAV1BMVEUAAADNzc3Q0NDNzc3Nzc3Nzc3Ozs7X19fNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Ozs7Pz8/Pz8/Nzc3MzMzNzc3MzMzMzMzNzc3Ozs7Ozs7Ozs7V1dXNzc3MzMxIIVLAAAAAHHRSTlMA9RjJwmlkCO7oz72kfFQ1Iory2qt5bVg+KRKJvRKyKgAAAOlJREFUSMftVNcShCAMvAh2VLC3///OgwNGsN3kWffJJLtOGvm8eC6CiNEGoKEsCv6z4zBbHWRhfE/v03WHtL+RTNl6gmy64oegGbQbeRzzsaPahvCcX+ioCJz6hf5Hcc1ns++d2ZWiVP56OAaGWkXKQ/MT6U0qY0UEgETGqH6h/UhalX5lxLkuNg+MQhXS+nyuCLYZkm8Utn3K4J5ASA+x+WwjsFkR+S08AXXqIpuAOB2hnkBthC0LNgHYlqgdQQvQKaGLxrcVPzj8auCXD7/eR0W9uA9oAc3HPlHsEcCeGeQhQ57KF4/FFwhjLcIUtz4iAAAAAElFTkSuQmCC);
        }

        .area-box {
            position: absolute;
            width: 0.72rem;
            height: 0.5rem;
            top: 0;
            left: 0;
            line-height: 0.5rem;

            span {
                font-family: PingFangSC-Semibold;
                display: inline-block;
                text-align: center;
                width: 0.5rem;
            }

            .area_icon {
                position: absolute;
                top: 0.22rem;
                right: 0.08rem;
                width: 0.14rem;
                height: 0.06rem;
                overflow: hidden;
                background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAMCAYAAABx290PAAAABGdBTUEAALGPC/xhBQAAAU9JREFUOBGtVC1PxEAQ7R5JqzBVNYSkVU3gX5wBfgEaAniCwuIIHsjpQ6Jwx09AIZo0aRPAU4Fqk7a8d3TIHHfXj4Q1Mzsfb/btvtb4vr9vjLm1ftZVkiT3jf8vJgiCUwBdEqyu6zODwDucLYU+cxznOIqiNxUb7IZhuJ3n+QSNY2kGsY+RbJQdF0Xx2pxMhfu77CUGOn6HSbfBlR5g8gNYbkpQ2UFsV7ESLMz4wozDUZqmT7Zt7yIxk6Syvdm2sSI2Z3CWUeBWc43XQ9h2sQL+BYR4J3M2xKHNsuzF87xpWZY72Po6x31VVUeu636yjjkeELWPcEPu/yw+x14cx886vsBQJ7rYNrXLosBbIbfASuOuHciituvSIMrvFFnrQAHqYGtRgahdy0pwaFd9hzo/9/noLUqeK1ALYwlABXoxVPUUyglUfM4YmN0M/RV+A2uMnQpiFNqoAAAAAElFTkSuQmCC);
                background-repeat: no-repeat;
                background-size: 100% auto;
                display: inline-block;
                margin-left: 0.06rem;
            }
        }

        .acc-input {
            height: 100%;
            width: 100%;
            box-sizing: border-box;
            padding: 0;
            margin: 0;
        }

        .authcode {
            margin-right: 0.3rem;
        }

        .mobile {
            width: 100%;
            padding-left: 0.7rem;
        }

        .icon {
            position: absolute;
            width: 0.24rem;
            height: 100%;
            background-repeat: no-repeat;
            background-size: 100% auto;
            background-position: 0;
        }

        .icon-clear {
            top: 0;
            right: 0.13rem;
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAHlBMVEUAAADMzMzNzc3Nzc3Nzc3MzMzMzMzPz8/Ozs7Nzc2Z5bCdAAAACnRSTlMA/lXB0M9LSiopP4KJtgAAAH5JREFUOMtjGAWkgslhMFapBYqEoaAChMEkKIwiESgoBGEoCoqgSBQKCipANAiKwQWhAkJgDSAFcAATgcljaIFJY2qByGLRAtWAqQWqAVMLVAOmFoQGwhIIowhZTti5CA8SDBLMQCQu2BNxRZQjWtQSTgyTw2GsEguGUUAiAAAoUA/JvBWTsAAAAABJRU5ErkJggg==);
        }

        .pwd-clear {
            right: 0.6rem;
        }

        button.text-btn,
        button.timer.active {
            border: none;
            border-left: 1px solid #ccc;
            background: #fff;
            border-radius: 0;
            color: #848689;
            padding: 0;
        }

        .text-btn {
            position: absolute;
            right: 0;
            top: 0.125rem;
            height: 0.23rem;
            line-height: .23rem;
            text-align: center;
            border-left: 1px solid #ccc;
            font-size: .14rem;
            min-width: 1rem;
        }

        .getMsg-btn {
            width: 1.1rem;
        }

        .getMsg-btn.active.timer {
            color: #e2231a;
        }
    }

    .btn {
        margin-top: 0.5rem;
        width: 100%;
        height: 0.5rem;
        line-height: .5rem;
        display: block;
        background-color: #efefef;
        border-radius: 0.25rem;
        font-size: .16rem;
        color: #fff;
        background-image: -webkit-gradient(linear, left top, right top, color-stop(0, #fab3b3), color-stop(73%, #ffbcb3), to(#ffcaba));
        background-image: -webkit-linear-gradient(left, #fab3b3, #ffbcb3 73%, #ffcaba);
        background-image: -o-linear-gradient(left, #fab3b3 0, #ffbcb3 73%, #ffcaba 100%);
        background-image: linear-gradient(90deg, #fab3b3, #ffbcb3 73%, #ffcaba);
        -webkit-box-shadow: 0 0.1rem 20px 0 rgba(255, 62, 62, .2);
        box-shadow: 0 0.1rem 20px 0 rgba(255, 62, 62, .2);
        text-align: center;
        font-family: PingFangSC-Semibold;
    }

    .btn-active {
        background-image: linear-gradient(90deg, #f10000, #ff2000 73%, #ff4f18);
    }

    .notice {
        font-size: .14rem;
        color: #f23030;
        min-height: 0.15rem;
        text-align: left;
    }

    .quick-btn {
        color: rgba(0, 0, 0, .4);
        font-size: .14rem;
        margin-top: 0.2rem;
        overflow: hidden;
    }

    .policy_tip {
        text-align: center;
        font-size: .13rem;
        color: rgba(0, 0, 0, .3);
        margin-top: 0.25rem;

        .policy_tip-checkbox {
            background-color: #fff;
            display: inline-block;
            vertical-align: text-top;
            margin-right: .04rem;
        }
    }
}
</style>
