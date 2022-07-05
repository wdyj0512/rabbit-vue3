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
        this.list = res.data.result
     }     
    },
    getters:{

    }
})