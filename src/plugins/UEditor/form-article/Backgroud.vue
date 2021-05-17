<template>
  <div class="background">
    <el-alert title="背景图片将会覆盖背景色，如果只需要背景色，可以不上传背景图片。" type="info" show-icon :closable="false"> </el-alert>
    <el-form class="edit-form" label-width="80px" size="medium">
      <el-form-item label="背景色">
        <div class="colorGroup">
          <span v-for="obj in colorArr" :style="{background: '#'+obj}" @click="setColor('#'+obj)">{{obj}}</span>
          <el-color-picker v-model="color"></el-color-picker>
        </div>
      </el-form-item>
      <el-form-item label="背景图片">
        <form-upload type="image" :previewStyle="{ width: '192px',height: '108px'}"
        :accept="['jpg', 'jpeg', 'png']" :width="1920" :height="1080" v-model="image" max="1" ref="image"></form-upload>
        <p class="form-info">图片要求格式为jpg或png，分辨率为1920*1080。</p>
      </el-form-item>
      <el-form-item class="but-group">
        <el-button type="primary" @click="submit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import FormUpload from '@/components/form/FormUpload.vue'
export default {
  components: {
    FormUpload
  },
  data(){
    return {
      colorArr: ['c7000b','fdd000','6edd38','00a0da','143fab','ffffff','dcdcdc','c0c0c0','8a8a8a','707171','505050','2d2d2d'],
      color: '',
      image: ''
    }
  },
  methods:{
    setColor(val){
      this.color = val
    },
    submit(){
      if(this.$refs.image.current) return this.$notify.error({ title: '错误', message: '请等待图片上传完毕'})
      const image = this.image ? `${this.$prefix}${this.image}` : ''
      this.$emit('submit', {color: this.color, image: image})
    }
  }
}
</script>

<style scoped>
.edit-form{
  padding-top: 20px;
}
.colorGroup{
  display: flex;
  flex-wrap: wrap;
}
.colorGroup span{
  width: 80px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  margin-right: 10px;
  margin-bottom: 10px;
  color: #000;
  cursor: pointer;
}
</style>
