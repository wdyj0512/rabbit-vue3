<script lang="ts" setup name="XtxCarousel">
import { onMounted, onUnmounted, ref } from 'vue';
import { Result } from '../../types/data';

const {list,autoplay,duration}= defineProps<{
    list: Result[]
    autoplay?:boolean
    duration?:number
}>()
const active = ref(0)
const peav = ()=>{
    active.value--
    if(active.value<0){
        active.value=list.length-1
    }
}
const count = ()=>{
    active.value++
    if(active.value>=list.length){
        active.value= 0
    }
}
const next = ()=>{
     active.value++
    if(active.value>=list.length){
        active.value= 0
    }
}
let timerId = -1

const stop = ()=>{
    clearInterval(timerId)
}
const start = ()=>{
    if(!autoplay) return
    timerId = window.setInterval(()=>{
    next()
},duration)
}
onMounted(() => {
    start()
})
onUnmounted(() => {
    stop()
})

</script>

<template>
  <div class="xtx-carousel" @mouseenter="stop" @mouseleave="start">
    <ul class="carousel-body">
      <li v-for="(item,index) in list" :key="item.id" class="carousel-item" :class="{fade:active === index}">
        <RouterLink to="/">
          <img
            :src="item.imgUrl"
            alt=""
          />
        </RouterLink>
      </li>
    </ul>
    <a href="javascript:;" class="carousel-btn prev"
     @click="peav" ><i class="iconfont icon-angle-left"></i
    ></a>
    <a href="javascript:;" class="carousel-btn next"
     @click="count" ><i class="iconfont icon-angle-right"></i
    ></a>
    <div class="carousel-indicator">
      <span @mouseenter="active = index" v-for="(item,index) in list" :key="item.id" :class="{active:active === index}"></span>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>