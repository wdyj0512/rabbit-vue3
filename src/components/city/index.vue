<script lang="ts" setup name="XtxCity">
// 选择城市
export type changeResult = {
  provinceCode: string
  provinceName: string
  cityCode: string
  cityName: string
  countyCode:string
  countyName: string
}
import { ref, watchEffect } from 'vue';
import axios from 'axios'
import {onClickOutside} from '@vueuse/core'
const active = ref(false)
defineProps<{
    address?:string
}>()
type CityItem = {
    code:string
    level:number
    name:string
    areaList:CityItem[]
}

const emit = defineEmits<{
  (e: 'changeCity', city: changeResult): void
}>()
const target = ref(null)
const cityResult = ref<changeResult>({} as changeResult)
onClickOutside(target,()=>{
    active.value = false
})
const citylist = ref<CityItem[]>([])
const citylists = ref<CityItem[]>([])
async function getCityList(){
   const res = await axios.get<CityItem[]>('https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json')  
   citylist.value = res.data
   citylists.value = res.data
}
getCityList()
const changeCity = (data:CityItem)=>{
    if (data.level === 0) {
    // 省
    cityResult.value.provinceName = data.name
    cityResult.value.provinceCode = data.code
    citylist.value = data.areaList
  }
  if (data.level === 1) {
    // 市
    cityResult.value.cityName = data.name
    cityResult.value.cityCode = data.code
    citylist.value = data.areaList
  }
  if (data.level === 2) {
    // 县（区）
    cityResult.value.countyName = data.name
    cityResult.value.countyCode = data.code
    emit('changeCity',cityResult.value)
  }
    if(!data.areaList) return active.value=false
    citylist.value = data.areaList
}
watchEffect(()=>{
    if(!active.value) citylist.value= citylists.value
})

</script>
<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="active = !active" :class="{active}">
      <span v-if="address" class="placeholder">{{address}}</span>
      <span v-else class="placeholder">请选择配送地址</span>
      <span class="value"></span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div v-show="active" class="option" >
      <span @click="changeCity(item)" class="ellipsis" v-for="item in citylist" :key="item.name">{{item.name}}</span>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>