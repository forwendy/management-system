<template>
  <div class="upload-image">
    <el-form class="edit-form" size="medium">
      <el-form-item v-show="type == 'image'">
        <form-upload type="image" :uploadType="1" :width="500" :height="300" :maxMB="3" :accept="['jpg', 'jpeg', 'png']" v-model="image"></form-upload>
        <p class="form-info">建议使用.jpg、.png格式，图片应小于3M。</p>
      </el-form-item>
      <el-form-item v-show="type == 'video'">
        <form-upload type="video" :uploadType="1" :width="500" :height="300" :maxMB="100" v-model="video"></form-upload>
        <p class="form-info">建议使用.mp4格式，视频应小于100M。</p>
      </el-form-item>
      <el-form-item class="but-group">
        <el-button type="primary" @click="submit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import FormUpload from '@/plugins/uploader/Uploader.vue'
export default {
  components: {
    FormUpload
  },
  props: {
    type: String
  },
  data() {
    return {
      image: '',
      video: ''
    }
  },
  methods: {
    submit() {
      if (this.type == 'image') {
        this.$emit('submit', this.image)
      }
      if (this.type == 'video') {
        this.$emit('submit', this.video)
      }
    }
  }
}
</script>

<style scoped></style>
