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
          <el-button type="primary" @click="onSubmit">
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
            <el-button size="mini" type="text" @click="deleteRole(row)">
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

    <el-dialog :title="title" :visible.sync="dialogVisible">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色编码" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入描述"
            v-model="form.name">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { getRolePages, RoleQueryParam, Roles } from '@/api/role'
import { Form } from 'element-ui'

@Component
export default class RoleList extends Vue {
  $refs!: {
    form: Form
  }

  private form: RoleQueryParam = {
    name: '',
    current: 1,
    size: 20
  }

  private roles: Roles[] = []
  private total = 0
  private dialogVisible = false
  private formLabelWidth = '120px'
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
   * 添加角色
   */
  private addRole () {
    this.title = '添加角色'
    this.dialogVisible = true
    console.log('test')
  }

  /**
   * 编辑角色
   */
  private editRole (role: Roles) {
    this.title = '编辑角色'
    this.dialogVisible = true
    console.log(role)
  }

  /**
   * 删除角色
   */
  private deleteRole (role: Roles) {
    console.log(role)
  }

  /**
   * 提交
   */
  private onSubmit () {
    console.log('submit')
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
   * 分配菜单
   */
  private allocatingMenu (role: Roles) {
    console.log(role)
  }

  /**
   * 分配资源
   */
  private allocatingResource (role: Roles) {
    console.log(role)
  }

  private dialogFormVisible () {
    this.dialogVisible = false
  }
}
</script>

<style scoped></style>
