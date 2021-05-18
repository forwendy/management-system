<template>
  <el-form class="edit-form" :model="form" :rules="rules" ref="edit" label-width="120px" size="medium">
    <el-form-item label="图片上传" prop="imgs">
      <Uploader v-model="form.imgs" :max="9"></Uploader>
    </el-form-item>
    <el-form-item label="文件上传" prop="files">
      <Uploader v-model="form.files" type="file" :max="3" :accept="['ppt', 'pptx', 'doc', 'docx', 'xls', 'xlsx', 'pdf']"></Uploader>
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
        imgs: '/1621305110045/JTIyNmM3MDQwNzYzNjM3ZjllMGE2MzVjMDlkZjQwMmMzODktJUU1JTg5JUFGJUU2JTlDJUFDLmolMjI=.jpg',
        files: '/1621305678940/JTIyJUU2JTk2JUIwJUU1JUJCJUJBRE9DJUU2JTk2JTg3JUU2JUExJUEzLmQlMjI=.doc'
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
