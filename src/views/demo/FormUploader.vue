<template>
  <el-form class="edit-form" :model="form" :rules="rules" ref="edit" label-width="120px" size="medium">
    <h1>华为云上传</h1>
    <el-form-item label="图片上传" prop="imgsHW">
      <Uploader v-model="form.imgsHW" :uploadType="2" :max="9"></Uploader>
    </el-form-item>
    <h1>七牛云上传</h1>
    <el-form-item label="图片上传" prop="imgsQN">
      <Uploader v-model="form.imgsQN" :uploadType="1" :max="9"></Uploader>
    </el-form-item>
    <el-form-item label="文件上传" prop="filesQN">
      <Uploader v-model="form.filesQN" :uploadType="1" type="file" :max="3" :accept="['ppt', 'pptx', 'doc', 'docx', 'xls', 'xlsx', 'pdf']" :disabled="true"></Uploader>
    </el-form-item>
    <el-form-item label="压缩文件上传" prop="compressFile">
      <Uploader v-model="form.compressFile" :uploadType="1" type="file" :accept="['zip', 'rar']"></Uploader>
    </el-form-item>
    <el-form-item label="视频文件上传" prop="mp4">
      <Uploader v-model="form.mp4QN" :uploadType="1" type="video"></Uploader>
    </el-form-item>
    <h1>服务器上传</h1>
    <el-form-item label="图片上传" prop="imgs">
      <Uploader v-model="form.imgs" :uploadType="0" prePath="user" :max="9" @change="change" @success="success" @fail="fail" ></Uploader>
    </el-form-item>
    <el-form-item label="文件上传" prop="files">
      <Uploader v-model="form.files" :uploadType="0" prePath="user" type="file" :max="3" :accept="['ppt', 'pptx', 'doc', 'docx', 'xls', 'xlsx', 'pdf']"></Uploader>
    </el-form-item>
    <el-form-item label="压缩文件上传" prop="compressFile">
      <Uploader v-model="form.compressFile" :uploadType="0" prePath="user" type="file" :max="3" :accept="['zip', 'rar']"></Uploader>
    </el-form-item>
    <el-form-item label="视频文件上传" prop="mp4">
      <Uploader v-model="form.mp4" :uploadType="0" prePath="user" type="video" :max="3"></Uploader>
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
    var validateNum = (rule, value, callback) => {
      const valueArr = value.split(',')
      if (valueArr.length < 3) {
        callback(new Error('请至少上传3张图片'))
      } else {
        callback()
      }
    }
    return {
      form: {
        imgsHW: '/1623311136352/4b5e90d2328adc367bb28934a4c97515e9e89b3c25184-Mlvhzy_fw658.jpg',
        imgsQN: '/1621308344074/JTIyTXVsdGlhdmF0YXItV2VuZHklMjI=.png',
        filesQN: '/1621308494053/JTIyJUU2JTk2JUIwJUU1JUJCJUJBWExTJUU1JUI3JUE1JUU0JUJEJTlDJUU4JUExJUE4JTIy.xls',
        mp4QN: '/1621393626866/53c901bf87f69efc6cb3980960e168b7.mp4',
        imgs: '/files/user/84fc7b78-6e7e-414e-8511-da4114122ad1.jpg,/files/user/2294b064-9259-4b63-bd9f-717badc8c8a2.jpg',
        // imgs: '',
        files: '',
        compressFile: '/files/user/238325b1-bcb9-411d-bf83-ce7befa6e5a2.zip',
        mp4: '/files/user/5f125d85-ddd0-45c4-bea9-5ac326b46297.mp4',
        mp3: ''
      },
      rules: {
        imgs: [
          { required: true, message: '请选择图片上传', trigger: 'change' },
          { validator: validateNum, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    change({ uploaded, list, valueArr }) {
      // uploaded 完成所有上传 （无论成功失败）
      // list 所有上传数据列表
      // valueArr 所有成功数据路径数组
      console.log(uploaded, list, valueArr)
    },
    success() {
      this.$message({
        message: '所有文件上传成功',
        type: 'success'
      })
    },
    fail(failObj) {
      this.$message.error(`【${failObj.name}】上传失败，请重新上传`)
    },
    save(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    close() {}
  }
}
</script>

<style lang="scss" scoped>
.edit-form {
  margin: 0 15px;
  padding: 50px;
  background: #ffffff;
}
</style>
