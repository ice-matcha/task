<template>
  <el-dialog :title="title" :visible.sync="dialogVisible">
    <el-form :model="form">
      <el-form-item label="资源名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="资源路径" :label-width="formLabelWidth">
        <el-input v-model="form.url" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="资源分类" :label-width="formLabelWidth" prop="categoryId">
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
      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入描述"
          v-model="form.description">
        </el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="toClose">取 消</el-button>
      <el-button type="primary" @click="onSubmit">提 交</el-button>
    </div>
  </el-dialog>
</template>
<script lang='ts'>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Form } from 'element-ui'
import { Resource, ResourceUpdateForm, ResourceCategory, getAllCategory, saveOrUpdateResource } from '@/api/resource'

@Component
export default class ResourceForm extends Vue {
  @Prop({ type: String, required: true })
  private title!: string

  @Prop({ type: Boolean, default: false })
  private visible!: boolean

  private dialogVisible = false
  private form: ResourceUpdateForm = {
    name: '',
    url: '',
    categoryId: 0,
    description: ''
  }

  @Watch('visible')
  changeVisible (newValue: boolean) {
    this.dialogVisible = newValue
  }

  @Prop({ type: Object, default: {} })
  private init!: Form

  @Watch('init')
  changeInit (newVal: Resource) {
    if (newVal) {
      this.form.id = newVal.id
      this.form.name = newVal.name
      this.form.url = newVal.url
      this.form.description = newVal.description
      this.form.categoryId = newVal.categoryId
    }
  }

  private formLabelWidth = '120px'
  private resourceCategories: ResourceCategory[] = []

  created () {
    this.getResourceCategories()
  }

  private async getResourceCategories () {
    const {
      data: { data }
    } = await getAllCategory()
    this.resourceCategories = data
  }

  private get categorySelects (): { value: string | number; label: string }[] {
    return this.resourceCategories.map(r => ({
      value: r.id,
      label: r.name
    }))
  }

  private toClose () {
    this.$emit('update:visible', false)
  }

  private async onSubmit () {
    const data = await saveOrUpdateResource(this.form)
    if (data.data.code === '000000') {
      this.$emit('update:visible', false)
      this.$emit('update', true)
      this.$message({
        type: 'success',
        message: '操作成功!'
      })
    } else {
      this.$message({
        type: 'error',
        message: '操作失败!'
      })
    }
  }
}
</script>
<style scoped></style>
