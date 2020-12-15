<template>
  <el-dialog :title="title" :visible.sync="dialogVisible">
    <el-form :model="form">
      <el-form-item label="角色名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色编码" :label-width="formLabelWidth">
        <el-input v-model="form.code" autocomplete="off"></el-input>
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
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script lang='ts'>
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { RoleForm, Roles, saveOrUpdateRole } from '@/api/role'
import { Form } from 'element-ui'

@Component
export default class RoleFrom extends Vue {
  @Prop({ type: String, required: true })
  private title!: string

  @Prop({ type: Boolean, default: false })
  private visible!: boolean

  private dialogVisible = false
  private form: RoleForm = {
    name: '',
    code: '',
    description: ''
  }

  @Watch('visible')
  changeVisible (newValue: boolean) {
    this.dialogVisible = newValue
  }

  @Prop({ type: Object, default: {} })
  private init!: Form

  @Watch('init')
  changeInit (newVal: Roles) {
    if (newVal) {
      this.form.id = newVal.id
      this.form.name = newVal.name
      this.form.code = newVal.code
      this.form.description = newVal.description
    }
  }

  private formLabelWidth = '120px'

  private toClose () {
    this.$emit('update:visible', false)
  }

  private async onSubmit () {
    const data = await saveOrUpdateRole(this.form)
    if (data.data.code === '000000') {
      this.$emit('update:visible', false)
      this.$emit('update', true)
    }
  }
}
</script>
<style scoped></style>
