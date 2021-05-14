<template>
  <div class="ui-image-view">
    <template v-if="multiple">
      <el-carousel class="carousel" :height="height">
        <el-carousel-item v-for="src in srcList" :key="src">
          <el-image class="image" :fit="fit" :src="src" :preview-src-list="srcList">
            <!-- 占位图 -->
            <img slot="placeholder" class="img-cover" :src="errorImg" />
            <!-- 加载失败 -->
            <img slot="error" class="img-cover" :src="errorImg" />
          </el-image>
        </el-carousel-item>
      </el-carousel>
    </template>
    <template v-else>
      <el-image class="image" :fit="fit" :src="prefix + src" :preview-src-list="srcList">
        <!-- 占位图 -->
        <img slot="placeholder" class="img-cover" :src="errorImg" />
        <!-- 加载失败 -->
        <img slot="error" class="img-cover" :src="errorImg" />
      </el-image>
    </template>
  </div>
</template>

<script>
import avatar from '@/assets/imgs/avatar_img_default.png'
import defaultImg from '@/assets/imgs/default_img.png'
export default {
  props: {
    prefix: { type: String, required: true },
    src: { type: String, required: true },
    fit: {
      type: String,
      default() {
        return 'cover'
      }
    },
    // 多图片查看
    multiple: {
      type: Boolean,
      default() {
        return false
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
    height: String
  },
  computed: {
    srcList() {
      return this.src.split(',').map((el) => {
        return this.prefix + el
      })
    },
    errorImg() {
      return this.avatar ? avatar : defaultImg
    }
  }
}
</script>

<style lang="scss">
.ui-image-view {
  .carousel {
    width: 100%;
    height: 100%;
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
  .image {
    width: 100%;
    height: 100%;
  }
}
</style>
