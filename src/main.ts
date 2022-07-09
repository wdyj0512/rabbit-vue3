import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import '@/assets/styles/common.less'
import router from './router/index'
import {createPinia} from 'pinia'
import MyUI from '@/components'
import defaultImg from '@/assets/images/200.png'
import {useIntersectionObserver} from '@vueuse/core'
const app =createApp(App)
app.use(router)
app.use(createPinia())
app.use(MyUI)
app.mount('#app')
app.directive('lazy', {
    mounted(el: HTMLImageElement, { value }) {
      // 图片的懒加载逻辑
      // 参数1：回调函数
      // 参数2：可选的配置
      const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
        if (isIntersecting) {
          // 停止监听
          stop()
          // 给el元素设置src属性
          // value = '123.jpg'
          el.src = value
          // 如果图片加载失败，显示默认的图片
          el.onerror = function () {
            el.src =  defaultImg
          }
        }
      })
    }
  })