export interface ApiRes<T> {
   code:string
   msg:string
   result:T
}
export interface CategoryItem{
    id:string
    name:string
    picture:string
    open:boolean
    children:CategoryItem[]
    goods:Good[]
}
export interface Good {
  id: string;
  name: string;
  desc: string;
  price: string;
  picture: string;
  discount?: any;
  orderNum?: any;
}