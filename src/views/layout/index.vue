<script lang="ts" setup name="Layout">
import AppTopnav from './components/app-topnav.vue';
import AppHeader from './components/app-header.vue';
import AppFooter from './components/app-footer.vue';
import AppHeaderSticky from './components/app-header-sticky.vue';
import useStore from '@/store/index';
const {category} = useStore()
category.getCategoryList()

</script>
<template>
  <AppTopnav></AppTopnav>
  <AppHeader />
  <AppHeaderSticky></AppHeaderSticky>
  <main class="app-body">
    <!-- 路由出口 -->
    <router-view></router-view>
  </main>
  <AppFooter />
</template>

<style lang="less" scoped>
.app-body {
  min-height: 600px;
}
</style>