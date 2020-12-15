<template>
  <div class="role-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-row type="flex" justify="space-between">
          <span>
            <el-button
              icon="el-icon-arrow-left"
              @click="$router.back()"
              type="text">
              返回
            </el-button>
            <el-divider direction="vertical"></el-divider>
            资源分类
          </span>
          <div class="operations">
            <el-button size="mini" @click="addCategory">
              添加类别
            </el-button>
          </div>
        </el-row>
      </div>
    </el-card>

    <el-table
      :data="resourceCategories"
      style="width: 100%; margin-bottom: 20px"
    >
      <el-table-column type="index" label="编号" />
      <el-table-column prop="name" label="分类名称" />
      <el-table-column prop="createdTime" label="创建时间" />
      <el-table-column prop="sort" label="排序" />
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button size="mini" @click="editCategory(row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="toDeleteCategory(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <category-form
      :visible.sync="dialogVisible"
      :title="title"
      :init="init"
      @update="getAllResourcies()"
    ></category-form>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Form } from 'element-ui'
import {
  ResourceCategory,
  getAllCategory,
  deleteCategory
} from '@/api/resource'
import CategoryForm from './CategoryForm.vue'

@Component({
  components: { CategoryForm }
})
export default class RoleList extends Vue {
  private init: ResourceCategory & any = {}

  private resourceCategories: ResourceCategory[] = []
  private total = 0
  private dialogVisible = false
  private title = '添加类别'

  created () {
    this.getAllResourcies()
  }

  /**
   * 获取所有类别数据
   */
  private async getAllResourcies () {
    const data = await getAllCategory()
    this.resourceCategories = data.data.data
  }

  /**
   * 添加类别
   */
  private addCategory () {
    this.title = '添加类别'
    this.dialogVisible = true
    this.init = {}
  }

  /**
   * 编辑类别
   */
  private editCategory (category: ResourceCategory) {
    this.title = '编辑类别'
    this.dialogVisible = true
    this.init = category
  }

  /**
   * 删除列别
   */
  private toDeleteCategory (category: ResourceCategory) {
    this.$confirm('是否删除该类别?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(async () => {
      const data = await deleteCategory(category.id)

      if (data.status === 200) {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getAllResourcies()
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
