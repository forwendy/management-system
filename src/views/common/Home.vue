<template>
  <div class="main">
    <div class="left">
      <brand style="height: 20vh"></brand>
      <left-menu style="height: 80vh" :class="{ active: !leftMenuShow }"></left-menu>
    </div>
    <div class="right" :class="{ active: !leftMenuShow }">
      <top-menu class="top-menu"></top-menu>
      <tab-menu class="tab-menu"></tab-menu>
      <div class="table" v-loading="tableLoading" element-loading-background="rgba(245, 250, 255, 0.8)">
        <el-scrollbar class="wrap" style="height: 100%">
          <keep-alive>
            <router-view v-if="isRouterAlive"></router-view>
          </keep-alive>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LeftMenu from '@/components/layout/LeftMenu.vue'
import TopMenu from '@/components/layout/TopMenu.vue'
import TabMenu from '@/components/layout/TabMenu.vue'
import Brand from '@/components/layout/Brand.vue'
export default {
  inject: ['localStorage'],
  name: 'Home',
  created() {
    this.localStorage()
  },
  components: {
    LeftMenu,
    TopMenu,
    TabMenu,
    Brand
  },
  computed: {
    ...mapState({
      leftMenuShow: (state) => state.menus.leftMenuShow,
      tableLoading: (state) => state.tableLoading,
      tabs: (state) => state.menus.tabs,
      active: (state) => state.menus.activeId
    })
  },
  watch: {
    $route: {
      handler() {
        // 根据路由判断当前菜单位置
        const path = this.$route.path
        this.$store.dispatch('menus/setActiveTab', path)
        this.right()
      },
      immediate: true
    }
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    },
    right() {
      const store = JSON.parse(localStorage.getItem(this.$localKey + 'Store'))
      const token = this.$store.state.user.token || store.user.token
      if (!token) {
        this.$router.replace('/login')
        return
      }
      const path = this.$route.path
      const menus = this.$store.state.user.menus
      if (path === '/welcome') return
      const has = menus
        .map((el) => {
          return el.view === path
        })
        .some((el) => {
          return el
        })
      if (!has) this.$router.replace('/welcome')
    }
  }
}
</script>

<style scoped>
.main {
  display: flex;
  /* min-width: 1024px; */
  min-width: 1440px;
  position: relative;
  background: #f5faff;
}
.left,
.right {
  height: 100vh;
}
.left {
  flex-shrink: 0;
  box-shadow: 0px 2px 10px 0px rgba(46, 42, 180, 0.08);
  z-index: 4;
}
.right {
  width: 100%;
  position: relative;
}
.top-menu {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 3;
  background: #ffffff;
}
.tab-menu {
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  z-index: 2;
}
.table {
  position: absolute;
  top: 80px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}
.left-menu {
  flex-shrink: 0;
  width: 200px;
}
</style>
