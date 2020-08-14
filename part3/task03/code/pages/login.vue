<template>
  <div class="auth-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">{{isLogin ? "Sign in" : "Sign up"}}</h1>
        <p class="text-xs-center">
          <nuxt-link to="/login" v-if="!isLogin">Have an account?</nuxt-link>
          <nuxt-link to="/register" v-else>Need an account?</nuxt-link>
        </p>

        <ul class="error-messages">
           <template v-for="(messages, field) in errors">
            <li v-for="(message, index) in messages" :key="index">
              {{ field }} {{ messages}}
            </li>
          </template>
        </ul>

        <form @submit.prevent="onSubmit">
          <fieldset class="form-group" v-if="!isLogin">
            <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="user.username">
          </fieldset>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" type="text" placeholder="Email" v-model="user.email">
          </fieldset>
          <fieldset class="form-group">
            <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="user.password" minlength="8">
          </fieldset>
          <button class="btn btn-lg btn-primary pull-xs-right">
             {{ isLogin ? 'Sign in' : 'Sign up' }}
          </button>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
let Cookie = process.client ? require('js-cookie'): undefined
import { login, register } from '@/api/user'

export default {
  name: "Login",
  computed: {
    isLogin(){
      return this.$route.name === "login";
    }
  },
  data(){
    return{
      user:{
        username: "",
        email: "",
        password: ""
      },
      errors: {}
    }
  },
  methods: {
    async onSubmit(){
      try{
        let { data } = this.isLogin ? await login({
          user: this.user
        }): await register({
          user: this.user
        });
        // 保存登录状态
        this.$store.commit('setUser', data.user);

        // 数据持久化
        Cookie.set('user', data.user);
        // 跳到首页
        this.$router.push('/');
      }catch(e){
        console.log(e);
        this.errors = e.response.data.errors
      }
    }
  }
}
</script>