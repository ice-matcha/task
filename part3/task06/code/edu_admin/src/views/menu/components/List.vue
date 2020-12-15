<template>
  <div class="role-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-row type="flex" justify="space-between">
          菜单管理
          <div class="operations">
            <el-button size="mini" type="primary" @click="addMenu">添加菜单</el-button>
          </div>
        </el-row>
      </div>

      <el-form ref="form" inline :model="form">
        <el-form-item label="菜单名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">
            查询搜索
          </el-button>
          <el-button @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-table :data="menus" style="width: 100%">
      <el-table-column label="编号" min-width="150" type="index">
      </el-table-column>
      <el-table-column prop="name" label="菜单名称" min-width="150">
      </el-table-column>
      <el-table-column prop="level" label="菜单级数" min-width="150">
      </el-table-column>
      <el-table-column prop="icon" label="前端图标" min-width="150">
      </el-table-column>
      <el-table-column prop="orderNum" label="排序" min-width="150">
      </el-table-column>
      <el-table-column label="操作" min-width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="editMenu(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="toDeleteMenu(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      :current-page.sync="form.current"
      :page-sizes="[5, 10, 20]"
      :page-size="form.size"
      layout="total, sizes, prev, pager, next"
      :total="total"
    ></el-pagination>

    <menu-form
      :visible.sync="dialogVisible"
      :title="title"
      :init="init"
      @update="getAllMenus()"
    ></menu-form>

  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Form } from 'element-ui'
import { QueryParam, Menu, getMenuPages, deleteMenu } from '@/api/menu'
import MenuForm from './MenuForm.vue'

@Component({
  components: { MenuForm }
})
export default class RoleList extends Vue {
  $refs!: {
    form: Form
  }

  private init: Menu & any = {}

  private form: QueryParam = {
    name: '',
    current: 1,
    size: 20
  }

  private menus: Menu[] = []
  private total = 0
  private dialogVisible = false
  private title = '添加菜单'

  created () {
    this.getAllMenus()
  }

  /**
   * 获取所有菜单数据
   */
  private async getAllMenus () {
    const data = await getMenuPages(this.form)

    this.menus = data.data.data.records
    this.total = data.data.data.total
  }

  /**
   * 搜索
   */
  private onSearch () {
    this.getAllMenus()
  }

  /**
   * 重置
   */
  private onReset () {
    this.$refs.form.resetFields()
  }

  /**
   * 条数大小改变
   */
  private onSizeChange (val: number) {
    this.form.size = val
    this.getAllMenus()
  }

  /**
   * 页码改变
   */
  private onCurrentChange (val: number) {
    this.form.current = val
    this.getAllMenus()
  }

  /**
   * 添加菜单
   */
  private addMenu () {
    this.title = '添加菜单'
    this.dialogVisible = true
    this.init = {}
  }

  /**
   * 编辑菜单
   */
  private editMenu (menu: Menu) {
    this.title = '编辑菜单'
    this.dialogVisible = true
    this.init = menu
  }

  /**
   * 删除菜单
   */
  private toDeleteMenu (menu: Menu) {
    this.$confirm('是否删除该菜单?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      const data = await deleteMenu(menu.id)

      if (data.status === 200) {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getAllMenus()
      } else {
        this.$message({
          type: 'error',
          message: '删除失败!'
        })
      }
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除'
      })
    })
  }
}
</script>

<style scoped></style>
