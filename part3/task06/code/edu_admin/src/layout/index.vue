<template>
  <el-container class="container">
    <div class="aside">
      <AppAside />
    </div>
    <el-container>
      <el-header class="header" height="50px">
        <AppHeader />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import AppAside from './components/app-aside.vue'
import AppHeader from './components/app-header.vue'

@Component({
  components: { AppAside, AppHeader }
})
export default class Index extends Vue {}
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  .aside {
    height: 100%;
  }
  .header {
    background: white;
    height: 50px;
    padding: 0;
  }
}
</style>
