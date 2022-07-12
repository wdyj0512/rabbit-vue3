import useCategory from './modules/category'
import useHomeStore from './home'
import useGoodsInfo from './modules/goods'
export default function useStore(){
    return {
        category: useCategory(),
        home:useHomeStore(),
        goods:useGoodsInfo()
    }
}