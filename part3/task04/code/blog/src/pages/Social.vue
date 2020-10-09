<template>
<Layout>
  <div>
    <el-card shadow="never" style="min-height: 400px;margin-bottom: 20px;padding: 0px 0px 20px 0px">
      <el-tabs v-model="activeTab" type="card">
        <el-tab-pane :label="'粉丝'" name="followers" style="padding: 5px">
          <div>
            <div style="min-height: 300px;margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center">
              <font style="font-size: 30px;color:#dddddd ">
                <b>(￢_￢) 没有一个粉丝</b>
              </font>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="'关注'" name="following" style="padding: 5px">
          <div>
            <div style="min-height: 300px;margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center">
              <font style="font-size: 30px;color:#dddddd ">
                <b>(￢_￢) 还没有关注一个人</b>
              </font>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</Layout>
</template>

<script>
export default {
  data() {
    return {
      activeTab: "followers",
    }
  },
  methods: {
    onSelect () {
      console.log('onSelect')
    }
  }
}
</script>

<style>
</style>
