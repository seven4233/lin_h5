<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import { ref } from "vue";

const loginForm = ref({
  mobile:'',
  sms:''
})
const emits = defineEmits(['changeToAccount'])
const changeToAccount = ()=>{
    emits('changeToAccount', 'account')
}
</script>

<template>
  <Navbar title="登录注册" leftArrow leftText="返回" />

    <div class="login">
      <p class="input-container">
        <label class="area-box "><span class="area_code">+86</span>
          <i class="area_icon"></i>
        </label>
        <input v-model="loginForm.mobile" placeholder="请输入手机号" type="tel"
          class="acc-input mobile " />
          <i class="icon icon-clear" :style="{display: loginForm.mobile.length?'block':'none'}"></i>
      </p>
      <p class="input-container" style="overflow: inherit">
        <input id="authcode" v-model="loginForm.sms" maxlength="6" placeholder="请输入收到的验证码" type="tel" autocomplete="off"
          class="acc-input  authcode" />
        <i class="icon icon-clear mobile-clear" :style="{display: loginForm.sms.length?'block':'none'}"></i>
        <button class="getMsg-btn text-btn timer active">
          获取验证码
        </button>
      </p>
      <div v-show="false" class="notice"></div>

      <!-- 登陆按钮 -->
      <a class="btn btn-active">登 录</a>

      <p class="quick-btn">
        <span class=" planBLogin" @click="changeToAccount">账号密码登录</span>
        <!-- <span class=" quickReg">手机快速注册</span> -->
      </p>

      <p class="policy_tip"><input type="checkbox" class="policy_tip-checkbox">
        <span>我已阅读并同意</span> <a data-v-68a4521d="" href="https://in.m.jd.com/help/app/register_info.html">《用户服务协议》</a> <a
          data-v-68a4521d="" href="https://in.m.jd.com/help/app/private_policy.html">《用户隐私政策》</a>
        <span>，未注册的手机号将自动创建账号</span>
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
      right: 0.12rem;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAHlBMVEUAAADMzMzNzc3Nzc3Nzc3MzMzMzMzPz8/Ozs7Nzc2Z5bCdAAAACnRSTlMA/lXB0M9LSiopP4KJtgAAAH5JREFUOMtjGAWkgslhMFapBYqEoaAChMEkKIwiESgoBGEoCoqgSBQKCipANAiKwQWhAkJgDSAFcAATgcljaIFJY2qByGLRAtWAqQWqAVMLVAOmFoQGwhIIowhZTti5CA8SDBLMQCQu2BNxRZQjWtQSTgyTw2GsEguGUUAiAAAoUA/JvBWTsAAAAABJRU5ErkJggg==);
    }

    .mobile-clear {
      right: 1.2rem;
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
  .policy_tip{
    text-align: center;
    font-size: .13rem;
    color: rgba(0,0,0,.3);
    margin-top: 0.25rem;
    .policy_tip-checkbox{
      background-color: #fff;
      display: inline-block;
      vertical-align: text-top;
      margin-right: .04rem;
    }
  }
}
</style>
