<template>
  <div class="header">
    <el-button @click="handleCollapse" class="collapse-btn" type="text">
      <i :class="collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
    </el-button>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ $store.state.title }}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-dropdown @command="handleCommand" class="drop-menu">
      <span class="el-dropdown-link">
        <el-avatar
          shape="square"
          :size="40"
          :src="userInfo.portrait || require('../../assets/images/avatar.jpg')"
        ></el-avatar>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
        <el-dropdown-item divided command="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { getUserInfo } from '@/api/user'

@Component
export default class AppHeader extends Vue {
  private userInfo = {}

  private mounted () {
    this.loadUserInfo()
  }

  private async loadUserInfo () {
    const {
      data: { content }
    } = await getUserInfo()
    this.userInfo = content
  }

  private handleCommand (command: string) {
    if (command === 'logout') {
      this.$confirm('确认退出吗?', '退出登录', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.commit('setUser', null)
        this.$router.push({ name: 'login' })
        this.$message('退出登录成功')
      }).catch()
    }
  }

  private handleCollapse () {
    this.$store.commit('setCollapseSideMenu', !this.collapse)
  }

  private get collapse (): boolean {
    return this.$store.state.collapseSideMenu
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0;
  .collapse-btn {
    height: 50px;
    width: 50px;
    font-size: larger;
    color: #1e1e1e;
  }
  .drop-menu {
    margin-left: auto;
    .el-dropdown-link {
      display: flex;
      align-items: center;
    }
  }
}
</style>
