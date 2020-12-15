<template>
  <div class="role-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-row type="flex" justify="space-between">
          广告位管理
          <div class="operations">
            <el-button size="mini" type="primary" @click="addAdSpace">添加广告位</el-button>
          </div>
        </el-row>
      </div>
    </el-card>

    <el-table :data="data">
      <el-table-column prop="spaceKey" label="编号" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="updateTime" label="更新时间" />
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button size="mini" @click="editAdSpace(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <space-form
      :visible.sync="dialogVisible"
      :title="title"
      :init="init"
      @update="getAllSpace()"
    ></space-form>

  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Ad, AdSpace, getSpace } from '@/api/advert'
import SpaceForm from './AdSpaceForm.vue'

@Component({
  components: { SpaceForm }
})
export default class List extends Vue {
  private init: AdSpace & any = {}

  private data: AdSpace[] = []
  private dialogVisible = false
  private title = '添加广告位'

  created () {
    this.getAllSpace()
  }

  /**
   * 获取所有广告位数据
   */
  private async getAllSpace () {
    const data = await getSpace()
    this.data = data.data.content
  }

  /**
   * 添加广告位
   */
  private addAdSpace () {
    this.title = '添加广告位'
    this.dialogVisible = true
    this.init = {}
  }

  /**
   * 编辑广告位
   */
  private editAdSpace (data: AdSpace) {
    this.title = '编辑广告位'
    this.dialogVisible = true
    this.init = data
  }
}
</script>

<style scoped></style>
