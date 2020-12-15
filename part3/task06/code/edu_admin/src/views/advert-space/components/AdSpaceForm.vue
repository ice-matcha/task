<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :before-close="closeDialog">
    <el-form :model="form">
      <el-form-item label="广告位名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
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
import { Form } from 'element-ui'
import { AdSpaceForm, AdSpace, createOrUpdateAdSpace } from '@/api/advert'

@Component
export default class RoleFrom extends Vue {
  @Prop({ type: String, required: true })
  private title!: string

  @Prop({ type: Boolean, default: false })
  private visible!: boolean

  private dialogVisible = false
  private form: AdSpaceForm = {
    name: ''
  }

  @Watch('visible')
  changeVisible (newValue: boolean) {
    this.dialogVisible = newValue
  }

  @Prop({ type: Object, default: {} })
  private init!: Form

  @Watch('init')
  changeInit (newVal: AdSpace) {
    if (newVal) {
      this.form.id = newVal.id
      this.form.name = newVal.name
    }
  }

  private formLabelWidth = '120px'

  private toClose () {
    this.$emit('update:visible', false)
  }

  private closeDialog () {
    this.$emit('update:visible', false)
  }

  private async onSubmit () {
    const data = await createOrUpdateAdSpace(this.form)
    this.$emit('update:visible', false)
    this.$emit('update', true)
    if (data.status === 200) {
      this.$message.success('success')
    } else {
      this.$message.error(data.data.message)
    }
  }
}
</script>
<style scoped></style>
