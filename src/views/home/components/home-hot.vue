<script lang="ts" setup>
import useStore from '@/store'
import { useLazyData } from '@/utils/hooks';
// import { useIntersectionObserver } from '@vueuse/core';
// import { ref } from 'vue';
import HomePanel from './home-panel.vue'
import HomeSkeleton from './home-skeleton.vue';
const { home } = useStore()
const target = useLazyData(()=>{
  home.getHotlist()
  })
// const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
//   console.log(isIntersecting)
//   if (isIntersecting) {
//    home.getHotlist()
//     stop()
//   }
// })

</script>
<template>
  <HomePanel ref="target" title="人气推荐" sub-title="人气爆款 不容错过">
    <transition name="fade">
    <ul ref="pannel" class="goods-list" v-if="home.hotlist.length">
      <li v-for="item in home.hotlist" :key="item.id">
        <RouterLink to="/">
          <img v-lazy="item.picture" alt="" />
          <p class="name">{{ item.title }}</p>
          <p class="desc">{{ item.alt }}</p>
        </RouterLink>
      </li>
    </ul>
    <HomeSkeleton v-else :count="4"/> 
    </transition>
  </HomePanel>
</template>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>