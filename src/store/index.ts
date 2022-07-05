import useCategory from './modules/category'
export default function useStore(){
    return {
        category: useCategory()
    }
}