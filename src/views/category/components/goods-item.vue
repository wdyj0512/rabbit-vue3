<template>
  <RouterLink :to="`/goods/${sub.id}`" class="goods-item">
    <img
      v-lazy="sub.picture"
      alt=""
    />
    <p class="name ellipsis">{{sub.name}}</p>
    <p class="desc ellipsis">{{sub.desc}}</p>
    <p class="price">&yen;{{sub.price}}</p>
  </RouterLink>
</template>

<script lang="ts" setup name="GoodsItem">
import { Good } from '@/types/data';

defineProps<{
    sub:Good
}>()
</script>

<style scoped lang="less">
.goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  .hoverShadow();
  img {
    width: 160px;
    height: 160px;
  }
  p {
    padding-top: 10px;
  }
  .name {
    font-size: 16px;
  }
  .desc {
    color: #999;
    height: 29px;
  }
  .price {
    color: @priceColor;
    font-size: 20px;
  }
}
</style>