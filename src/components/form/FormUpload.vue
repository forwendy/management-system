<template>
  <div class="form-upload">
    <div class="box">
      <!-- 上传按钮 -->
      <!-- 用if刷新组件，以防止input上传同一个文件无法调用change事件 -->
      <div v-if="current == '' && arr.length < max" class="img-item input-control" :class="{ disabled: disabled }" :style="previewStyle">
        <i class="el-icon-plus" title="上传"></i>
        <input class="input" type="file" :accept="acceptFormat(type, accept)" @change="beforeUpload" :disabled="disabled" />
      </div>

      <!-- 上传中 -->
      <div v-if="current" class="img-item" :style="previewStyle">
        <!-- 类型 -->
        <img v-if="type == 'image'" class="img-cover" :src="current" />
        <video v-if="type == 'video'" class="img-cover" :src="current"></video>
        <img v-if="type == 'file'" class="img-content" src="@/assets/imgs/PDF.png" />
        <!-- 类型 -->

        <div class="mask">
          <el-progress v-show="!failed" class="progress" type="circle" :percentage="percentage" :width="80"></el-progress>
          <i v-show="failed" class="el-icon-upload2" title="重新上传" @click="qiniuAjax(form)"></i>
          <i v-show="failed" class="el-icon-delete" title="删除" @click="delFailed"></i>
        </div>
      </div>

      <!-- 已上传 -->
      <div class="img-item" :style="previewStyle" v-for="(obj, i) in arr" :key="i">
        <!-- 类型 -->
        <!-- '?imageView2/1/w/100/h/100' -->
        <img v-if="type == 'image'" class="img-cover" :src="$res.prefix + obj + showWhPic" :onerror="$errorImg" />
        <!-- 取视频首帧为缩略图 '?vframe/jpg/offset/0/w/100/h/100' -->
        <img v-if="type == 'video'" class="img-cover" :src="$res.prefix + obj + showWhVideo" :onerror="$errorImg" />
        <img v-if="type == 'file'" class="img-content" src="@/assets/imgs/PDF.png" />
        <!-- 类型 -->
        <div class="dark-mask" >
          <i class="el-icon-zoom-in" title="查看" @click="view(obj)"></i>
          <i class="el-icon-delete" v-if="!onlyView" title="删除" @click="del(i)"></i>
        </div>
      </div>
    </div>

    <el-dialog :visible.sync="dialogVisible" append-to-body width="80%" top="2vh">
      <!-- 类型 -->
      <img v-if="type == 'image'" width="100%" :src="$res.prefix + dialogImageUrl" />
      <video v-if="type == 'video'" width="100%" :src="$res.prefix + dialogImageUrl" controls="controls"></video>
      <!-- 类型 -->
    </el-dialog>
  </div>
  <!-- 图片配置 -->
  <!-- <form-upload type="image" :width="50" :height="50" :previewStyle="{ width: '150px',height: '150px'}" :accept="['jpg', 'jpeg']" v-model="form.pic"></form-upload> -->
  <!-- 视频配置 -->
  <!-- <form-upload type="video" :previewStyle="{ width: '150px',height: '150px'}" v-model="form.video"></form-upload> -->
</template>

