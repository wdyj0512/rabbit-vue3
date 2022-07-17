import useCategory from './modules/category'
import useHomeStore from './home'
import useGoodsInfo from './modules/goods'
import useUserStore from './modules/user'
export default function useStore(){
    return {
        category: useCategory(),
        home:useHomeStore(),
        goods:useGoodsInfo(),
        user:useUserStore()
    }
}