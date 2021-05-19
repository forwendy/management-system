<template>
  <div class="upload-item" :style="showWH" :class="{ fail: status === 3, success: status === 4 }">
    <!-- 上传成功 -->
    <a v-show="status === 4" class="status-label el-icon-success"></a>
    <!-- 上传失败 -->
    <a v-show="status === 3" class="status-label el-icon-error"></a>
    <!-- 遮罩 -->
    <div class="upload-mask" :class="{ waiting: status < 3 }">
      <!-- 查看文件/图片 -->
      <a v-show="status > 3" class="el-icon-zoom-in" title="查看文件" @click="view"></a>
      <!-- 上传失败 重新上传 -->
      <a v-show="status === 3" class="el-icon-refresh-right" @click="reload" title="重新上传"></a>
      <!-- 删除文件 -->
      <a v-show="status > 2 && !disabled" class="el-icon-delete" @click="remove" title="删除文件"></a>
      <!-- 上传中 -->
      <a v-show="status === 2" class="loading-text">{{ percentComplete + '%' }}</a>
      <!-- 等待上传 -->
      <a v-show="status === 1" class="el-icon-loading"></a>
    </div>
    <!-- 文件展示 -->
    <template v-show="type === 'file'">
      <img v-if="thumbnail === 'pdf'" class="file" src="../uploader/images/pdf.png" />
      <img v-if="thumbnail === 'ppt'" class="file" src="../uploader/images/ppt.png" />
      <img v-if="thumbnail === 'xls'" class="file" src="../uploader/images/xls.png" />
      <img v-if="thumbnail === 'doc'" class="file" src="../uploader/images/doc.png" />
      <img v-if="thumbnail === 'zip'" class="file" src="../uploader/images/zip.png" />
    </template>
    <!-- 图片展示 -->
    <img v-if="type === 'image'" class="img-cover" :src="image" />
    <!-- 视频展示 -->
    <template v-if="type === 'video'">
      <img v-if="status > 3 && uploadType === 1" class="img-cover" :src="video" />
      <video v-if="status > 3 && uploadType === 0" class="img-cover" :src="video" :width="this.width"></video>
      <img v-if="status < 3" class="file" src="../uploader/images/mp4.png" />
    </template>
  </div>
</template>

<script>
import api from '@/plugins/uploader/api.js'
export default {
  created() {
    this.handle()
  },
  data() {
    return {
      value: '', // 当前文件地址
      status: 0, // 1等待上传 2上传中 3上传失败 4上传成功 5赋值文件
      percentComplete: 0 // 上传进度
    }
  },
  watch: {
    src() {
      // 数据改变，组件内部刷新
      this.handle()
    }
  },
  computed: {
    image() {
      if (this.uploadType === 0) {
        return this.prefix + this.value
      } else {
        if (this.status > 3) {
          return this.prefix + this.value + '?imageView2/1/w/' + this.width + '/h/' + this.height
        } else {
          return this.value
        }
      }
    },
    video() {
      if (this.uploadType === 0) {
        return this.prefix + this.value
      } else {
        if (this.status > 3) {
          return this.prefix + this.value + '?vframe/jpg/offset/0/w/' + this.width
        } else {
          return this.value
        }
      }
    },
    // 上传地址
    uploadURL() {
      if (this.uploadType === 0) {
        return this.$uploader.upload + '?prePath=' + this.prePath
      }
      if (this.uploadType === 1) {
        return this.$uploader.uploadQN
      }
    },
    // 访问前缀
    prefix() {
      if (this.uploadType === 0) {
        return this.$uploader.prefix
      }
      if (this.uploadType === 1) {
        return this.$uploader.prefixQN
      }
    },
    // 文件尾缀
    typeSuffix() {
      const name = this.file.name
      const lastComma = name.lastIndexOf('.')
      return name.slice(lastComma, name.length)
    },
    // 缩略图类型判断
    thumbnail() {
      // 预览文件
      const suffix = this.typeSuffix
      if (suffix === '.xls' || suffix === '.xlsx') {
        return 'xls'
      }
      if (suffix === '.doc' || suffix === '.docx') {
        return 'doc'
      }
      if (suffix === '.ppt' || suffix === '.pptx') {
        return 'ppt'
      }
      if (suffix === '.rar' || suffix === '.zip') {
        return 'zip'
      }
      if (suffix === '.pdf') {
        return 'pdf'
      }
    },
    // 元素展示宽高
    showWH() {
      return { width: this.width + 'px', height: this.height + 'px' }
    }
  },
  methods: {
    handle() {
      this.status = this.file.status
      if (this.status < 4) {
        // 未上传
        this.preview(this.src)
        // 服务器上传
        if (this.uploadType === 0) {
          this.upload(this.src)
        }
        // 七牛云上传
        if (this.uploadType === 1) {
          this.uploadQN(this.src)
        }
      }
      this.value = this.src
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
    success(data) {
      this.status = 4
      if (this.uploadType === 0) {
        this.value = data.data
      }
      if (this.uploadType === 1) {
        this.value = `/${data.key}`
      }
      this.$emit('success', { index: this.index, src: this.value, status: 4 })
    },
    // 上传失败
    fail() {
      this.status = 3
      this.$emit('fail', { index: this.index, status: 3 })
    },
    // 查看
    view() {
      if (this.type === 'file') {
        window.location.href = this.prefix + this.src
      }
      if (this.type === 'image') {
        this.$emit('view')
      }
      if (this.type === 'video') {
        this.$emit('view')
      }
    },
    // 预览
    preview(file) {
      if (this.type === 'image') {
        // 预览图片
        let reader = new FileReader()
        reader.file = file
        reader.readAsDataURL(file)
        reader.onload = (res) => {
          this.value = res.currentTarget.result
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
    // 服务器上传
    upload(file) {
      this.status = 2
      const fileData = new FormData()
      fileData.append('file', file)
      fileData.append('filename', this.formatName(file.name))
      this.httpRequest({ data: fileData })
    },
    // 七牛云上传
    uploadQN(file) {
      this.status = 2
      const fileData = new FormData()
      fileData.append('file', file)
      fileData.append('key', this.formatName(file.name))
      api.getQNToken().then((uptoken) => {
        fileData.append('token', uptoken)
        this.httpRequest({ data: fileData })
      })
    },
    // 原生上传方法
    httpRequest({ data }) {
      let xhr = {}
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest()
      } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
      }
      // 设置url
      xhr.open('POST', this.uploadURL, true)
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
            this.success(data)
          } else {
            // 上传失败
            const res = JSON.parse(xhr.responseText)
            this.fail(res)
          }
        }
      }
      // 上传进度读取
      xhr.upload.addEventListener(
        'error',
        (evt) => {
          console.error(evt)
          this.fail()
        },
        false
      )
      xhr.send(data)
    },
    // 格式化文件名称
    formatName(name) {
      // 移除逗号 - 空格
      name = name.replace(',', '').replace(/\s*/g, '')
      const lastComma = name.lastIndexOf('.')
      const text = name.slice(0, lastComma)
      return new Date().getTime() + '/' + text + this.typeSuffix
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
      type: Number,
      default() {
        return 120
      }
    },
    height: {
      type: Number,
      default() {
        return 120
      }
    },
    prePath: {
      type: String,
      default() {
        return ''
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
      font-size: 18px;
      font-weight: 700;
      width: 35px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      cursor: pointer;
      text-decoration: none;
      color: #333333;
    }
    .loading-text {
      width: 50px;
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
        background: rgba(255, 255, 255, 0.8);
        color: #666666;
      }
    }
  }
}
</style>
