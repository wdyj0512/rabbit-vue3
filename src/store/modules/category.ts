import {defineStore} from 'pinia'
import request from '@/utils/request'
import { ApiRes, CategoryItem } from '@/types/data'
import {topCategory} from '../constants'
const jiashuju = topCategory.map(item => ({name:item}))
export default defineStore('category',{
    state(){
        return{
       list:jiashuju as CategoryItem[]
        }
    },
    actions:{
    async getCategoryList(){
        const res = await request.get<ApiRes<CategoryItem[]>>('/home/category/head')
            res.data.result.forEach(item=>item.open = false)
            this.list =res.data.result
     },
     show(id:string){
        const item = this.list.find(item=>item.id===id)
       item &&(item.open= true)
     } ,
     hide(id:string){
        const item = this.list.find(item=>item.id===id)
        item &&(item.open= false)
     }
    },
    getters:{

    }
})