import {defineStore} from 'pinia'
import request from '@/utils/request'
import { ApiRes, BrandItem, HomeProduct, hotlist, newlist, Result, SpecialItem } from '@/types/data'
export default defineStore('home',{
    state(){
        return{
         bannerlist:[] as Result[],
         newLsit:[] as newlist[],
         hotlist:[] as hotlist[],
         brandList: [] as BrandItem[],
         productlist:[] as HomeProduct[],
         speciallist:[] as SpecialItem[]
        }
    },
    actions:{
       async getBannerList(){
           const res= await request.get<ApiRes<Result[]>>('/home/banner')
           this.bannerlist = res.data.result
        },
        async getNewlist(){
            const res = await request.get<ApiRes<newlist[]>>('/home/new')
            this.newLsit = res.data.result
        },
        async getHotlist(){
            const res = await request.get<ApiRes<hotlist[]>>('/home/hot')
            this.hotlist = res.data.result
        },
        async getBrandList() {
            const res = await request.get<ApiRes<BrandItem[]>>('/home/brand')
            this.brandList = res.data.result
          },
          async getProductList(){
            const res = await request.get<ApiRes<HomeProduct[]>>('/home/goods')
            this.productlist = res.data.result
            console.log(res.data.result);
          },
          async getSpecialList(){
            const res = await request.get<ApiRes<SpecialItem[]>>('/home/special')
            this.speciallist =res.data.result
          }
    },
    getters:{

    }
})