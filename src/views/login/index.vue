<script lang="ts" setup name="Login">
import LoginHeader from './components/login-header.vue'
import LoginFooter from './components/login-footer.vue'
import { ref } from 'vue';
import LoginForm from './components/login-form.vue';
const active = ref<'acount'| 'qrcode'>('acount')
</script>
<template>
  <LoginHeader>欢迎登录</LoginHeader>
  <section class="login-section">
    <div class="wrapper">
      <nav>
        <a @click="active = 'acount'" href="javascript:;">账户登录</a>
        <a @click="active = 'qrcode'" href="javascript:;">扫码登录</a>
      </nav>
       <div v-if="active==='acount'" class="account-box">
       <LoginForm/>
       </div>
    <!-- 二维码 -->
    <div v-else class="qrcode-box">
      <img src="@/assets/images/qrcode.jpg" alt="" />
      <p>打开 <a href="javascript:;">小兔鲜App</a> 扫码登录</p>
    </div>
    </div>
  </section>
  <LoginFooter />
</template>

<style scoped lang="less">
.login-section {
  background: url(@/assets/images/login-bg.png) no-repeat center / cover;
  height: 488px;
  position: relative;
  .qrcode-box {
  text-align: center;
  padding-top: 40px;
  p {
    margin-top: 20px;
    a {
      color: @xtxColor;
      font-size: 16px;
    }
  }
}
  .wrapper {
    width: 380px;
    background: #fff;
    min-height: 400px;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    nav {
      height: 55px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;
      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        &:first-child {
          border-right: 1px solid #f5f5f5;
          text-align: left;
        }
        &.active {
          color: @xtxColor;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
