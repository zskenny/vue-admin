<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on">
      <div class="title-container">
        <h3 class="title">系统管理控制台 <small>V1.0</small></h3>
      </div>

      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="登录帐号"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
          prefix-icon="icon-user"
        />
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          ref="password"
          v-model="loginForm.password"
          placeholder="登录密码"
          name="password"
          type="password"
          tabindex="2"
          auto-complete="on"
          prefix-icon="icon-lock"
          @keyup.enter.native="handleLogin"
        />
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >登 录</el-button>
    </el-form>

    <div class="footer">
      &copy;2019
      <a href="https://www.yelink.net" target="_blank">亿联互动</a>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: 'admin888'
      },
      loginRules: {
        username: [{ required: true, message: '请输入登录帐号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入登录密码', trigger: 'blur' }]
      },
      loading: false
    }
  },
  methods: {
    handleLogin (fromname) {
      this.$refs.loginForm.validate(valid => {
        if (!valid) return false
        this.loading = true
        this.$store.dispatch('admin/login', this.loginForm)
          .then(() => {
            this.$router.push({ path: '/' })
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  background-color: #2d3a4b;
  min-height: 100%;
  .login-form {
    position: relative;
    width: 400px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }
  .title-container {
    position: relative;
    .title {
      font-size: 26px;
      color: #eee;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: 300;
      small{
        font-size: 12px;
        color:#ffcc00;
      }
    }
  }
  .footer {
    position: absolute;
    bottom: 0;
    text-align: center;
    color: #ccc;
    width: 100%;
    padding: 20px;
    line-height: 30px;
  }
}
</style>
