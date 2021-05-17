<template>
  <div class="fixed-btn btn-group">
    <template v-if="btns.length === 1">
      <el-tooltip effect="dark" :content="addObj.name" placement="top">
        <span v-if="addObj.show" class="el-icon-plus circle-btn" @click="click(addObj.event)"></span>
      </el-tooltip>
    </template>
    <template v-else>
      <transition v-for="obj in btns" :key="obj.name" name="slide-fade">
        <div v-show="unfold">
          <div v-if="obj.show" class="circle-btn" @click="click(obj.event)">{{ obj.name }}</div>
        </div>
      </transition>
      <span v-if="unfold" class="el-icon-plus circle-btn close" @click="handle"></span>
      <span v-else class="iconfont icon-menus circle-btn" @click="handle"></span>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    arr: {
      type: Array,
      default() {
        return [
          {
            name: '新增',
            event: 'add',
            // 权限标志
            rightKey: null
          }
        ]
      }
    }
  },
  data() {
    return {
      unfold: false
    }
  },
  computed: {
    ...mapGetters({
      rights: 'user/button'
    }),
    addObj() {
      return (
        this.btns[0] || {
          name: '新增',
          event: 'add',
          // 权限标志
          rightKey: null
        }
      )
    },
    btns() {
      return this.arr.map((el) => {
        if (el.rightKey) {
          const user = this.rights
          const pass = el.rightKey.split(',')
          // 任意一个身份通过，即为通过
          const isPass = user.some((el) => {
            return pass.find((u) => u == el)
          })
          if (isPass) {
            el.show = true
          } else {
            el.show = false
          }
        } else {
          el.show = true
        }
        return el
      }).filter(el=>{
        return el.show
      })
    }
  },
  methods: {
    handle() {
      this.unfold = !this.unfold
    },
    click(eventName) {
      this.$emit(eventName)
      this.handle()
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-group {
  position: fixed;
  right: 30px;
  bottom: 50px;
  z-index: 1000;
  .circle-btn {
    display: block;
    box-sizing: border-box;
    width: 60px;
    height: 60px;
    background: rgba($--color-primary, 0.9);
    color: #ffffff;
    text-align: center;
    line-height: 60px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    &.el-icon-plus.close {
      transform: rotate(45deg);
      transition: all 0.3s ease;
    }
    &.el-icon-plus,
    &.icon-menus {
      font-size: 30px;
    }
    margin-top: 10px;
  }
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
</style>
