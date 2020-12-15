<template>
  <div class="role-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-row type="flex" justify="space-between">
          角色管理
          <div class="operations">
            <el-button size="mini" type="primary" @click="addRole">添加角色</el-button>
          </div>
        </el-row>
      </div>

      <el-form ref="form" inline :model="form">
        <el-form-item label="角色名称" prop="name">
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

    <el-table :data="roles">
      <el-table-column prop="id" label="编号" />
      <el-table-column prop="name" label="角色名称" />
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="createdTime" label="添加时间" />
      <el-table-column label="操作" align="center">
        <template slot-scope="{ row }">
          <div>
            <el-button type="text" @click="allocatingMenu(row)">
              分配菜单
            </el-button>
            <el-button type="text" @click="allocatingResource(row)">
              分配资源
            </el-button>
          </div>
          <div>
            <el-button type="text" @click="editRole(row)">
              编辑
            </el-button>
            <el-button size="mini" type="text" @click="toDeleteRole(row)">
              删除
            </el-button>
          </div>
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

    <role-form
      :visible.sync="dialogVisible"
      :title="title"
      :init="init"
      @update="getAllRoleData()"
    ></role-form>

  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getRolePages, RoleQueryParam, Roles, deleteRole } from '@/api/role'
import { Form } from 'element-ui'
import RoleForm from './RoleForm.vue'

@Component({
  components: { RoleForm }
})
export default class RoleList extends Vue {
  $refs!: {
    form: Form
  }

  private init: Roles & any = {}

  private form: RoleQueryParam = {
    name: '',
    current: 1,
    size: 20
  }

  private roles: Roles[] = []
  private total = 0
  private dialogVisible = false
  private title = '添加角色'

  created () {
    this.getAllRoleData()
  }

  /**
   * 获取所有角色数据
   */
  private async getAllRoleData () {
    const data = await getRolePages(this.form)

    this.roles = data.data.data.records
    this.total = data.data.data.total
    // console.log(data.data)
  }

  /**
   * 搜索
   */
  private onSearch () {
    this.getAllRoleData()
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
    this.getAllRoleData()
  }

  /**
   * 页码改变
   */
  private onCurrentChange (val: number) {
    this.form.current = val
    this.getAllRoleData()
  }

  /**
   * 添加角色
   */
  private addRole () {
    this.title = '添加角色'
    this.dialogVisible = true
    this.init = {}
  }

  /**
   * 编辑角色
   */
  private editRole (role: Roles) {
    this.title = '编辑角色'
    this.dialogVisible = true
    this.init = role
  }

  /**
   * 删除角色
   */
  private toDeleteRole (role: Roles) {
    this.$confirm('是否删除该角色?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      const data = await deleteRole(role.id)

      if (data.status === 200) {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getAllRoleData()
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

  /**
   * 分配菜单
   */
  private allocatingMenu (role: Roles) {
    this.$router.push({
      name: 'assign-menu',
      params: {
        roleId: `${role.id}`
      }
    })
  }

  /**
   * 分配资源
   */
  private allocatingResource (role: Roles) {
    this.$router.push({
      name: 'assign-resource',
      params: {
        roleId: `${role.id}`
      }
    })
  }
}
</script>

<style scoped></style>
