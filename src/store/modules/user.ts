import { ApiRes, Profile } from '@/types/data'
import request from '@/utils/request'
import { defineStore } from 'pinia'
export default defineStore('user',{
    state(){
        return{
          profile:{} as Profile
        }
    },
    actions:{
        async login(data:{account:string,password:string}){
            const res = await request.post<ApiRes<Profile>>('/login',data)    
            this.profile = res.data.result
        },
       async sendMobileMsg(mobile: string) {
        await request.get('/login/code', {
          params: {
            mobile
          }
        })
      }
    },
    
})