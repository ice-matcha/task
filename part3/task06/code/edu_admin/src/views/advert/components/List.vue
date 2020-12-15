<template>
  <div class="role-list">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-row type="flex" justify="space-between">
          广告管理
          <div class="operations">
            <el-button size="mini" type="primary" @click="addAd">添加广告</el-button>
          </div>
        </el-row>
      </div>
    </el-card>

    <el-table :data="ad">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="createTime" label="位置">
        <template slot-scope="{ row }">
          {{ spacesName[row.spaceId] }}
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="图片">
        <template slot-scope="{ row }">
          <el-image
            style="width: 100px; height: 100px"
            :src="row.img"
            fit="cover"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="时间" min-width="100px">
        <template slot-scope="{ row }">
          <div>开始时间: {{ row.startTimeFormatString }}</div>
          <div>结束时间: {{ row.endTimeFormatString }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="上线/下线" align="center">
        <template slot-scope="{ row }">
          <el-switch
            v-model="row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
            :disabled="adUpdating[row.id]"
            @change="stateChange(row)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row }">
          <el-button size="mini" @click="editAd(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <ad-form
      :visible.sync="dialogVisible"
      :title="title"
      :init="init"
      @update="getAllAdList()"
    ></ad-form>

  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Form } from 'element-ui'
import { Ad, AdSpace, getAdList, getSpace, updateStatus } from '@/api/advert'
import AdForm from './AdForm.vue'

@Component({
  components: { AdForm }
})
export default class RoleList extends Vue {
  private init: Ad & any = {}

  private ad: Ad[] = []
  private spaces: AdSpace[] = []
  private dialogVisible = false
  private title = '添加广告'
  private adUpdating: Record<number, boolean> = {}

  created () {
    this.getAllAdList()
    this.getAllSpaces()
  }

  /**
   * 获取所有广告数据
   */
  private async getAllAdList () {
    const data = await getAdList()
    this.ad = data.data.content
  }

  /**
   * 获取所有的广告位
   */
  private async getAllSpaces () {
    const data = await getSpace()
    this.spaces = data.data.content
  }

  private get spacesName (): Record<number, string> {
    return (this.spaces || []).reduce((acc, cur) => {
      acc[cur.id] = cur.name
      return acc
    }, {} as Record<number, string>)
  }

  /**
   * 修改状态
   */
  private async stateChange (ad: Ad) {
    this.$set(this.adUpdating, ad.id, true)
    try {
      const {
        data: { data, code, mesg }
      } = await updateStatus(ad.id, ad.status)
      if (Number.parseInt(code)) {
        throw new Error(mesg)
      }
      this.$message.success(`${ad.status ? '上线' : '下线'}成功`)
    } catch (error) {
      this.$message.error(`Error when change state: ${error}`)
      ad.status = ad.status ? 0 : 1
    } finally {
      this.$set(this.adUpdating, ad.id, false)
    }
  }

  /**
   * 添加广告
   */
  private addAd () {
    this.title = '添加广告'
    this.dialogVisible = true
    this.init = {}
  }

  /**
   * 编辑广告
   */
  private editAd (ad: Ad) {
    this.title = '编辑广告'
    this.dialogVisible = true
    this.init = ad
  }
}
</script>

<style scoped></style>
