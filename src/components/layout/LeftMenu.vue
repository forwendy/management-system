<template>
  <div class="menu">
    <el-scrollbar style="height: 100%;" class="no-h">
      <el-menu
         :unique-opened="true"
         :default-active="active"
         :collapse-transition="false"
         :collapse="!isCollapse">
        <template v-for="a in tree">
          <template v-if="!a.children">
            <el-menu-item :index="a.id" :key="a.id" @click="showMenu(a)">
              <i class="iconfont icon" v-html="a.icon"></i>
              <span slot="title">{{a.name}}</span>
            </el-menu-item>
          </template>
          <template v-else>
            <el-submenu :index="a.id" :key="a.id">
              <!-- 主菜单标题 -->
              <template slot="title">
                <i class="iconfont icon" v-html="a.icon"></i>
                <span>{{a.name}}</span>
              </template>
              <div v-for="b in a.children" :key="b.id">
                <!-- 下级 -->
                <el-submenu v-if="b.children" :index="b.id">
                  <span slot="title">{{ b.name }}</span>
                  <el-menu-item v-for="c in b.children" :key="c.id" :index="c.id" @click="showMenu(c)">{{c.name}}</el-menu-item>
                </el-submenu>
                <!-- 下级 -->
                <!-- 分组 -->
                <!-- <el-menu-item-group v-if="b.children">
                  <span slot="title">{{b.name}}</span>
                  <el-menu-item v-for="c in b.children" :index="c.id" @click="showMenu(c)">
                    <span slot="title">{{c.name}}</span>
                  </el-menu-item>
                </el-menu-item-group> -->
                <!-- 分组 -->
                <el-menu-item v-if="!b.children" :index="b.id" @click="showMenu(b)"> {{b.name}} </el-menu-item>
              </div>
            </el-submenu>
          </template>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState({
      active: state => state.menus.activeId,
      isCollapse: state => state.menus.leftMenuShow
    }),
    ...mapGetters({
      tree: 'menus/tree'
    })
  },
  methods: {
    // 打开页面
    showMenu(obj){
      this.$router.push(obj.path)
      this.$store.commit('menus/ADD_TAB', obj)
    }
  }
}
</script>

<style>
.menu .li:hover{
  background: transparent;
}
.menu,
.menu .el-menu{
  background: #20222A;
  border: none;
}
.menu .el-submenu__title,
.menu .el-menu-item,
.menu .el-submenu__title i,
.menu .el-menu-item i{
  color: #fff;
}
.menu .el-submenu__title:hover,
.menu .el-menu-item:hover{
  background: #2684DA;
}
.menu .el-submenu__title:hover,
.menu .el-menu-item:hover,
.menu .el-submenu__title:hover i,
.menu .el-menu-item:hover i,
.menu .el-menu-item.is-active i{
  color: #fff;
}
.menu .el-menu-item:focus, 
.menu .el-menu-item:hover{
  background: #2684DA;
}
.menu .el-menu-item.is-active{
  background: #2684DA;
  color: #fff;
}
.menu .icon{
  margin-right: 15px;
  width: 24px;
  text-align: center;
  font-size: 18px;
  vertical-align: middle;
}
</style>
