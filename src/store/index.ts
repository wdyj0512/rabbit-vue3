import useCategory from './modules/category'
import useHomeStore from './home'
export default function useStore(){
    return {
        category: useCategory(),
        home:useHomeStore()
    }
}