<script lang="ts" setup>
import useStore from '@/store/index'
import { ref, watchEffect } from 'vue';
import {useRoute} from 'vue-router'
import GoodsImage from './components/goods-image.vue'
import GoodsSales from './components/goods-sales.vue';
import GoodsName from './components/goods-name.vue';
import GoodsSku from './components/goods-sku.vue';

const route = useRoute()
const {goods} = useStore()
watchEffect(()=>{
    if(route.fullPath !== "/goods/" + route.params.id) return 
    goods.resetGoodsInfo()
    goods.getGoodsInfo(route.params.id as string)
})
// console.log(route.fullPath);
const hChangeSku = (id:string)=>{
  const sku = goods.info.skus.find((item) => item.id === id)
  if (sku) {
    
    goods.info.price = sku.price
    goods.info.oldPrice = sku.oldPrice
  }
}
const count = ref(1)
</script>
<template>
  <div class="xtx-goods-page">
    <div class="container">
      <!-- 面包屑 -->
   <transition>
     <div v-if="goods.info.categories">
          <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="`/category/${goods.info.categories[1].id}`">{{goods.info.categories[1].name}}</XtxBreadItem>
        <XtxBreadItem :to="`/category/sub/${goods.info.categories[0].id}`">{{goods.info.categories[0].name}}</XtxBreadItem>
        <XtxBreadItem >{{goods.info.name}}</XtxBreadItem>
      </XtxBread>
    </div>
    <div v-else>
         <XtxBread >
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>
          <XtxSkeleton :width="28" :height="19" animated/>
        </XtxBreadItem>
        <XtxBreadItem>
        <XtxSkeleton :width="56" :height="19" animated/>
        </XtxBreadItem>
          <XtxBreadItem>
        <XtxSkeleton :width="186" :height="19" animated/>
        </XtxBreadItem>
      </XtxBread>
    </div>
   </transition>
      <!-- 商品信息 -->
      <div class="goods-info">
     <div class="media">
        <GoodsImage v-if="goods.info.mainPictures" :images="goods.info.mainPictures"/>
        <GoodsSales/>
     </div>
     <div class="spec">
      <GoodsName :goods="goods.info" />
      <GoodsSku v-if="goods.info.skus" :goods="goods.info" sku-id="1369155864430120962" @change-sku="hChangeSku"/>
      <XtxNumbox v-model="count" showLabel :min="1" :max="999" />
      <XtxButton type="primary" style="margin-top:20px ;">加入购物车</XtxButton>
     </div>
     </div>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>