<template>
  <div class="uploader">
    <!-- 文件上传 -->
    <div class="upload-wrapper">
      <!-- 上传队列 -->
      <template v-for="(obj, index) in list">
        <upload-item :index="index" :key="'uploader-' + index" :width="width" :height="height" :uploadType="obj.uploadType" :type="type" :file="obj" :src="obj.src" @success="success" @fail="fail" @view="view" @remove="remove" :disabled="disabled"> </upload-item>
      </template>
      <!-- 占位符 -->
      <div class="upload-handle" v-show="currentMax && !disabled">
        <!-- 原生上传 -->
        <input type="file" :accept="acceptFormat" :multiple="currentMax > 1" @change="beforeUpload" />
        <slot name="placeholder">
          <div class="placeholder el-icon-plus" :style="{ width: width, height: height }"></div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import UploadItem from './UploadItem'
export default {
  name: 'Uploader',
  components: {
    UploadItem
  },
  data() {
    return {
      uploaded: false, // 图片队列上传完毕
      list: [], // 文件列表
      valueArr: []
    }
  },
  created() {
    this.setValue(this.value)
  },
  watch: {
    value(value) {
      this.setValue(value)
    }
  },
  computed: {
    prefix() {
      if (this.uploadType === 0) {
        return this.$uploader.prefix
      }
      if (this.uploadType === 1) {
        return this.$uploader.prefixQN
      }
    },
    // 当前还可上传文件数量
    currentMax() {
      return this.max - this.list.length
    },
    acceptFormat() {
      const type = this.type
      const arr = this.accept
      const newArr = []
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 'pdf') {
          newArr.push('application/' + arr[i])
        } else if (arr[i] === 'doc') {
          newArr.push('application/msword')
        } else if (arr[i] === 'docx') {
          newArr.push('application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        } else if (arr[i] === 'ppt') {
          newArr.push('application/vnd.ms-powerpoint')
        } else if (arr[i] === 'pptx') {
          newArr.push('application/vnd.openxmlformats-officedocument.presentationml.presentation')
        } else if (arr[i] === 'xls') {
          newArr.push('application/vnd.ms-excel')
        } else if (arr[i] === 'xlsx') {
          newArr.push('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        } else {
          newArr.push(type + '/' + arr[i])
        }
      }
      return newArr.join(',')
    }
  },
  methods: {
    // 输入 this.valueArr & this.list 处理
    setValue(value) {
      if (value && value !== '') {
        if (this.list.length === 0) {
          this.valueArr = value.split(',')
          this.list = this.valueArr.map((el) => {
            return {
              uploadType: this.uploadType,
              name: el,
              src: this.prefix + el,
              status: 4
            }
          })
        }
      } else {
        this.valueArr = []
        this.list = []
      }
    },
    // 上传前校验文件
    beforeUpload(e) {
      const input = e.srcElement ? e.srcElement : e.target
      let files = input.files
      // 校验数量
      const max = this.max - this.list.length
      if (files.length > max) {
        files = files.slice(0, max)
      }
      for (let i = 0; i < files.length; i++) {
        if (this.checkFormat(files[i]) && this.checkSize(files[i])) {
          this.list.push({
            uploadType: this.uploadType, // 0 服务器 1 七牛云
            name: files[i].name,
            src: files[i],
            status: 1
          })
        }
      }
      input.value = ''
    },
    // 校验格式
    checkFormat(file) {
      const format = file.type
      const isFormat = this.acceptFormat.indexOf(format) !== -1
      if (!isFormat) {
        this.$message.error(`文件格式错误，请上传${this.accept.join('，')}格式的文件'`)
        return false
      } else {
        return true
      }
    },
    // 校验大小
    checkSize(file) {
      const isSize = file.size < this.maxMB * 1024 * 1024 * 1024
      if (!isSize) {
        this.$message.error(`文件大小超过，请上传${this.maxMB}MB的文件`)
        return false
      } else {
        return true
      }
    },
    success() {},
    fail() {},
    view() {},
    // 移除文件
    remove(index) {
      this.valueArr = this.valueArr.filter((el, i, arr) => {
        return i !== index
      })
      this.list = this.list.filter((el, i, arr) => {
        return i !== index
      })
      this.changeValue()
    },
    // 输出
    changeValue() {
      this.$emit('input', this.valueArr.join(','))
    }
  },
  props: {
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
      default: function () {
        return 'image'
      }
    },
    value: {
      // 表单值 用逗号分隔的资源相对地址
      type: String,
      required: true
    },
    max: {
      // 上传文件数量
      type: Number,
      default: function () {
        return 1
      }
    },
    maxMB: {
      // 上传文件大小 单位 MByte
      type: Number,
      default: 3
    },
    accept: {
      // 上传文件格式
      type: Array,
      default: function () {
        const accept = {
          image: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'JPG', 'JPEG', 'PNG', 'GIF', 'BMP'],
          // video : ['flv', 'mpg', 'mpeg', 'avi', 'wmv', 'mov', 'asf', 'rm', 'rmvb', 'mkv', 'm4v', 'mp4'],
          // 考虑视频播放兼容性
          video: ['mp4', 'mpg', 'mpeg'],
          file: ['ppt', 'pptx', 'doc', 'docx', 'xls', 'xlsx', 'pdf']
        }
        return accept[this.type]
      }
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
.upload-wrapper {
  display: flex;
  flex-wrap: wrap;
  img {
    display: block;
  }
  .upload-item {
    margin-right: 15px;
    margin-bottom: 15px;
    border-radius: 4px;
    overflow: hidden;
  }
  .upload-handle {
    position: relative;
    margin-right: 15px;
    margin-bottom: 15px;
    input {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      z-index: 1;
      cursor: pointer;
      &:hover + .placeholder {
        border-color: $--color-primary;
        box-shadow: 0 0 5px 1px rgba($--color-primary, 0.2);
        color: $--color-primary;
      }
    }
    .placeholder {
      border: 1px solid #dddddd;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      color: #333333;
    }
  }
}
</style>
