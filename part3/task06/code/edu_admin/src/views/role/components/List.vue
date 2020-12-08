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

    <el-table>
      <el-table-column prop="id" label="编号" />
      <el-table-column prop="name" label="角色名称" />
      <el-table-column prop="description" label="描述" />
      <el-table-column prop="createdTime" label="添加时间" />
      <el-table-column label="操作" align="center">
        <template slot-scope="{ row }">
          <div>
            <el-button type="text" @click="handleMenu(row)">
              分配菜单
            </el-button>
            <el-button type="text" @click="handleResource(row)">
              分配资源
            </el-button>
          </div>
          <div>
            <el-button type="text" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button size="mini" type="text" @click="handleDelete(row)">
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
      layout="prev, pager, next"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { getAllRole } from '@/api/role'

@Component
export default class RoleList extends Vue {
  private form = {
    name: '',
    current: 1,
    size: 20
  }

  private total = 0

  created () {
    this.getAllRoleData()
  }

  private async getAllRoleData () {
    const data = await getAllRole()
    console.log(data)
  }

  private addRole () {
    console.log('test')
  }

  private onSubmit () {
    console.log('submit')
  }

  private onReset () {
    console.log('onReset')
  }

  private onSizeChange () {
    console.log('onSizeChange')
  }

  private onCurrentChange () {
    console.log('onCurrentChange')
  }
}
</script>

<style scoped></style>
