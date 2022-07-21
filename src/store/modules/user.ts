import { ApiRes, Profile } from '@/types/data'
import request from '@/utils/request'
import { getProfile, removeProile, setProfile } from '@/utils/storage'
import { defineStore } from 'pinia'
export default defineStore('user',{
    state(){
        return{
          profile:getProfile() as Profile
        }
    },
    actions:{
        async login(data:{account:string,password:string}){
            const res = await request.post<ApiRes<Profile>>('/login',data)    
            this.profile = res.data.result
            setProfile(res.data.result)
        },
       async sendMobileMsg(mobile: string) {
        await request.get('/login/code', {
          params: {
            mobile
          }
        })
      },
      async mobileLogin(mobile: string, code: string) {
        const res = await request.post<ApiRes<Profile>>('/login/code', {
          mobile,
          code
        })
        // 1. 保存用户信息到 state 中
        this.profile = res.data.result
        setProfile(res.data.result)
      },
      logout(){
        removeProile()
        this.profile={} as Profile
      },
      async qqLogin(data: { unionId: string, source: number }) {
        const res = await request.post<ApiRes<Profile>>('/login/social', data)
        this.profile = res.data.result
        setProfile(res.data.result)
      }
    }
    
    
})