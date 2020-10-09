<template>
<Layout>
  <div style="min-height: 600px">
    <el-card shadow="never" style="margin-bottom: 20px">
      <el-input placeholder="请输入关键字" v-model="searchKey" clearable style="width: 300px"></el-input>
      <el-button icon="el-icon-search" style="margin-left: 10px" circle plain></el-button>
      <el-button style="margin-left: 10px" icon="el-icon-share" type="warning" plain circle></el-button>
      <el-button type="primary" icon="el-icon-edit" round plain style="float: right;" >写博文</el-button>
    </el-card>

    <div v-if="blogs&&blogs.length>0">
      <el-card shadow="hover" v-for="({node: item},index) in blogs" :key="'p'+index" style="margin-bottom: 20px" v-if="!item.hide">
        <div slot="header">
          <el-row>
            <el-col :span="16">
              <span>
                <a style="text-decoration:none;cursor:pointer">
                  <i class="el-icon-edit-outline"></i>&nbsp;&nbsp; {{item.title}}
                </a>
              </span>
            </el-col>
          </el-row>
        </div>
        <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
          最近更新 {{item.updateTime}}
        </div>
        <div style="font-size: 1.1rem;line-height: 1.5;color: #303133;padding: 10px 0px 0px 0px">
          {{item.description}}
        </div>
      </el-card>
      <div style="text-align: center">
      </div>

    </div>

    <el-card shadow="never" style="margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center" v-if="!blogs||blogs.length==0">
      <font style="font-size: 30px;color:#dddddd ">
        <b>还没有博客 (╯°Д°)╯︵ ┻━┻</b>
      </font>
    </el-card>
  </div>
</Layout>
</template>
<page-query>
query {
  blog: allStrapiBlog{
    edges{
      node{
        id
        title
        content
        created_at
        updated_at
      }
    }
  }
}
</page-query>
<script>
export default {
  data () {
    return {
      searchKey: ''
    }
  },
  methods: {
    search () {
    },
    goAdd () {
    },
    token () {
    }
  },
  computed: {
    blogs() {
      return this.$page.blog.edges
    }
  }
}
</script>

<style>
</style>