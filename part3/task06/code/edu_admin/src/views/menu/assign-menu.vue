<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-row type="flex">
        <span>
          <el-button
            icon="el-icon-arrow-left"
            @click="$router.back()"
            type="text"
          >
            返回
          </el-button>
          <el-divider direction="vertical"></el-divider>
          分配菜单
        </span>
      </el-row>
    </div>

    <el-tree
      ref="tree"
      :data="menus"
      :props="menuProps"
      node-key="id"
      default-expand-all
      :default-checked-keys="selectedKeys"
      show-checkbox
    >
    </el-tree>

    <el-divider />
    <el-button type="primary" @click="onSave">保存</el-button>
    <el-button @click="onClear">清空</el-button>
  </el-card>
</template>
<script lang="ts">
import { Tree } from 'element-ui'
import { TreeData } from 'element-ui/types/tree'
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Menu, getRoleMenus, getMenuNodeList, allocateRoleMenus } from '@/api/menu'

@Component({
  components: {}
})
export default class AssignMenu extends Vue {
  @Prop({ type: String, required: true })
  private roleId!: string | number

  $refs!: {
    tree: Tree
  }

  private menus: Menu[] = []
  private roleMenus: Menu[] = []
  private menuProps: { [key in keyof TreeData]: keyof Menu } = {
    label: 'name',
    children: 'subMenuList'
  }

  created () {
    this.getMenusByRole()
  }

  /**
   * 获取用户菜单
   */
  private async getMenusByRole () {
    const [
      {
        data: { data: menus }
      },
      {
        data: { data: roleMenus }
      }
    ] = await Promise.all([getMenuNodeList(), getRoleMenus(this.roleId)])
    this.menus = menus
    this.roleMenus = roleMenus
  }

  private get selectedKeys (): number[] {
    return this.getSelectedKeys(this.roleMenus)
  }

  /**
   * 获取被选中的菜单
   */
  private getSelectedKeys (menus: Menu[]): number[] {
    return menus.reduce((acc, cur) => {
      if (cur.selected) acc.push(cur.id)
      if (cur.subMenuList) acc.push(...this.getSelectedKeys(cur.subMenuList))
      return acc
    }, [] as number[])
  }

  /**
   * 保存菜单
   */
  private async onSave () {
    this.$confirm('是否角色菜单?', '提示', {
      confirmButtonText: '保存',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      const data = await allocateRoleMenus(this.roleId, this.$refs.tree.getCheckedKeys())
      if (data.status !== 200) {
        this.$message.error('更新菜单失败, 请联系管理员~')
      }
      this.$message.success('更新成功')
      this.$router.back()
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消保存'
      })
    })
  }

  /**
   * 清空选中
   */
  private onClear () {
    this.$refs.tree.setCheckedKeys([])
  }
}
</script>

<style scoped></style>
