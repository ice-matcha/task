<template>
  <el-menu
    default-active="4"
    @open="handleOpen"
    @close="handleClose"
    :collapse="collapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
  >
    <template v-for="(menu, index) in menus">
      <el-menu-item
        v-if="!menu.children"
        :index="menu.path"
        :key="index"
        @click="handleMenuClick(menu)"
      >
        <i :class="`el-icon-${menu.icon}`" />
        <span slot="title">{{ menu.title }}</span>
      </el-menu-item>

      <el-submenu v-else :index="`${index}`" :key="index">
        <template slot="title">
          <i :class="`el-icon-${menu.icon}`" />
          <span slot="title">{{ menu.title }}</span>
        </template>
        <el-menu-item
          v-for="(subMenu, subIndex) in menu.children"
          :index="subMenu.path"
          :key="`${subIndex}`"
          @click="handleMenuClick(subMenu)"
        >
          <i :class="`el-icon-${subMenu.icon}`" />
          <span slot="title">{{ subMenu.title }}</span>
        </el-menu-item>
      </el-submenu>
    </template>
  </el-menu>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

type Menu = {
  title: string
  icon: string
  path?: string
  children?: Menu[]
}

@Component
export default class AppAside extends Vue {
  private menus: Menu[] = [
    {
      icon: 's-check',
      title: '权限管理',
      children: [
        {
          path: '/role',
          icon: 'view',
          title: '角色管理'
        },
        {
          path: '/menu',
          icon: 'menu',
          title: '菜单管理'
        },
        {
          path: '/resource',
          icon: 'folder-checked',
          title: '资源管理'
        }
      ]
    },
    { path: '/course', icon: 'film', title: '课程管理' },
    { path: '/user', icon: 'user', title: '用户管理' },
    {
      icon: 'data-analysis',
      title: '广告管理',
      children: [
        { path: '/advert', icon: 'data-analysis', title: '广告列表' },
        { path: '/advert-space', icon: 'data-analysis', title: '广告位列表' }
      ]
    }
  ]

  private handleMenuClick (menu: Menu) {
    this.$store.commit('setTitle', menu.title)
  }

  private get collapse (): boolean {
    return this.$store.state.collapseSideMenu
  }

  private handleOpen (key: string, keyPath: string): void {
    // console.log(key, keyPath)
  }

  private handleClose (key: string, keyPath: string): void {
    // console.log(key, keyPath)
  }
}
</script>

<style lang="scss" scoped>
.aside {
  .el-menu {
    min-height: 100vh;
    &:not(.el-menu--collapse) {
      width: 200px;
    }
  }
}
</style>
