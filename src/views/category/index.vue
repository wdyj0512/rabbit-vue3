<template>
  <div class="container top-category">
    <XtxBread>
    <XtxBreadItem to="/">首页</XtxBreadItem>
    <XtxBreadItem>{{category.topCategorylist.name}}</XtxBreadItem>
  </XtxBread>

  <XtxCarousel :list="home.bannerlist" style="height: 500px;"/>
  <!-- 所有二级分类 -->
<div class="sub-list">
  <h3>全部分类</h3>
  <ul>
    <li v-for="item in category.topCategorylist.children" :key="item.id">
      <a href="javascript:;">
        <img v-lazy="item.picture" >
        <p>{{item.name}}</p>
      </a>
    </li>
  </ul>
</div>
<div v-if="category.topCategorylist.children" class="ref-goods" v-for="item in category.topCategorylist.children" :key="item.id">
  <div class="head">
    <h3>{{item.name}}</h3>
    <p class="tag">温暖柔软，品质之选</p>
    <XtxMore />
  </div>
  <div class="body">
    <GoodsItem v-for="sub in item.goods" :key="sub.id" :sub="sub"/>
  </div>
</div>
 <XtxSkeleton v-else :height="429" :width="1240" />
  </div>

</template>

<script lang="ts" name="TopCategory" setup>
import useStore from '@/store';
import GoodsItem from './components/goods-item.vue'
import { watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
const {category,home} = useStore()
const route = useRoute()
// console.log(route.params.id);

// watch(()=>route.params.id,()=>{
//   if(!route.params.id ) return
//   category.getTopcategory(route.params.id as string)
// },{
//   immediate:true
// })
watchEffect(()=>{
  // if(!route.params.id ) return
  if(route.fullPath !=="/category/" + route.params.id ) return
   category.getTopcategory(route.params.id as string)
})
</script>

<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
 .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
</style>