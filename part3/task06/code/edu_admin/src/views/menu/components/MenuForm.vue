<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :before-close="closeDialog">
    <el-form :model="form">
      <el-form-item label="菜单名称" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="菜单路径" :label-width="formLabelWidth">
        <el-input v-model="form.href" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单" :label-width="formLabelWidth" prop="parentId">
        <el-select v-model="form.parentId" placeholder="请选择上级菜单">
          <el-option :value="-1" label="无上级菜单"></el-option>
          <el-option
            v-for="item in parentOptionList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述" :label-width="formLabelWidth">
        <el-input v-model="form.description" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="前端图标" :label-width="formLabelWidth">
        <el-input v-model="form.icon" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="是否显示" :label-width="formLabelWidth">
        <el-radio v-model="form.shown" :label=true>是</el-radio>
        <el-radio v-model="form.shown" :label=false>否</el-radio>
      </el-form-item>
      <el-form-item label="排序" :label-width="formLabelWidth">
        <el-input v-model="form.orderNum" autocomplete="off"></el-input>
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
import { MenusForm, Menu, createOrUpdateMenu, getEditMenuInfo } from '@/api/menu'

type ParentOptionItem = Pick<Menu, 'id' | 'name'>

@Component
export default class MenuForm extends Vue {
  @Prop({ type: String, required: true })
  private title!: string

  @Prop({ type: Boolean, default: false })
  private visible!: boolean

  private dialogVisible = false
  private parentMenuList: Menu[] = []
  private form: MenusForm = {
    parentId: 1,
    name: '',
    href: '',
    icon: '',
    description: '',
    shown: false,
    orderNum: 0
  }

  @Watch('visible')
  changeVisible (newValue: boolean) {
    this.dialogVisible = newValue
  }

  @Prop({ type: Object, default: {} })
  private init!: Form

  @Watch('init')
  changeInit (newVal: Menu) {
    if (newVal) {
      this.form.id = newVal.id
      this.form.parentId = newVal.parentId
      this.form.name = newVal.name
      this.form.href = newVal.href
      this.form.description = newVal.description
      this.form.icon = newVal.icon
      this.form.shown = newVal.shown
      this.form.orderNum = newVal.orderNum
    }
  }

  private formLabelWidth = '120px'

  created () {
    this.toGetEditMenuInfo()
  }

  private closeDialog () {
    this.$emit('update:visible', false)
  }

  private async toGetEditMenuInfo () {
    const {
      data: {
        code,
        data: { menuInfo, parentMenuList }
      }
    } = await getEditMenuInfo(this.$route.params.id || '-1')
    if (Number.parseInt(code)) {
      this.$message.error('获取上级菜单失败, 请联系管理员')
      return
    }

    if (menuInfo) {
      this.form = menuInfo
    }
    this.parentMenuList = parentMenuList || []
  }

  private get parentOptionList (): ParentOptionItem[] {
    return this.parentMenuList.map(parent => ({
      name: parent.name,
      id: parent.id
    }))
  }

  private toClose () {
    this.$emit('update:visible', false)
  }

  private async onSubmit () {
    const data = await createOrUpdateMenu(this.form)
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
