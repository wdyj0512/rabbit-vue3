<script lang="ts" setup>
import useStore from '@/store/index'
const {home} = useStore()
home.getBannerList()
</script>
<template>
  <div class="home-banner">
    <!-- 轮播图 -->
    <xtx-carousel autoplay :duration="1500" :list="home.bannerlist" />
  </div>
</template>

<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
  background-color: pink;
  :deep(.carousel-btn.prev) {
  left: 270px!important;
}
:deep(.carousel-indicator) {
  padding-left: 250px;
}
}
</style>