export interface ApiRes<T> {
   code:string
   msg:string
   result:T
}
export interface CategoryItem{
    id:string
    name:string
    picture:string
    children:CategoryItem[]
}