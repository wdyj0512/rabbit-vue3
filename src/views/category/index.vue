<template>
  <XtxBread>
  <XtxBreadItem to="/">首页</XtxBreadItem>
  <XtxBreadItem>{{category.topCategorylist.name}}</XtxBreadItem>
</XtxBread>
</template>

<script lang="ts" name="TopCategory" setup>
import useStore from '@/store';
import { watch } from 'vue';
import { useRoute } from 'vue-router';
const {category} = useStore()
const route = useRoute()
// console.log(route.params.id);

watch(()=>route.params.id,()=>{
  if(!route.params.id ) return
  category.getTopcategory(route.params.id as string)
},{
  immediate:true
})
</script>

<style></style>