<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :before-close="closeDialog">
    <el-form :model="form">
      <el-form-item label="类别名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="排序" :label-width="formLabelWidth">
        <el-input v-model="form.sort" autocomplete="off"></el-input>
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
import { CategoryUpdateForm, ResourceCategory, saveOrderUpdateCategory } from '@/api/resource'

@Component
export default class CategoryForm extends Vue {
  @Prop({ type: String, required: true })
  private title!: string

  @Prop({ type: Boolean, default: false })
  private visible!: boolean

  private dialogVisible = false
  private form: CategoryUpdateForm = {
    name: '',
    sort: 0
  }

  @Watch('visible')
  changeVisible (newValue: boolean) {
    this.dialogVisible = newValue
  }

  @Prop({ type: Object, default: {} })
  private init!: Form

  @Watch('init')
  changeInit (newVal: ResourceCategory) {
    if (newVal) {
      this.form.id = newVal.id
      this.form.name = newVal.name
      this.form.sort = newVal.sort
    }
  }

  private formLabelWidth = '120px'

  private toClose () {
    this.$emit('update:visible', false)
  }

  private async onSubmit () {
    const data = await saveOrderUpdateCategory(this.form)
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

  private closeDialog () {
    this.$emit('update:visible', false)
  }
}
</script>
<style scoped></style>
