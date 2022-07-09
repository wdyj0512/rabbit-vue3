<script lang="ts" setup>
import useStore from '@/store/index'
import { useLazyData } from '@/utils/hooks';
// import { useIntersectionObserver } from '@vueuse/core';
// import { ref } from 'vue';
import HomePanel from './home-panel.vue'
import HomeSkeleton from './home-skeleton.vue';
const {home} = useStore()
// const target = ref(null)
// const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
//   console.log(isIntersecting)
//   if (isIntersecting) {
//     stop()
//     home.getNewlist()
//   }
// })
const target = useLazyData(home.getNewlist)
</script>
<template>
  <div class="home-new">
    <HomePanel ref="target" title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right><XtxMore path="/" /></template>
      <!-- 面板内容 -->
      <Transition name="fade">
      <ul class="goods-list" v-if="home.newLsit.length">
        <li v-for="item in home.newLsit" :key="item.id">
          <RouterLink to="/">
            <img
              v-lazy="item.picture"
              alt=""
            />
            <p class="name ellipsis">{{item.name}}</p>
            <p class="price">&yen;{{item.price}}</p>
          </RouterLink>
        </li>
      </ul>
      <HomeSkeleton animated :count="4" v-else/>
      </Transition>
      
    </HomePanel>
  </div>
</template>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>