<script>
export default {
  created() {
    this.setVal(this.value)
  },
  props: {
    onlyView:Boolean,
    type: {
      // 上传文件类型 [image, video, file]
      type: String,
      required: true
    },
    value: {
      // 表单值 用逗号分隔的资源相对地址
      // type: String,
      required: true
    },
    max: {
      // 上传文件数量
      type: Number,
      default: function() {
        return 1
      }
    },
    maxMB: {
      // 上传文件大小 单位 MByte
      type: Number,
      default: 50
    },
    accept: {
      // 上传文件格式
      type: Array,
      default: function() {
        const accept = {
          image: [
            'jpg',
            'jpeg',
            'png',
            'gif',
            'bmp',
            'JPG',
            'JPEG',
            'PNG',
            'GIF',
            'BMP'
          ],
          // video : ['flv', 'mpg', 'mpeg', 'avi', 'wmv', 'mov', 'asf', 'rm', 'rmvb', 'mkv', 'm4v', 'mp4'],
          // 考虑视频播放兼容性
          video: ['mp4', 'mpg', 'mpeg'],
          file: ['ppt', 'pptx', 'doc', 'docx', 'xls', 'xlsx', 'pdf','application/octet-stream']
        }
        return accept[this.type]
      }
    },
    width: Number, // 图片宽度限制 需要配合高度使用，单一设置无效
    height: Number, // 图片高度限制 需要配合宽度使用，单一设置无效
    disabled: Boolean, // 禁用
    previewStyle: Object // 展示样式
  },
  data() {
    return {
      loading: false, // 上传状态
      domainQN: this.$res.prefix, // 资源前缀
      uploadUrlQN: this.$res.upload, // 上传地址
      qiniuTokenUrl: 'portal/qiniu/getToken', // 获取上传token地址

      file: '', // input获取的文件信息
      current: '', // 当前上传中资源
      percentage: 0, // 上传进度
      failed: false, //上传失败
      form: {}, // 上传数据

      arr: [], // 当前组件包含的所有资源

      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  computed: {
    showWhPic() {
      if (
        this.previewStyle &&
        this.previewStyle.width &&
        this.previewStyle.height
      ) {
        const w = Math.round(this.previewStyle.width.split('px')[0])
        const h = Math.round(this.previewStyle.height.split('px')[0])
        return '?imageView2/1/w/' + w + '/h/' + h
      } else {
        return ''
      }
    },
    showWhVideo() {
      if (
        this.previewStyle &&
        this.previewStyle.width &&
        this.previewStyle.height
      ) {
        const w = Math.round(this.previewStyle.width.split('px')[0])
        return '?vframe/jpg/offset/0/w/' + w
      } else {
        return ''
      }
    }
  },
  watch: {
    value(val) {
      // 赋值
      this.setVal(val)
    }
  },
  methods: {
    // 赋值
    setVal(val) {
      if (val && val != '') {
        this.arr = val.split(',').slice(0, this.max)
        // console.log(val, this.arr)
      } else {
        this.arr = []
      }
    },
    // 查看大图
    view(url) {
      if (this.type == 'file') {
        return window.open(this.$res.prefix + url, '_blank')
      }
      this.dialogImageUrl = url
      this.dialogVisible = true
    },
    // 删除某个数据
    del(index) {
      this.arr = this.arr.filter((el, i) => {
        if (i != index) return el
      })
      this.$emit('input', this.arr.join(','))
      this.$emit('change')
    },
    // 移除上传失败的
    delFailed() {
      this.failed = false
      this.current = ''
    },
    // 上传前校验文件
    beforeUpload(e) {
      const input = e.srcElement ? e.srcElement : e.target
      const file = input.files[0]
      // 一次只能选择一个文件
      if (!file) return

      const format = file.type.split('/')[1]
      console.log(format)
      const isFormat = this.accept.indexOf(format) != -1
      const isSize = file.size < this.maxMB * 1024 * 1024
      // console.log(format,isFormat, isSize)
      // 检验文件格式
      if (!isFormat) {
        this.$notify.error({
          title: '错误',
          message: `文件格式错误，请上传${this.accept.join('，')}格式的文件`
        })
        this.value = ''
        return
      }
      // 校验文件大小
      if (!isSize) {
        this.$notify.error({
          title: '错误',
          message: `文件大小超过，请上传${this.maxMB}MB的文件`
        })
        console.log(this.value)
        // this.value = ''
        return
      }
      // console.log(file)
      // console.log(file.name)
      this.file = file
      this.current = file
      this.preview()
    },

    // 预览 - 图片
    preview() {
      let reader = new FileReader()
      let _this = this
      const file = _this.file
      reader.file = file
      reader.readAsDataURL(file)
      reader.onload = function() {
        // console.log(this)
        _this.current = this.result || file
        _this.imgScale(this.result)
      }
    },

    // 校验图片大小尺寸
    imgScale(src) {
      let _this = this
      const img = new Image()
      // 没有限制宽高，直接上传
      if (!_this.width || !_this.height) return _this.qiniuUpload()
      img.onload = function() {
        // console.log(img.width,img.height)
        if (img.height !== _this.height || img.width !== _this.width) {
          _this.$notify.error({
            title: '错误',
            message: `图片尺寸错误，请上传${_this.width}px*${_this.height}px的图片`
          })
          setTimeout(() => {
            _this.current = ''
          }, 2000)
        } else {
          _this.qiniuUpload()
        }
      }
      img.src = src
    },

    // 获取七牛云上传凭证
    qiniuUpload() {
      const _this = this
      const fileData = new FormData()
      const time = new Date()
      const file = _this.file
      // 文件名去除空格 && 中文名自动转化为英文
      const name = this.$util.formatChinese(this.$util.replaceTrim(file.name))
      console.log(name)
      fileData.append('file', file)
      fileData.append('key', time.getTime() + '/' + name)

      // console.log(fileData)
      this.$axios.get(this.qiniuTokenUrl).then(function(response) {
        fileData.append('token', response.data.uptoken)
        _this.qiniuAjax(fileData)
      })
    },

    // 七牛云原生上传方法
    qiniuAjax(data) {
      var _this = this
      var xhr = {}
      _this.failed = false

      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest()
      } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
      }

      xhr.open('POST', this.uploadUrlQN, true)

      xhr.upload.addEventListener(
        'progress',
        function(evt) {
          if (evt.lengthComputable) {
            var percentComplete = Math.round((evt.loaded * 100) / evt.total)
            _this.percentage = percentComplete
          }
        },
        false
      )

      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if (xhr.status == 200 && xhr.responseText !== '') {
            var data = JSON.parse(xhr.responseText)
            _this.current = ''
            _this.form = ''
            _this.changeValue(data)
            _this.$notify.success({ title: '成功', message: '上传成功' })
          } else {
            // 重新上传
            _this.failed = true
            _this.$notify.error({ title: '错误', message: `上传失败` })
          }

          _this.percentage = 0
        }
      }

      xhr.send(data)
    },

    changeValue(data) {
      const path = `/${data.key}`
      this.arr.push(path)
      const val = this.arr.join(',')
      this.$emit('input', val)
      this.$emit('change')
      this.$emit('on-success', data)
    },

    acceptFormat(type, arr) {
      var newArr = []
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === 'pdf') {
          newArr.push('application/' + arr[i])
        } else {
          newArr.push(type + '/' + arr[i])
        }
      }
      return newArr.join(',')
    }
  }
}
</script>

<style scoped>
.box {
  display: flex;
  flex-wrap: wrap;
}
.img-item {
  box-sizing: border-box;
  width: 120px;
  height: 120px;
  border-radius: 4px;
  border: 2px dashed #ddd;
  margin-right: 10px;
  margin-top: 10px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.mask,
.dark-mask {
  background: rgba(255, 255, 255, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;

  align-items: center;
  justify-content: space-around;
  font-size: 24px;
}
/* .mask{
  flex-direction: column;
} */
.dark-mask {
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  padding: 0 15px;
}
.mask i,
.dark-mask i {
  cursor: pointer;
}
.img-item .dark-mask {
  /* transition: all 100ms; */
  opacity: 0;
}
.img-item:hover .dark-mask {
  transition: all 500ms;
  opacity: 1;
}
.input-control:hover {
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  border-color: #2684da;
}
.input-control {
  font-size: 28px;
  color: #8c939d;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.input-control input {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  cursor: pointer;
  width: 100%;
  height: 100%;
}
.input-control.disabled input {
  cursor: not-allowed;
  border-color: #e4e7ed;
  background-color: #f5f7fa;
}
.input-control.disabled:hover {
  border-color: #e4e7ed;
}
</style>
