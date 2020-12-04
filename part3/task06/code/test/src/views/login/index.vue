<template>
  <div class="login">
    <el-form ref="form" :model="form" class="login-form">
      <el-form-item>
        <el-input
          placeholder="请输入用户名"
          prefix-icon="el-icon-user"
          v-model="form.username"
        >
        </el-input>
      </el-form-item>
      
      <el-form-item>
        <el-input
          placeholder="请输入密码"
          prefix-icon="el-icon-lock"
          type="password"
          v-model="form.password"
          auto-complete="off"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LoginIndex',
  data() {
    return {
      form: {
        'username': '',
        'password': ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.form)
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form{
    width: 300px;
    background: #ffffff;
    padding: 20px;
    border-radius: 5px;
  }
  .login-btn{
    width: 100%;
  }
}
</style>
