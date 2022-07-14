<script setup lang="ts" name="GoodsSku">
// import useStore from '@/store';
import { GoodsInfo, spec, valueItem } from '@/types/data';
import bwPowerSet from '@/utils/powerset';
// const {goods} = useStore()

const props = defineProps<{
  goods:GoodsInfo
  skuId:string
}>()
const emit = defineEmits<{
  (e:'changeSku',skuId:string):void
}>()
const hChangeSelected = (item:spec,sub:valueItem)=>{
  if (sub.disabled) return
      item.values.forEach(i=>i.selected = false)
      sub.selected = !sub.selected
      updateDisabledStatus()
      const result = getSelectedSpec()
      if(result.every(item=>item)){
        const key = result.join('☆')
        const [skuId] = pathMap[key]
        console.log(skuId);
        emit('changeSku',skuId)
      }
      
}
const getbwPowerSet = ()=>{
  const pathMap:any = {}  
  console.log(props.goods.skus);
  
  const skus = props.goods.skus.filter(item => item.inventory > 0)
  // console.log(skus);
  skus.forEach(v=>{
    const arr = v.specs.map(s=>s.valueName)
    const powerset = bwPowerSet(arr)
    // console.log(powerset);
    
    powerset.forEach(m =>{
      const key = m.join('☆')
      if (key in pathMap) {
        // 6. 存在
        pathMap[key].push(v.id)
      } else {
        // 7. 不存在
        pathMap[key] = [v.id]
      }
    })
  })
  return pathMap
}
const pathMap = getbwPowerSet()
console.log(pathMap);
// 修改禁用状态, 页面加载时就对所有元素进行修改
function updateDisabledStatus() {
  // 该方法的作用: 循环所有 specs(规格) 去路径字典里找, 是否存在
  // 如果存在就不禁用, 如果不存在就禁用
  props.goods.specs.forEach((item,index) => {
    item.values.forEach(sub => {
      // console.log(sub.name)
      // 去对象里找是否有这个属性, 该怎么做? key in obj 得到布尔值
      // 如果存在就不禁用, 如果不存在就禁用
      // if (sub.name in pathMap) {
        //   sub.disabled = false
      // } else {
        //   sub.disabled = true
      // }
      // 只要是将 if 条件表达式的结果赋值给某个对象, 都可以用这种办法: 直接将条件表达式赋给对象的属性
      // 开发小技巧
        const selectedArr = getSelectedSpec()
       selectedArr[index] = sub.name
       const key = selectedArr.filter(v=>v).join('☆')
      sub.disabled = !(key in pathMap)
    })
  })
  }
  // 获取被选中的规格
function getSelectedSpec() {
  // 希望获取每个规格被选中的值: ['', '', '']
  const arr: string[] = []
  // 遍历所有的规格, 获取它们的选中状态 (selected)
  props.goods.specs.forEach(item => {
    const result = item.values.find(v => v.selected)
    // console.log(result?.name)
    arr.push(result?.name || '')
    // item.values.forEach(sub => {
    // console.log(sub.name, sub.selected)
    //   if (sub.selected) {
    //     arr.push(sub.name)
    //   } else {
    //     arr.push('')
    //   }
    // })
  })
  return arr
}

// 初始化勾选状态
function initSpecSelected() {
  if (!props.skuId) return
  // 通过 skuId 去找到当前 sku 勾选的规格
  const result = props.goods.skus.find(item => item.id === props.skuId)
  if (!result) return
  // console.log('通过 ID 找到的 sku:', result.specs)
  const selectArr = result.specs.map(item => item.valueName)
  // console.log(selectArr)
  // 遍历所有的规格, 处理选中状态
  props.goods.specs.forEach(item => {
    item.values.forEach(sub => {
      sub.selected = selectArr.includes(sub.name)
      // sub.selected
      // sub.name = 
      // if (selectArr.includes(sub.name)) {
      //   sub.selected = true
      // }
    })
  })
}
initSpecSelected()
updateDisabledStatus()
</script>
<template>
  <div class="goods-sku" >
    <dl v-for="item in props.goods.specs" :key="item.name">
      <dt>{{item.name}}</dt>
      <dd>
      <template v-for="sub in item.values" :key="sub.name">
        <img
        @click="hChangeSelected(item,sub)"
        v-if="sub.picture"
          :class="{selected:sub.selected,disabled:sub.disabled}"
          :src="sub.picture"
          alt=""
          :title="sub.name"
        />
        <span @click="hChangeSelected(item,sub)" :class="{selected:sub.selected,disabled:sub.disabled}" v-else>{{sub.name}}</span>
      </template>
     </dd>
    </dl>
  </div>
</template>

<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        margin-top: 5px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 30px;
        padding: 0 20px;
        margin-top: 5px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
