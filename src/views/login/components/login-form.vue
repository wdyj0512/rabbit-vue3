<script lang="ts" setup name="LoginForm">
import { ref, watch } from 'vue';
import XtxCheckbox from '@/components/checkbox/index.vue'
import Message from '@/components/message/message';
import useStore from '@/store';
import { useRouter } from 'vue-router';
import {useField,useForm} from 'vee-validate'
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
  if(!res.valid) return
  try{
  await user.login({account:account.value,password:password.value})
    Message.success('登录成功')
    router.push('/')
  }catch(e){
    Message.error('宝，用户名或密码错了')
  }
}
const {validate,resetForm} = useForm({
  validationSchema:{
    account(value:string){
      if(!value?.trim().length) return '用户名不能为空'
      if (!/^[a-zA-Z]\w{5,19}$/.test(value)) return '字母开头且6-20个字符'
      return true
    },
    password: (value: string) => {
      if (!value) return '请输入密码'
      if (!/^\w{6,12}$/.test(value)) return '密码必须是6-24位字符'
      return true
    },
    isAs: (value: boolean) => {
      if (!value) return '请同意隐私条款'
      return true
    },
   mobile: (value: string) => {
      if (!value) return '请输入手机号'
      if (!/^1[3-9]\d{9}$/.test(value)) return '手机号格式错误'
      return true
    },
    code: (value: string) => {
      if (!value) return '请输入验证码'
      if (!/^\d{6}$/.test(value)) return '验证码格式错误'
      return true
    },
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
  if(timer.value>0) return
  timer.value = 60
  const timeId = setInterval(()=>{
    timer.value--
    if(timer.value===0){
      clearInterval(timeId)
    }
  },1000)
  const res = await validateMobile()
    if (!res.valid) {
      // 校验没通过
      mobiles.value?.focus()
      return 
    }
      await user.sendMobileMsg(mobile.value)
      Message.success('获取验证码成功')
      mobileRef.value?.focus()
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
      <img
        src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
        alt=""
      />
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
