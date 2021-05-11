<template>
  <div class="message-login">
    <el-form ref="form" :model="form" label-width="50px">
      <el-form-item class="form-group">
        <span slot="label" class="iconfont icon-phone"></span>
        <el-input class="noborder" v-model="form.name" placeholder="手机号" @keyup.enter.native="login"></el-input>
      </el-form-item>
      <el-form-item class="form-group">
        <span slot="label" class="iconfont icon-verify"></span>
        <el-input class="noborder" v-model="form.code" placeholder="短信验证码" @keyup.enter.native="login">
          <el-button slot="suffix" type="text" @click="sendCode">
            <span v-if="count == 61">发送验证码</span>
            <span v-else>{{ count }}s</span>
          </el-button>
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
      count: 61,
      form: {
        type: 2, //短信登录
        name: '',
        password: '',
        code: ''
      }
    }
  },
  methods: {
    // 发送验证码
    sendCode() {
      if (this.form.name === '') return this.$notify.warning({ title: '提示', message: '请输入手机号' })
      const brandId = this.$store.state.brand.id
      this.$axios.post('account/checkMobile', { mobile: this.form.name, brand_id: brandId }).then((res) => {
        if (res.data.code == 200) {
          const mobile = this.form.name
          this.$axios.post('smscode/send/' + this.loginId + '/' + mobile, {}).then((res) => {
            if (res.data.code == 200) {
              if (this.count == 61) {
                const _this = this
                let timer = setInterval(count, 1000)
                this.$notify.success({ title: '成功', message: '短信发送成功' })
                function count() {
                  if (_this.count != 0) {
                    _this.count -= 1
                  } else {
                    _this.count = 61
                    clearInterval(timer)
                  }
                }
              }
            }
          })
        }
      })
    },
    login() {
      if (this.form.name === '') return this.$notify.warning({ title: '提示', message: '请输入手机号' })
      if (this.form.code === '') return this.$notify.warning({ title: '提示', message: '请输入短信验证码' })
      const brandId = this.$store.state.brand.id
      this.$axios.post('account/checkMobile', { mobile: this.form.name, brand_id: brandId }).then((res) => {
        if (res.data.code == 200) {
          const mobile = this.form.name
          const code = this.form.code
          this.$axios.post('smscode/check/' + this.loginId + '/' + mobile + '/' + code, {}).then((res) => {
            if (res.data.code == 200) {
              this.$emit('login', this.form)
            }
          })
        }
      })
    }
  }
}
</script>