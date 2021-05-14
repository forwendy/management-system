<template>
  <div class="upload">
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploaded: false, // 图片队列上传完毕
      list: [], // 文件列表
      valueArr: []
    }
  },
  props: {
    type: {
      // 上传文件类型 [image, video, file]
      type: String,
      default: function() {
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
      default: function() {
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
      default: function() {
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
    width: Number, // 图片宽度限制 需要配合高度使用，单一设置无效
    height: Number, // 图片高度限制 需要配合宽度使用，单一设置无效
    disabled: Boolean // 禁用
  }
}
</script>

<style>

</style>