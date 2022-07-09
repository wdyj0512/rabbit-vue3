 //图片懒加载 
<template>
  <div>
       操场
    </div>
    <img ref="target"  alt="">
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {useIntersectionObserver} from '@vueuse/core'
const target = ref<HTMLImageElement | null>(null)
useIntersectionObserver(target,([{isIntersecting}])=>{
   if(isIntersecting){
    target.value!.src = "https://img1.baidu.com/it/u=3620364508,9606154&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500"
   }
})
</script>

<style scoped lang="less">
div{
height: 5000px;
}
</style>