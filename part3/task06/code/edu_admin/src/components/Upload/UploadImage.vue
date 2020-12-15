<template>
  <div class="uploader">
    <el-progress
      v-show="uploading"
      class="upload-progress"
      type="circle"
      :width="178"
      :percentage="percentage"
      :status="percentage === 100 ? 'success' : undefined"
    />
    <el-upload
      v-show="!uploading"
      :accept="accept"
      class="uploader"
      action=""
      :show-file-list="false"
      :before-upload="beforeUpload"
      :http-request="handleRequest"
    >
      <img v-if="value" :src="value" class="img" />
      <i v-else class="el-icon-plus uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script lang="ts">
import { buildAcceptStr, uploadImage } from '@/api/upload'
import { Loading } from 'element-ui'
import {
  ElUploadInternalRawFile,
  HttpRequestOptions
} from 'element-ui/types/upload'
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class UploadeImage extends Vue {
  @Prop({ type: Array, required: false, default: [] })
  private acceptTypes!: string[]

  @Prop({ type: Number, required: false, default: 2 * 1024 * 1024 })
  private limit!: number

  @Prop({ type: String, default: '' })
  private value!: string

  private uploading = false
  private percentage = 0

  private beforeUpload (file: ElUploadInternalRawFile) {
    const isLt2M = file.size / 1024 / 1024 < this.limit

    if (!isLt2M) {
      this.$message.error(`上传头像图片大小不能超过 ${this.limit}MB!`)
    }
    return isLt2M
  }

  private async handleRequest (options: HttpRequestOptions) {
    this.uploading = true
    this.percentage = 0
    try {
      const fd = new FormData()
      fd.append('file', options.file)

      const {
        data: {
          data: { code, mesg, name }
        },
        data: res
      } = await uploadImage(
        fd,
        e => (this.percentage = Math.floor((e.loaded / e.total) * 100))
      )
      if (Number.parseInt(code)) {
        throw new Error('mesg')
      }
      this.$emit('syncImg', name)
    } catch (error) {
      this.$message.error(`上传失败: ${error}`)
    } finally {
      this.uploading = false
    }
  }

  private get accept (): string {
    return buildAcceptStr(this.acceptTypes)
  }
}
</script>

<style scoped>
.uploader ::v-deep .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.uploader ::v-deep .el-upload:hover {
  border-color: #409eff;
}
.uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.img {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
