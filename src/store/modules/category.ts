import {defineStore} from 'pinia'
import request from '@/utils/request'
import { ApiRes, CategoryItem, SubCategory, TopCategory } from '@/types/data'
import {topCategory} from '../constants'
const jiashuju = topCategory.map(item => ({name:item}))
export default defineStore('category',{
    state(){
        return{
       list:jiashuju as CategoryItem[],
       topCategorylist:{} as TopCategory,
       subCategory:{}as SubCategory
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
     },
    async getTopcategory(id:string){
       const res = await request.get<ApiRes<TopCategory>>('/category',{
        params:{
            id
        }
       })
        this.topCategorylist = res.data.result
     },
     async getSubCategory(id:string){
        const res = await request.get<ApiRes<SubCategory>>('/category/sub/filter',{
            params:{
                id
            }
        })
        this.subCategory = res.data.result
     },
     resetCategory(){
        this.subCategory = {} as SubCategory
     }
    },
    getters:{

    }
})