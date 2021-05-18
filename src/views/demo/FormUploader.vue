<template>
  <el-form class="edit-form" :model="form" :rules="rules" ref="edit" label-width="120px" size="medium">
    <h1>七牛云上传</h1>
    <el-form-item label="图片上传" prop="imgs">
      <Uploader v-model="form.imgsQN" :uploadType="1" :max="9"></Uploader>
    </el-form-item>
    <el-form-item label="文件上传" prop="files">
      <Uploader v-model="form.filesQN" :uploadType="1" type="file" :max="3" :accept="['ppt', 'pptx', 'doc', 'docx', 'xls', 'xlsx', 'pdf']"></Uploader>
    </el-form-item>
    <h1>服务器上传</h1>
    <el-form-item label="图片上传" prop="imgs">
      <Uploader v-model="form.imgs" :uploadType="0" prePath="user" :max="9"></Uploader>
    </el-form-item>
    <el-form-item label="文件上传" prop="files">
      <Uploader v-model="form.files" :uploadType="0" prePath="user" type="file" :max="3" :accept="['ppt', 'pptx', 'doc', 'docx', 'xls', 'xlsx', 'pdf']"></Uploader>
    </el-form-item>
    <el-form-item class="but-group">
      <el-button type="primary" @click="save('edit')">确定</el-button>
      <el-button @click="close">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        imgsQN: '/1621308344074/JTIyTXVsdGlhdmF0YXItV2VuZHklMjI=.png',
        filesQN: '/1621308494053/JTIyJUU2JTk2JUIwJUU1JUJCJUJBWExTJUU1JUI3JUE1JUU0JUJEJTlDJUU4JUExJUE4JTIy.xls',
        imgs: '',
        files: ''
      },
      rules: {}
    }
  },
  methods: {
    save(){

    },
    close(){
      
    }
  }
}
</script>

<style class="scss">
.edit-form {
  margin: 0 15px;
  padding: 50px;
  background: #ffffff;
}
</style>
