<template>
  <div v-show="tabs.length" class="tab-menus">
    <div class="tab-wrapper">
      <div style="display: flex; align-items: center;">
        <i class="el-icon-d-arrow-left prev-btn" :class="{'disabled': index === 0}" title="上一个窗口" @click="toPrev"></i>
        <div class="tab-window">
          <div class="tab-scroll" v-tabChange>
            <template v-for="(obj, i) in tabs">
              <span :key="'tab-item'+i" class="tab-item" :class="{ 'active': active == obj.id }" :id="'tab-'+obj.id">
                <span class="text" @click="showTab(obj)">{{ obj.name }}</span>
                <i v-if="obj.id != 'home'" class="el-icon-close" @click="removeTab(obj.id)"></i>
              </span>
            </template>
          </div>
        </div>
      </div>
      <i class="el-icon-d-arrow-right next-btn" :class="{'disabled': index === tabs.length-1}" title="下一个窗口" @click="toNext"></i>
    </div>
    <el-dropdown @command="closeTab" class="down-arrow">
      <span class="el-dropdown-link el-icon-arrow-down" style="display: block;"></span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="a">关闭当前页面</el-dropdown-item>
        <el-dropdown-item command="b">关闭其他页面</el-dropdown-item>
        <el-dropdown-item command="c">关闭所有页面</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      tabs:  state => state.menus.tabs,
      active: state => state.menus.activeId
    }),
    index(){
      return this.tabs.findIndex(el=>el.id === this.active)
    }
  },
  watch: {
    $route(){
      // 监听tab-item变化，重新渲染
      this.setLeft()
    }
  },
  methods:{
    // 显示tab
    showTab(obj){
      this.$router.push(obj.path)
      this.$store.commit('menus/SHOW_TAB', obj.id)
    },
    // 移除tab
    removeTab(id){
      this.$store.dispatch('menus/closeTab', id)
    },
    // 批量关闭tab
    closeTab(command) {
      const id = this.active
      if(command === 'a'){
        this.removeTab(id)
      }
      if(command === 'b'){
        this.$store.commit('menus/REMOVE_OTHER_TAB', id)
      }
      if(command === 'c'){
        this.$store.commit('menus/REMOVE_ALL_TAB')
      }
    },
    // 上一个tab
    toPrev(){
      if(this.index === 0) return
      const obj = this.tabs[this.index-1]
      this.showTab(obj)
    },
    // 下一个tab
    toNext(){
      if(this.index === this.tabs.length-1) return
      const obj = this.tabs[this.index+1]
      this.showTab(obj)
    },
    setLeft() {
      const id = this.active
      const el = document.querySelector(`[data-tab-scroll]`)
      const windowW = el.getBoundingClientRect().width
      const pLeft = el.getBoundingClientRect().left
      const active = el.querySelector('#tab-'+ id)
      if(active){
        const isShow = active.getBoundingClientRect().left - pLeft + active.getBoundingClientRect().width - windowW
        if(isShow > 0){
          el.style.left = - isShow + 'px'
        }else{
          el.style.left = 0
        }
      }
    }
  },
  directives: {
    tabChange: {
      // 指令的定义
      inserted: function (el, binding, vnode)  {
        const vm = vnode.context
        el.setAttribute('data-tab-scroll', '*')
        // 初始化结果
        vm.setLeft()
        // 监听window变化，重新渲染
        window.addEventListener('resize', vm.setLeft)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-menus{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 12px;
  .down-arrow{
    flex-shrink: 0;
    margin-right: 10px;
    font-size: 14px;
    cursor: pointer;
    color: #333;
  }
  .tab-wrapper{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .prev-btn,
    .next-btn{
      cursor: pointer;
      margin: 0 10px;
      &.disabled{
        cursor: not-allowed;
        color: #999999;
      }
    }
    .next-btn{
      align-items: flex-end;
    }
  }
}
.tab-window{
  width: 100%;
  height: 20px;
  overflow: hidden;
}
.tab-scroll{
  display: flex;
  align-items: center;
  position: relative;
}
.tab-item{
  flex-shrink: 0;
  cursor: pointer;
  color: #333;
  transition: all 400ms;
  position: relative;
  display: flex;
  align-items: center;
  line-height: 1;
  padding: 4px 10px 3px;
  border-radius: 14px;
  margin-right: 15px;
  .el-icon-close{
    font-size: 12px;
    line-height: 1;
    width: 13px;
    height: 13px;
    text-align: center;
    line-height: 13px;
    border-radius: 50%;
    margin-left: 5px;
    margin-right: -5px;
    &:hover{
      background: rgba(0, 0, 0, .2);
      color: #fff;
    }
  }
  &.active {
    background: $--color-primary;
    color: #fff;
    .el-icon-close:hover{
      background: rgba(255, 255, 255, .2);
    }
  }
}
</style>
