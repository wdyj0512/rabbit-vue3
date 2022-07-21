<script lang="ts" setup name="LoginForm">
import { ref, watch } from 'vue';
import XtxCheckbox from '@/components/checkbox/index.vue'
import Message from '@/components/message/message';
import useStore from '@/store';
import { useRouter } from 'vue-router';
import {useField,useForm} from 'vee-validate'
import { accountRule, codeRule, isAgreeRule, mobileRule, passwordRule } from '@/utils/validate';
const router = useRouter()
const active = ref<'account' | 'mobile'>('account')
const {user} = useStore()
// const form = ref({
//   account:'',
//   password:'',
//   isAs:false
// })
const hMessage = async()=>{
//  Message({type:'success',text:'我是你爹',duration:1000})
  // if (form.value.account === '') {
  //   Message({ type: 'error', text: '用户名或手机号不能为空' })
  //   return
  // }
  // if (form.value.password === '') {
  //   Message({ type: 'error', text: '密码不能为空' })
  //   return
  // }
  // if (!form.value.isAs) {
  //   Message({ type: 'error', text: '请同意许可' })
  //   return
  // }
  const res = await validate()
  if (active.value === 'account') {
    // 如果表单校验通过
    if (res.errors.account || res.errors.password || res.errors.isAs) return
    await user.login({account:account.value,password:password.value})
  } else {
    if (res.errors.mobile || res.errors.code || res.errors.isAs) return
    await user.mobileLogin(mobile.value, code.value)
  }
    Message.success('登录成功')
    router.push('/')
}
const {validate,resetForm} = useForm({
  validationSchema:{
    account: accountRule,
    password: passwordRule,
    isAgree: isAgreeRule,
    mobile: mobileRule,
    code: codeRule
  },
    initialValues: {
    mobile: '13666666666',
    code: '123456',
    account: 'xiaotuxian001',
    password: '123456',
    isAs: true
  }
})
const {value:account, errorMessage:accountMessage} = useField<string>('account')
const {value:password, errorMessage:passwordMessage} = useField<string>('password')
const {value:isAs, errorMessage:isAsMessage} = useField<boolean>('isAs')
const {value:mobile, errorMessage:mobileMessage,validate: validateMobile} = useField<string>('mobile')
const {value:code, errorMessage:codeMessage} = useField<string>('code')
watch(active,()=>resetForm())
const mobileRef = ref<HTMLInputElement | null>(null)
const mobiles = ref<HTMLInputElement | null>(null)
const timer = ref(0)
const send = async()=>{
  const res = await validateMobile()
    if (!res.valid) {
      // 校验没通过
      mobiles.value?.focus()
      return 
    }
      await user.sendMobileMsg(mobile.value)
      Message.success('获取验证码成功')
      mobileRef.value?.focus()

  if(timer.value>0) return
  timer.value = 60
  const timeId = setInterval(()=>{
    timer.value--
    if(timer.value===0){
      clearInterval(timeId)
    }
  },1000)
 
}
</script>
<template>
  <div class="account-box">
    <div class="toggle">
      <a @click="active = 'account'" href="javascript:;" v-if="active === 'mobile'">
        <i class="iconfont icon-user"></i> 使用账号登录
      </a>
      <a @click="active = 'mobile'" href="javascript:;" v-else>
        <i class="iconfont icon-msg"></i> 使用短信登录
      </a>
    </div>
    <div class="form">
      <template v-if="active === 'account'">
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input v-model="account" type="text" placeholder="请输入用户名或手机号" />
          </div>
          <div class="error" v-if="accountMessage"><i class="iconfont icon-warning" />{{accountMessage}}</div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-lock"></i>
            <input v-model="password" type="password" placeholder="请输入密码" />
          </div>
          <div class="error" v-if="passwordMessage"><i class="iconfont icon-warning" />{{passwordMessage}}</div>
        </div>
      </template>
      <template v-else>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-user"></i>
            <input ref="mobiles" v-model="mobile" type="text" placeholder="请输入手机号" />
          </div>
          <div class="error" v-if="mobileMessage"><i class="iconfont icon-warning" />{{mobileMessage}}</div>
        </div>
        <div class="form-item">
          <div class="input">
            <i class="iconfont icon-code"></i>
            <input ref="mobileRef" v-model="code" type="text" placeholder="请输入验证码" />
            <span  class="code" @click="send">
            {{timer===0?'请发送验证码':`${timer}s后获取`}}
            </span>
          </div>
          <div class="error" v-if="codeMessage"><i class="iconfont icon-warning" />{{codeMessage}}</div>
        </div>
      </template>
      <div class="form-item">
        <div class="agree">
         
          <span><XtxCheckbox v-model="isAs" :label="'我已同意'" /></span>
          <a href="javascript:;">《隐私条款》</a>
          <span>和</span>
          <a href="javascript:;">《服务条款》</a>
        </div>
        <div class="error" v-if="isAsMessage"><i class="iconfont icon-warning" />{{isAsMessage}}</div>
      </div>
      <a href="javascript:;" class="btn"  @click="hMessage" >登录</a>
    </div>
    <div class="action">
   <a
  href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&amp;response_type=token&amp;scope=all&amp;redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback"
  ><img
    src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
    alt="QQ登录"
    border="0"
/></a>
      <div class="url">
        <a href="javascript:;">忘记密码</a>
        <a href="javascript:;">免费注册</a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
// 账号容器
.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;
    a {
      color: @xtxColor;
      i {
        font-size: 14px;
      }
    }
  }
  .form {
    padding: 0 40px;
    &-item {
      margin-bottom: 28px;
      .input {
        position: relative;
        height: 36px;
        > i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }
        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;
          &.error {
            border-color: @priceColor;
          }
          &.active,
          &:focus {
            border-color: @xtxColor;
          }
        }
        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }
      > .error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: @priceColor;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }
    .agree {
      a {
        color: #069;
      }
    }
    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: @xtxColor;
      &.disabled {
        background: #cfcdcd;
      }
    }
  }
  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      cursor: pointer;
    }
    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}
</style>
