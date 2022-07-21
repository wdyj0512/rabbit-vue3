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
export type SaleProperty = {
  id: string
  name: string
  properties: {
    id: string
    name: string
  }[]
}
export type SubCategory = {
  id: string
  name: string
  picture?: any
  parentId: string
  parentName: string
  brands: {
    id: string
    name: string
    nameEn: string
    logo: string
    picture: string
    type?: any
    desc: string
    place: string
  }[]
  saleProperties: SaleProperty[]
  goods: Good[]
}
// 商品模块的类型声明
export type GoodsInfo = {
  id: string
  name: string
  spuCode: string
  desc: string
  price: string
  oldPrice: string
  discount: number
  inventory: number
  salesCount: number
  commentCount: number
  collectCount: number
  mainVideos: any[]
  videoScale: number
  mainPictures: string[]
  isPreSale: boolean
  isCollect?: any
  recommends?: any
  userAddresses?: any
  evaluationInfo?: any
  categories: {
    id: string
    name: string
  }[]
  specs:spec[]
  skus: Sku[]
  details: GoodsDetail
}
export type spec = {
  name:string
  values:valueItem[]
}
export type valueItem = {
  desc:string
  name:string
  picture:string
  selected:boolean
  disabled: boolean
}
export type Sku = {
  id: string
  inventory: number
  oldPrice: string
  price: string
  skuCode: string
  specs: {
    name: string
    valueName: string
  }[]
}
type GoodsDetail = {
  pictures: string[]
  properties: {
    name: string
    value: string
  }[]
}
export interface Profile {
  id: string;
  account: string;
  mobile: string;
  token: string;
  avatar: string;
  nickname: string;
  gender: string;
  birthday?: any;
  cityCode: string;
  provinceCode: string;
  profession: string;
}
// QQ信息-用户详情
export interface QQUserInfo {
  ret: number
  msg: string
  is_lost: number
  nickname: string
  gender: string
  gender_type: number
  province: string
  city: string
  year: string
  constellation: string
  figureurl: string
  figureurl_1: string
  figureurl_2: string
  figureurl_qq_1: string
  figureurl_qq_2: string
  figureurl_qq: string
  figureurl_type: string
  is_yellow_vip: string
  vip: string
  yellow_vip_level: string
  level: string
  is_yellow_year_vip: string
}

// QQ返回信息
export interface QQUserInfoRes {
  status: string
  fmt: string
  ret: number
  code: number
  data: QQUserInfo
  seq: string
  dataText: string
}