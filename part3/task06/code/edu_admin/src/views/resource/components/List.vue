<template>
  <div class="role-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-row type="flex" justify="space-between">
          资源管理
          <div class="operations">
            <el-button size="mini" type="info" @click="toCategory">资源分类</el-button>
            <el-button size="mini" type="primary" @click="addResource">添加资源</el-button>
          </div>
        </el-row>
      </div>

      <el-form inline ref="form" :model="form">
        <el-form-item prop="name" label="资源名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="url" label="资源路径">
          <el-input v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item prop="categoryId" label="资源分类">
          <el-select
            v-model="form.categoryId"
            placeholder="请选择资源分类"
            clearable
          >
            <el-option
              v-for="{ label, value } in categorySelects"
              :label="label"
              :value="value"
              :key="value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="onSearch"
          >
            查询搜索
          </el-button>
          <el-button @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-table
      :data="resources"
      style="width: 100%; margin-bottom: 20px"
    >
      <el-table-column type="index" label="编号"> </el-table-column>
      <el-table-column prop="name" label="资源名称"> </el-table-column>
      <el-table-column prop="url" label="资源路径"> </el-table-column>
      <el-table-column prop="description" label="描述"> </el-table-column>
      <el-table-column prop="createdTime" label="添加时间"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button size="mini" @click="editResource(row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="toDeleteResource(row)">
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

    <resource-form
      :visible.sync="dialogVisible"
      :title="title"
      :init="init"
      @update="getAllResource()"
    ></resource-form>

  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Form } from 'element-ui'
import {
  ResourceQueryParam,
  Resource,
  ResourceCategory,
  getResourcePages,
  getAllCategory,
  deleteResource
} from '@/api/resource'
import ResourceForm from './ResourceForm.vue'

@Component({
  components: { ResourceForm }
})
export default class List extends Vue {
  $refs!: {
    form: Form
  }

  private init: Resource & any = {}

  private form: ResourceQueryParam = {
    name: '',
    url: '',
    current: 1,
    size: 20
  }

  private resources: Resource[] = []
  private resourceCategories: ResourceCategory[] = []
  private total = 0
  private dialogVisible = false
  private title = '添加资源'

  created () {
    this.getAllResource()
    this.getResourceCategories()
  }

  /**
   * 获取所有资源数据
   */
  private async getAllResource () {
    const data = await getResourcePages(this.form)

    this.resources = data.data.data.records
    this.total = data.data.data.total
  }

  private async getResourceCategories () {
    const {
      data: { data }
    } = await getAllCategory()
    this.resourceCategories = data
  }

  /**
   * 搜索
   */
  private onSearch () {
    this.getAllResource()
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
    this.getAllResource()
  }

  /**
   * 页码改变
   */
  private onCurrentChange (val: number) {
    this.form.current = val
    this.getAllResource()
  }

  private get categorySelects (): { value: string | number; label: string }[] {
    return this.resourceCategories.map(r => ({
      value: r.id,
      label: r.name
    }))
  }

  /**
   * 添加资源
   */
  private addResource () {
    this.title = '添加资源'
    this.dialogVisible = true
    this.init = {}
  }

  /**
   * 编辑资源
   */
  private editResource (resource: Resource) {
    this.title = '编辑资源'
    this.dialogVisible = true
    this.init = resource
  }

  /**
   * 删除资源
   */
  private toDeleteResource (resource: Resource) {
    this.$confirm('是否删除该资源?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      const data = await deleteResource(resource.id)

      if (data.status === 200) {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getAllResource()
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

  private toCategory () {
    this.$router.push({ name: 'category' })
  }
}
</script>

<style scoped></style>
