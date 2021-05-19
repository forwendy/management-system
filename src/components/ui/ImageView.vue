<template>
  <div class="ui-image-view">
    <template v-if="list.length > 1">
      <el-carousel class="carousel" :style="showWH" :height="height">
        <el-carousel-item v-for="src in list" :key="src">
          <template v-if="type === 'image'">
            <el-image :style="showWH" :fit="fit" :src="src" :preview-src-list="list" :z-index="3000">
              <!-- 占位图 -->
              <div slot="placeholder" class="placeholder">
                <a class="el-icon-loading"></a>
              </div>
              <!-- 加载失败 -->
              <img slot="error" class="img-cover" :src="errorImg" />
            </el-image>
          </template>
          <template v-if="type === 'video'">
            <video :style="showWH" :src="src" controls></video>
          </template>
        </el-carousel-item>
      </el-carousel>
    </template>
    <template v-else>
      <template v-if="type === 'image'">
        <el-image :style="showWH" :fit="fit" :src="one" :preview-src-list="list" :z-index="3000">
          <!-- 占位图 -->
          <div slot="placeholder" class="placeholder">
            <a class="el-icon-loading"></a>
          </div>
          <!-- 加载失败 -->
          <img slot="error" class="img-cover" :src="errorImg" />
        </el-image>
      </template>
      <template v-if="type === 'video'">
        <video :style="showWH" :src="one" controls></video>
      </template>
    </template>
  </div>
</template>

<script>
import avatar from '@/assets/imgs/avatar_img_default.png'
import defaultImg from '@/assets/imgs/default_img.png'
export default {
  props: {
    prefix: { type: String, required: true },
    src: { required: true },
    fit: {
      type: String,
      default() {
        return 'cover'
      }
    },
    // 头像默认图
    avatar: {
      type: Boolean,
      default() {
        return false
      }
    },
    width: String,
    height: String,
    type: {
      // 上传文件类型 [image, video, file, audio]
      type: String,
      default: function () {
        return 'image'
      }
    }
  },
  computed: {
    inputValue() {
      return typeof this.src === 'string' ? this.src : ''
    },
    // 一个元素
    one() {
      if (this.list.length === 1) {
        return this.prefix + this.inputValue
      } else {
        return ''
      }
    },
    // 多个个元素
    list() {
      if (this.inputValue) {
        return this.inputValue.split(',').map((el) => {
          return this.prefix + el
        })
      } else {
        return []
      }
    },
    errorImg() {
      return this.avatar ? avatar : defaultImg
    },
    // 元素展示宽高
    showWH() {
      return { width: this.width, height: this.height }
    }
  }
}
</script>

<style lang="scss">
.ui-image-view {
  .carousel {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    .el-carousel__arrow {
      width: 30px;
      height: 30px;
    }
    .el-carousel__indicator--horizontal {
      padding: 6px 4px;
    }
    .el-carousel__button {
      width: 6px;
      height: 6px;
      border-radius: 50%;
    }
  }
  .placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    background: rgba(0, 0, 0, 0.1);
  }
}
</style>
