<template>
  <div class="main">
    <img class="bg img-cover" src="../../assets/imgs/bg@2x.png">
    <div class="left">
      <img class="img-cover" :src="$res.prefix" :onerror="$errorImg" />
    </div>
    <div class="right">
      <div class="login-box">
        <h1>运营平台</h1>
        <el-tabs stretch v-model="way">
          <el-tab-pane label="密码登录" name="0">
            <password-login @login="login"></password-login>
          </el-tab-pane>
          <el-tab-pane label="短信登录" name="1">
            <message-login @login="login"></message-login>
          </el-tab-pane>
          <!-- <el-tab-pane label="扫码登录" name="2">
                      <QRCode-login></QRCode-login>
                    </el-tab-pane> -->
        </el-tabs>
      </div>
    </div>
    <p class="copyright">
      Copyright © 2014-{{ year }} 运营平台 - Powered By OVU beta V1.0
    </p>
  </div>
</template>

<script>
import PasswordLogin from './components/PasswordLogin'
import MessageLogin from './components/MessageLogin'
import QRCodeLogin from './components/QRCodeLogin'
export default {
  components: {
    PasswordLogin,
    MessageLogin,
    QRCodeLogin
  },
  created() {
    // 返回登录页的时候清除全局缓存数据
    localStorage.removeItem(this.$localKey + 'Store')
    const init = this.$store.getters.reset
    this.$store.replaceState(init)
  },
  data() {
    return {
      year: new Date().getFullYear(),
      way: 0 // 登录方式
    }
  },
  methods: {
    login(form) {

    }
  }
}
</script>

<style lang="scss" scoped>
.main {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .bg{
    position: absolute;
    height: 100vh;
    width: 100vw;
    z-index: -1;
  }
}
.copyright {
  position: absolute;
  bottom: 0;
}
.left {
  width: 36.5vw;
  /* height: 64.8vh; */
  height: 610px;
  box-shadow: 0px 6px 23px 4px rgba(10, 117, 111, 0.3);
  border-radius: 4px 0 0 4px;
  overflow: hidden;
}

.right {
  margin-left: -9px;
  width: 530px;
  height: 710px;
  background: #fff;
  box-shadow: 0px 6px 23px 4px rgba(10, 117, 111, 0.3);
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  justify-content: center;
}

.login-box {
  padding: 140px 30px 30px;
}

.login-box h1 {
  font-size: 26px;
  font-weight: 500;
  color: #333;
  padding: 0 15px;
  text-align: center;
}
</style>
