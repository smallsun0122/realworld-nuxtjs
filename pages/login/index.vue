<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ name }}</h1>
          <p class="text-xs-center">
            <nuxt-link v-if="!isLogin" to="/login">Have an account?</nuxt-link>
            <nuxt-link v-else to="/register">Need to register account?</nuxt-link>
          </p>

          <!-- 错误信息提示 -->
          <ul class="error-messages">
            <li v-for="(msgs, filed, index) in errors" :key="index">
              {{ filed }} {{ msgs }}
            </li>   
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset v-if="!isLogin" class="form-group">
              <input v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name" required>
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.email" class="form-control form-control-lg" type="email" placeholder="Email" required>
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password" required>
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ name }}
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '@/api/user'
const Cookie = process.client ? require('js-cookie') : undefined

export default {
  name: 'LoginIndex',
  // 引入中间件判断已登录跳转首页
  middleware: 'notAuthenticated',
  computed: {
    isLogin() {
      // 通过路由判断是否是登录页
      return this.$route.name === 'login'
    },
    name() {
      return this.isLogin ? 'Sign in' : 'Sign up'
    }
  },
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: ''
      },
      errors: {} // 错误信息
    }
  },
  methods: {
    async onSubmit() {
      try {
       const { data } = this.isLogin
          ? await login({
              user: this.user
            })
          : await register({
            user: this.user
          })

        this.$store.commit('setUser', data.user) 

        Cookie.set('user', data.user)
      
        // 跳转首页
        this.$router.push('/')
      } catch (err) {
        console.dir(err)
        // this.errors = err.response.data.errors
      }
      
    }
  }
}
</script>