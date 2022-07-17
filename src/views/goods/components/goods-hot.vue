<script setup lang="ts">
import { ApiRes, Good } from '@/types/data';
import GoodsItem from '@/views/category/components/goods-item.vue'
import  request  from '@/utils/request';
import { PropType, ref } from 'vue'
import {useRoute} from 'vue-router'
const route = useRoute()
const props = defineProps({
  type: {
    type: Number as PropType<1 | 2 | 3>,
    default: 1,
  },
})

const list = ref<Good[]>([])
 async function getGoodsList(){
    const res = await request.get<ApiRes<Good[]>>('/goods/hot',{
        params:{
            type: props.type,
            id: route.params.id,
        }
    })
   list.value = res.data.result 
}
getGoodsList()
// 标题对象
const titleObj = {
  1: '24小时热销榜',
  2: '周热销榜',
  3: '总热销榜',
}
</script>

<template>
  <div class="goods-hot">
    <h3>{{ titleObj[props.type] }}</h3>
    <div class="goods-list">
      <!-- 商品区块 -->
      <GoodsItem :sub="item" v-for="item in list" :key="item.id" />
    </div>
  </div>
</template>

<style scoped lang="less">
.goods-hot {
  background-color: #fff;
  margin-bottom: 20px;
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  .goods-list {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>