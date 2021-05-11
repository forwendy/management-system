<template>
  <div class="password-login">
    <el-form ref="form" :model="form" label-width="50px">
      <el-form-item class="form-group">
        <span slot="label" class="iconfont icon-user"></span>
        <el-input clearable class="noborder" v-model="form.name" placeholder="用户名" @keyup.enter.native="login"></el-input>
      </el-form-item>
      <el-form-item class="form-group">
        <span slot="label" class="iconfont icon-lock"></span>
        <el-input show-password clearable type="password" class="noborder" v-model="form.password" placeholder="密码" @keyup.enter.native="login"></el-input>
      </el-form-item>
      <el-form-item class="form-group">
        <span slot="label" class="iconfont icon-verify"></span>
        <el-input class="noborder" v-model="form.code" placeholder="验证码" @keyup.enter.native="login">
          <div slot="suffix" class="code-pic">
            <img class="img-cover" :src="codePicSrc" @click="codeRefresh" />
          </div>
        </el-input>
      </el-form-item>
    </el-form>
    <el-button class="form-submit" type="primary" @click="login">登录</el-button>
  </div>
</template>

<script>
export default {
  data() {
    const uid = this.$utils.getUUID()
    return {
      loginId: uid,
      codePicBase: this.$axios.defaults.baseURL + '/security/getCodeImage/' + uid,
      codePicSrc: this.$axios.defaults.baseURL + '/security/getCodeImage/' + uid,
      form: {
        type: 1, //密码登录
        name: '',
        password: '',
        code: ''
      }
    }
  },
  methods: {
    codeRefresh() {
      const timenow = new Date().getTime()
      this.codePicSrc = this.codePicBase + '?date=' + timenow
    },
    login() {
      if (this.form.name === '') return this.$notify.warning({ title: '提示', message: '请输入用户名' })
      if (this.form.password === '') return this.$notify.warning({ title: '提示', message: '请输入密码' })
      if (this.form.code === '') return this.$notify.warning({ title: '提示', message: '请输入验证码' })

      this.$axios
        .post('security/checkCodeImage/' + this.loginId + '/' + this.form.code, {})
        .then((res) => {
          if (res.data.code == 200) {
            this.$emit('login', this.form)
          }
        })
        .finally(() => {
          this.codeRefresh()
        })
    }
  }
}
</script>