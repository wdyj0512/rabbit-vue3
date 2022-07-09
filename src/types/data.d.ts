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
export interface Result {
  id: string;
  imgUrl: string;
  hrefUrl: string;
  type: string;
}
export interface newlist {
  id: string;
  name: string;
  desc: string;
  price: string;
  picture: string;
  discount?: any;
  orderNum: number;
}
export interface hotlist {
  id: string;
  picture: string;
  title: string;
  alt: string;
}
export type BrandItem = {
  id: string
  name: string
  nameEn: string
  logo: string
  picture: string
  type?: any
  desc: string
  place: string
}
// 首页商品推荐
export type HomeProduct = {
  id: string
  name: string
  picture: string
  saleInfo: string
  children: {
    id: string
    name: string
  }[]
  goods: {
    id: string
    name: string
    desc: string
    price: string
    picture: string
    discount?: any
    orderNum: number
  }[]
}
export interface SpecialItem {
  creator: string;
  isDelete: number;
  createTime: string;
  updateTime: string;
  id: string;
  classificationId: string;
  title: string;
  summary: string;
  lowestPrice: number;
  cover: string;
  detailsUrl: string;
  collectNum: number;
  viewNum: number;
  replyNum: number;
}
export interface TopCategory  {
  id: string
  name: string
  picture: string
  children: CategoryItem[]
}
