<template>
  <div class="role-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-row type="flex" justify="space-between">
          课程管理
          <div class="operations">
            <el-button size="mini" type="primary" @click="addCourse">添加课程</el-button>
          </div>
        </el-row>
      </div>

      <el-form ref="form" inline :model="form">
        <el-form-item label="课程名称" prop="courseName">
          <el-input v-model="form.courseName"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status">
            <el-option label="全部" value=""></el-option>
            <el-option label="上架" value="1"></el-option>
            <el-option label="下架" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">
            查询搜索
          </el-button>
          <el-button @click="onReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-table
      :data="courses"
      style="width: 100%; margin-bottom: 20px"
    >
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="courseName" label="课程名称"> </el-table-column>
      <el-table-column prop="price" label="价格"> </el-table-column>
      <el-table-column prop="sortNum" label="排序"> </el-table-column>
      <el-table-column prop="status" label="上架状态">
        <template slot-scope="{ row }">
          <el-switch
            v-model="row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            :disabled="courseLoading[row.id]"
            @change="stateChange(row)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="price" label="操作" align="center">
        <template slot-scope="{ row }">
          <el-button @click="editCourse(row)">
            编辑
          </el-button>
          <el-button @click="handleSection(row)">
            内容管理
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      :current-page.sync="form.currentPage1"
      :page-sizes="[5, 10, 20]"
      :page-size="form.pageSize"
      layout="total, sizes, prev, pager, next"
      :total="total"
    ></el-pagination>

    <!-- <role-form
      :visible.sync="dialogVisible"
      :title="title"
      :init="init"
      @update="getAllRoleData()"
    ></role-form> -->

  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Form } from 'element-ui'
import { CourseQuery, Course, getCoursesPages, changeCourseState } from '@/api/course'

@Component({
  components: {}
})
export default class RoleList extends Vue {
  $refs!: {
    form: Form
  }

  private init: Course & any = {}

  private form: CourseQuery = {
    courseName: '',
    status: '',
    currentPage: 1,
    pageSize: 20
  }

  private courses: Course[] = []
  private total = 0
  private dialogVisible = false
  private title = '添加角色'
  private courseLoading: Record<number, boolean> = {}

  created () {
    this.getCourses()
  }

  /**
   * 获取课程列表
   */
  private async getCourses () {
    const data = await getCoursesPages(this.form)

    this.courses = data.data.data.records
    this.total = data.data.data.total
    // console.log(data.data)
  }

  /**
   * 搜索
   */
  private onSearch () {
    this.getCourses()
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
    this.form.pageSize = val
    this.getCourses()
  }

  /**
   * 页码改变
   */
  private onCurrentChange (val: number) {
    this.form.currentPage = val
    this.getCourses()
  }

  private async stateChange (course: Course) {
    this.$set(this.courseLoading, course.id, true)
    try {
      const {
        data: { data, code, mesg }
      } = await changeCourseState(course.id, course.status)
      if (Number.parseInt(code)) {
        throw new Error(mesg)
      }
      this.$message.success(`${course.status ? '上架' : '下架'}成功`)
    } catch (error) {
      this.$message.error(`Error when change state: ${error}`)
      course.status = course.status ? 0 : 1
    } finally {
      this.$set(this.courseLoading, course.id, false)
    }
  }

  /**
   * 添加课程
   */
  private addCourse () {
    console.log(123)
  }

  /**
   * 编辑课程
   */
  private editCourse (course: Course) {
    console.log(course)
  }
}
</script>

<style scoped></style>
