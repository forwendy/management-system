<template>
  <editor ref="editor" class="tinymce-editor" v-model="myValue" :init="init"></editor>
</template>

<script>
import commonApi from '@/plugins/uploader/api.js'
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver'
import 'tinymce/icons/default'
import 'tinymce/plugins/image'
import 'tinymce/plugins/media'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/link'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/fullscreen'
export default {
  components: {
    Editor
  },
  props: {
    //传入一个value，使组件支持v-model绑定
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plugins: {
      type: [String, Array],
      default: () => {
        return 'table lists preview fullscreen image media textcolor wordcount contextmenu'
      }
    },
    toolbar: {
      type: [String, Array],
      default: () => {
        return 'formatselect bold strikethrough | fontselect fontsizeselect forecolor backcolor | alignleft aligncenter alignright alignjustify | link blockquote image | removeformat preview fullscreen'
      }
      // 'undo redo | formatselect bold italic strikethrough | fontselect fontsizeselect forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image media table | quicklink removeformat preview fullscreen'
    }
  },
  data() {
    return {
      // 初始化配置
      init: {
        language_url: `/${process.env.VUE_APP_PROJECT}/tinymce/langs/zh_CN.js`,
        language: 'zh_CN',
        skin_url: `/${process.env.VUE_APP_PROJECT}/tinymce/skins/ui/oxide`,
        content_css: `/${process.env.VUE_APP_PROJECT}/tinymce/skins/content/default`,
        content_style: 'img{max-width: 100%;height: auto;}',
        font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif',
        fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px',
        height: 500,
        plugins: this.plugins,
        toolbar: this.toolbar,
        branding: false,
        menubar: false,
        images_upload_handler: (blobInfo, success, failure) => {
          const file = blobInfo.blob()
          // 七牛云
          // commonApi
          //   .uploadFileQN(file)
          //   .then((res) => {
          //     const src = this.$prefix + '/' + res.key
          //     success(src)
          //   })
          //   .catch(() => {
          //     failure('上传失败')
          //   })
          // 服务端
          commonApi.serverUpload({file, prePath: 'TinymceEditor' }).then((res) => {
              const src = this.$prefix + '/' + res.data
              success(src)
            })
            .catch(() => {
              failure('上传失败')
            })
        }
      },
      myValue: this.value
    }
  },
  watch: {
    value(newValue) {
      this.myValue = newValue
    },
    myValue(newValue) {
      this.$emit('input', newValue)
      this.$emit('change', this.getText())
    }
  },
  methods: {
    //可以添加一些自己的自定义事件，如清空内容
    clear() {
      this.myValue = ''
    },
    // 获取纯文本
    getText() {
      const tinyID = this.$refs.editor.elementId
      return tinymce.editors[tinyID].getContent({ format: 'text' })
    },
    // 获取文本
    getContent() {
      const tinyID = this.$refs.editor.elementId
      return tinymce.editors[tinyID].getContent()
    },
    // 同步内容到textarea
    saveContent() {
      const tinyID = this.$refs.editor.elementId
      tinymce.editors[tinyID].save()
    }
  }
}
</script>