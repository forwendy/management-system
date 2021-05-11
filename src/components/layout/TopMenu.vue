<template>
  <div>
    <div class="left">
      <span class="iconfont icon-fold" :class="{ active: !leftMenuShow }" @click="CHANGE_LEFT_MENU"></span>
      <span>欢迎进入，{{ brandname }}</span>
    </div>
    <div class="right">
      <a v-button="'quick-enter'" class="quick-enter row" @click="toQuickEnter"><i class="iconfont">&#xe62a;</i>快捷入口</a>
      <span class="iconfont icon-help"></span>
      <el-badge is-dot class="message"><span class="iconfont icon-msg"></span></el-badge>
      <span class="user">
        <img class="user-avatar" :src="$res.prefix + useravatar" :onerror="$avatar" />
        <span>{{ username }}</span>
      </span>
      <el-dropdown class="exit" @command="set">
        <span class="iconfont icon-set"></span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="1">修改密码</el-dropdown-item>
          <el-dropdown-item command="2">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 修改密码 -->
    <el-dialog title="修改密码" width="500px" :visible.sync="dialogVisible" :before-close="beforeCloseDialog" append-to-body>
      <set-password v-if="dialogVisible" @close="dialogVisible = false"></set-password>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SetPassword from '@/views/common/SetPassword'
export default {
  components: {
    SetPassword
  },
  data() {
    return {
      dialogVisible: false // 模态窗
    }
  },
  computed: mapState({
    leftMenuShow: (state) => state.menus.leftMenuShow,
    brandname: (state) => state.brand.info.name,
    user: (state) => state.user,
    username: (state) => state.user.name,
    useravatar: (state) => state.user.avatar,
    quickEnter: (state) => state.menus.quickEnter
  }),
  methods: {
    // 关闭模态窗
    beforeCloseDialog(done) {
      done()
    },
    CHANGE_LEFT_MENU() {
      this.$store.commit('menus/CHANGE_LEFT_MENU')
    },
    exit() {
      this.$router.replace({ path: `/login` })
    },
    set(command) {
      if (command == 1) {
        this.dialogVisible = true
      }
      if (command == 2) {
        this.exit()
      }
    },
    // 查看所有功能
    toQuickEnter() {
      this.$router.push(this.quickEnter.path)
      this.$store.commit('menus/ADD_TAB', this.quickEnter)
    }
  }
}
</script>

<style lang="scss" scoped>
.top-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  line-height: 1;
  height: 40px;
  background: #fff;
  /* border-bottom: 1px solid #ddd; */
  color: #333;
}
.iconfont {
  color: #333;
}
.left {
  padding-left: 10px;
}
.left,
.right {
  display: inline-flex;
  align-items: center;
}
.icon-fold,
.icon-help,
.message,
.user-avatar {
  margin: 0 10px;
}
.icon-fold.active {
  display: inline-block;
  transform: rotate(180deg);
  transition: all 300ms;
}

.user,
.exit {
  display: inline-flex;
  align-items: center;
  padding-right: 15px;
  line-height: 1;
}
.user-avatar {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  vertical-align: middle;
}
.exit .iconfont {
  margin: 0 5px 0 15px;
}

.iconfont,
.exit {
  cursor: pointer;
}
.quick-enter {
  cursor: pointer;
  margin-right: 15px;
  color: #333333;
  line-height: 1;
  i {
    font-size: 12px;
    margin-right: 10px;
    color: rgba(59, 59, 59, 1);
  }
}
</style>
