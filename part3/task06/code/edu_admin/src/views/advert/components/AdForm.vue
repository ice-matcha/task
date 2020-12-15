<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :before-close="closeDialog">
    <el-form :model="form">
      <el-form-item prop="name" label="广告名称" required :label-width="formLabelWidth">
        <el-input v-model="form.name" required />
      </el-form-item>
      <el-form-item prop="spaceId" label="广告位置" :label-width="formLabelWidth">
        <el-select v-model="form.spaceId">
          <el-option
            v-for="{ id, name } in spaces"
            :key="id"
            :label="name"
            :value="id"
          />
        </el-select>
      </el-form-item>
      <el-form-item prop="startTime" label="开始时间" required :label-width="formLabelWidth">
        <el-date-picker
          v-model="form.startTime"
          type="datetime"
          placeholder="选择开始时间"
        />
      </el-form-item>
      <el-form-item prop="endTime" label="到期时间" required :label-width="formLabelWidth">
        <el-date-picker
          v-model="form.endTime"
          type="datetime"
          placeholder="选择到期时间"
        />
      </el-form-item>
      <el-form-item prop="status" label="上线/下线" :label-width="formLabelWidth">
        <el-switch
          v-model="form.status"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="0"
        />
      </el-form-item>
      <el-form-item prop="img" label="广告图片" :label-width="formLabelWidth">
        <UploadeImage
          v-model="form.img"
          :limit="2"
          :acceptTypes="imageTypes"
          :value="defaultImg"
          @syncImg="syncImg"
        />
      </el-form-item>
      <el-form-item prop="link" label="广告链接" required :label-width="formLabelWidth">
        <el-input v-model="form.link" />
      </el-form-item>
      <el-form-item prop="text" label="广告备注" :label-width="formLabelWidth">
        <el-input v-model="form.text" type="textarea" />
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
import { AdParamForm, Ad, AdSpace, getSpace, createOrUpdateAd } from '@/api/advert'
import { ImageTypes } from '@/api/upload'
import UploadeImage from '@/components/Upload/UploadImage.vue'

@Component({
  components: { UploadeImage }
})
export default class AdFrom extends Vue {
  $refs!: {
    form: Form
  }

  @Prop({ type: String, required: true })
  private title!: string

  @Prop({ type: Boolean, default: false })
  private visible!: boolean

  private dialogVisible = false
  private spaces: AdSpace[] = []
  private imageTypes: string[] = ImageTypes
  private defaultImg = ''
  private form: Partial<Ad> = {
    name: '',
    spaceId: 0,
    startTime: '',
    endTime: '',
    status: 1,
    img: '',
    link: '',
    text: ''
  }

  @Watch('visible')
  changeVisible (newValue: boolean) {
    this.dialogVisible = newValue
  }

  @Prop({ type: Object, default: {} })
  private init!: Form

  @Watch('init')
  changeInit (newVal: Ad) {
    if (newVal) {
      this.form.id = newVal.id
      this.form.name = newVal.name
      this.form.spaceId = newVal.spaceId
      this.form.startTime = newVal.startTime
      this.form.endTime = newVal.endTime
      this.form.status = newVal.status
      this.form.link = newVal.link
      this.form.text = newVal.text
      this.form.img = newVal.img
      this.defaultImg = newVal.img
    }
  }

  private formLabelWidth = '120px'

  created () {
    this.getAllSpaces()
  }

  private async getAllSpaces () {
    const data = await getSpace()
    this.spaces = data.data.content
  }

  private syncImg (img: string) {
    this.form.img = img
    this.defaultImg = img
  }

  private toClose () {
    this.$emit('update:visible', false)
  }

  private closeDialog () {
    this.$emit('update:visible', false)
  }

  private async onSubmit () {
    const data = await createOrUpdateAd(this.form)
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
