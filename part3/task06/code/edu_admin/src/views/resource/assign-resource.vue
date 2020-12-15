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
          分配资源
        </span>
      </el-row>
    </div>

    <el-tree
      ref="tree"
      node-key="id"
      :data="structureResources"
      :default-checked-keys="selectedKeys"
      default-expand-all
      show-checkbox
    ></el-tree>

    <el-divider />
    <el-button type="primary" @click="onSave">保存</el-button>
    <el-button @click="onClear">清空</el-button>
  </el-card>
</template>
<script lang="ts">
import { Tree } from 'element-ui'
import { TreeData } from 'element-ui/types/tree'
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Resource, ResourceCategory, getAllResource, getAllCategory, getRoleResources, allocateRoleResources } from '@/api/resource'

@Component({
  components: {}
})
export default class AssignResource extends Vue {
  @Prop({ type: String, required: true })
  private roleId!: string | number

  $refs!: {
    tree: Tree
  }

  private resources: Resource[] = []
  private categories: ResourceCategory[] = []
  private roleResources: ResourceCategory[] = []

  created () {
    this.getResource()
    this.getResourceCategory()
    this.getRoleResource()
  }

  /**
   * 获取所有资源
   */
  private async getResource () {
    const {
      data: { data: resources }
    } = await getAllResource()
    this.resources = resources
  }

  /**
   * 获取所有资源分类
   */
  private async getResourceCategory () {
    const {
      data: { data: categories }
    } = await getAllCategory()
    this.categories = categories
  }

  /**
   * 获取角色拥有的资源列表
   */
  private async getRoleResource () {
    const {
      data: { data: roleResources }
    } = await getRoleResources(this.roleId)
    this.roleResources = roleResources
  }

  /**
   * 遍历资源
   */
  private get structureResources (): TreeData[] {
    return this.categories.map(c => ({
      id: `c-${c.id}`,
      label: c.name,
      children: this.resources
        .filter(r => r.categoryId === c.id)
        .map(r => ({
          id: r.id,
          label: r.name
        }))
    }))
  }

  /**
   * 获取选中的菜单
   */
  private get selectedKeys (): number[] {
    return this.getSelectedKeys(this.roleResources)
  }

  private getSelectedKeys (
    resources: { id: number; selected: boolean; resourceList?: Resource[] }[]
  ): number[] {
    return resources.reduce((acc, cur) => {
      if (cur.resourceList) {
        acc.push(...this.getSelectedKeys(cur.resourceList))
      } else if (cur.selected) {
        acc.push(cur.id)
      }
      return acc
    }, [] as number[])
  }

  /**
   * 保存
   */
  private async onSave () {
    this.$confirm('是否保存?', '提示', {
      confirmButtonText: '保存',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      const keys = this.$refs.tree.getCheckedNodes().reduce((acc, cur) => {
        if (!cur.children) acc.push(cur.id)
        return acc
      }, [] as number[])

      const data = await allocateRoleResources(this.roleId, keys)
      if (data.status !== 200) {
        this.$message.error('保存失败, 请联系管理员~')
      }
      this.$message.success('保存成功')
      this.$router.back()
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消保存'
      })
    })
  }

  /**
   * 清空
   */
  private onClear () {
    this.$refs.tree.setCheckedKeys([])
  }
}
</script>

<style scoped></style>
