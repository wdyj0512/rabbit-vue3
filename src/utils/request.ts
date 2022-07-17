import Message from '@/components/message/message'
import axios, { AxiosError } from 'axios'

// 备用接口地址: http://pcapi-xiaotuxian-front-devtest.itheima.net/
// 备用接口地址: http://pcapi-xiaotuxian-front.itheima.net/
const instance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net/',
  timeout: 10000
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config
  },
  function (error:AxiosError<{message:string,code:string}>) {
    // 对请求错误做些什么
    if (!error.response) {
      Message.error('网络异常，请稍后重置')
    } else {
      Message.error(error.response.data.message)
    }
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default instance