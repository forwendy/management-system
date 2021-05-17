<template>
  <div class="upload-item" :style="{ width: width, height: height }" :class="{ fail: status === 3, success: status === 4 }">
    <!-- 上传成功 -->
    <a v-show="status === 4" class="status-label el-icon-success"></a>
    <!-- 上传失败 -->
    <a v-show="status === 3" class="status-label el-icon-error"></a>
    <!-- 遮罩 -->
    <div class="upload-mask" :class="{ waiting: status < 3 }">
      <!-- 查看文件/图片 -->
      <a v-show="status === 4" class="el-icon-zoom-in" title="查看文件"></a>
      <!-- 上传失败 重新上传 -->
      <a v-show="status === 3" class="el-icon-refresh-right" @click="reload" title="重新上传"></a>
      <!-- 删除文件 -->
      <a v-show="status > 2 && !disabled" class="el-icon-delete" @click="remove" title="删除文件"></a>
      <!-- 上传中 -->
      <a v-show="status === 2" class="loading-text">{{ percentComplete + '%' }}</a>
      <!-- 等待上传 -->
      <a v-show="status === 1" class="el-icon-loading"></a>
    </div>
    <!-- 图片展示 -->
    <img v-if="type === 'image'" class="img-cover" :src="image" />
    <template v-show="type === 'file'">
      <img v-if="typeSuffix === 'pdf'" class="file" src="../uploader/images/pdf.png" />
      <img v-if="typeSuffix === 'ppt'" class="file" src="../uploader/images/ppt.png" />
      <img v-if="typeSuffix === 'xls'" class="file" src="../uploader/images/xls.png" />
      <img v-if="typeSuffix === 'doc'" class="file" src="../uploader/images/doc.png" />
    </template>
  </div>
</template>

<script>
export default {
  created() {
    this.handle()
  },
  data() {
    return {
      value: '',
      image: '', // 当前上传图片地址
      status: 0, // 1等待上传 2上传中 3上传失败 4上传成功
      percentComplete: 0, // 上传进度
      uploadQNURL: this.$uploader.uploadQN,
      uploadURL: this.$uploader.upload
    }
  },
  watch: {
    src() {
      // 数据改变，组件内部刷新
      this.handle()
    }
  },
  computed: {
    typeSuffix() {
      // 预览文件
      const name = this.src.name.split('.')[1]
      // iconfont
      if ('xls'.indexOf(name) > -1) {
        return 'xls'
      }
      if ('docx'.indexOf(name) > -1) {
        return 'doc'
      }
      if ('ppt'.indexOf(name) > -1) {
        return 'ppt'
      }
      if ('pdf'.indexOf(name) > -1) {
        return 'pdf'
      }
    }
  },
  methods: {
    handle() {
      // if (this.file.status < 4) {
      //   // 未上传
      //   this.preview(this.file.src)
      // } else {
      //   // 已上传
      //   this.image = this.file.path
      // }
      // // 服务器上传
      // if (this.uploadType === 0) {
      //   this.upload(this.file.src)
      // }
      // // 七牛云上传
      // if (this.uploadType === 1) {
      //   this.uploadQN(this.file.src)
      // }
      this.status = this.file.status
    },
    // 移除
    remove() {
      this.$confirm('确定移除此图片？')
        .then(() => {
          this.$emit('remove', this.index)
        })
        .catch(() => {})
    },
    // 上传成功
    success(path) {
      this.value = path
      this.image = this.$prefix + path
      this.$emit('success', { index: this.index, path: path })
      this.status = 4
    },
    fail(res) {
      this.status = 3
      this.$emit('fail', { index: this.index })
    },
    preview(file) {
      if (this.type === 'image') {
        // 预览图片
        let reader = new FileReader()
        reader.file = file
        reader.readAsDataURL(file)
        reader.onload = (res) => {
          this.image = res.currentTarget.result
        }
      }
    },
    // 重新上传
    reload() {
      this.status = 2
      // 服务器上传
      if (this.uploadType === 0) {
        this.upload(this.src)
      }
      // 七牛云上传
      if (this.uploadType === 1) {
        this.uploadQN(this.src)
      }
    },
    // 上传
    upload() {
      this.status = 2
    },
    // 七牛云上传
    uploadQN(file) {
      this.status = 2
      const fileData = new FormData()
      const key = new Date().getTime() + '&' + this.$utils.replaceTrim(file.name)
      fileData.append('file', file)
      fileData.append('key', key)
      this.$getQNToken(file).then((uptoken) => {
        fileData.append('token', uptoken)
        this.httpRequest({ data: fileData, uploadURL: this.uploadQNURL })
      })
    },
    // 原生上传方法
    httpRequest({ data, uploadURL }) {
      let xhr = {}
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest()
      } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
      }
      // 设置url
      xhr.open('POST', uploadURL, true)
      // 上传进度读取
      xhr.upload.addEventListener(
        'progress',
        (evt) => {
          if (evt.lengthComputable) {
            this.percentComplete = Math.round((evt.loaded * 100) / evt.total)
          }
        },
        false
      )
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200 && xhr.responseText !== '') {
            // 上传成功
            const data = JSON.parse(xhr.responseText)
            this.success(`/${data.key}`)
          } else {
            // 上传失败
            const res = JSON.parse(xhr.responseText)
            this.fail(res)
          }
        }
      }
      xhr.send(data)
    }
  },
  props: {
    index: {
      type: Number
    },
    uploadType: {
      // 0 服务器 1 七牛云
      type: Number,
      default: function () {
        return this.$uploader.type
      }
    },
    type: {
      // 上传文件类型 [image, video, file]
      type: String,
      default() {
        return 'image'
      }
    },
    file: {
      // 文件地址 / 对象
      type: Object,
      required: true
    },
    src: {
      type: [String, Object, File]
    },
    width: {
      type: String,
      default() {
        return '120px'
      }
    },
    height: {
      type: String,
      default() {
        return '120px'
      }
    },
    disabled: Boolean // 禁用
  }
}
</script>

<style lang="scss" scoped>
.upload-item {
  position: relative;
  border: 1px solid #dddddd;
  display: flex;
  align-items: center;
  justify-content: center;
  &.success {
    border-color: $--color-success;
  }
  &.fail {
    border-color: $--color-danger;
  }
  .file {
    width: 80%;
  }
  .status-label {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    font-size: 20px;
    width: 15px;
    height: 15px;
    opacity: 1;
    transition: all 500ms;
    background: #ffffff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    &.el-icon-success {
      color: $--color-success;
    }
    &.el-icon-error {
      color: $--color-danger;
    }
  }
  &:hover .status-label {
    opacity: 0;
    transition: all 500ms;
  }
  .upload-mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    a {
      font-size: 20px;
      cursor: pointer;
      margin: 0 10px;
    }
    .loading-text {
      color: $--color-primary;
    }
    &.waiting {
      opacity: 1;
      background: rgba(250, 250, 250, 0.5);
      transition: all 500ms;
    }
    &:hover {
      opacity: 1;
      background: rgba(250, 250, 250, 0.5);
      transition: all 500ms;
      a:hover {
        color: $--color-primary;
      }
    }
  }
}
</style>
