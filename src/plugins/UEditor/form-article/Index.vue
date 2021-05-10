<template>
  <div class="form-artcile">
    <UEditor ref="editor" class="ueditor-content" name="formArtcile"
    :config="editorOpt" @input="ueditorInput" @ready="ready"></UEditor>

    <el-dialog v-if="dialogColor" title="编辑字体颜色" :visible.sync="dialogColor" append-to-body width="550px">
      <font-color @submit="setColor"></font-color>
    </el-dialog>
    <el-dialog v-if="dialogImage" title="插入图片" :visible.sync="dialogImage" append-to-body width="550px">
      <upload type="image" @submit="insertImage"></upload type="image">
    </el-dialog>
    <el-dialog v-if="dialogVideo" title="插入视频" :visible.sync="dialogVideo" append-to-body width="550px">
      <upload type="video" @submit="insertVideo"></upload type="image">
    </el-dialog>
  </div>
</template>

<script>
import './UEUtils.js'
import UEditor from '../UEditor.vue'
import FontColor from './FontColor.vue'
import Upload from './Upload.vue'
export default {
  components: {
    UEditor,
    FontColor,
    Upload
  },
  props: {
    value: String
  },
  data() {
    return {
      html: '',
      editorOpt: {
        toolbars:[['fontfamily', 'fontsize', 'bold', 'italic', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'font-color', 'upload-image', 'upload-video']],
        initialFrameHeight: 400,
        elementPathEnabled: false,// 是否启用元素路径
        enableContextMenu: false, // 打开右键菜单功能
        autoHeightEnabled: false,  // 是否自动长高
        imagePopup: false, // 图片操作的浮层开关
        autoFloatEnabled: true, // 是否保持toolbar的位置不动
        wordCount: true, // 是否开启字数统计
        maximumWords: 10000,
      },
      dialogColor: false,
      dialogImage: false,
      dialogVideo: false,
    }
  },
  watch: {
    value(val, old){
      if(val != old){
        // console.log(val)
        this.$refs.editor.setContent(val)
      }
    }
  },
  methods: {
    ueditorInput(val){
      this.$emit('input', val)
    },
    ready(){
      this.$refs.editor.editor.fontColor = this.fontColor
      this.$refs.editor.editor.uploadImage = this.uploadImage
      this.$refs.editor.editor.uploadVideo = this.uploadVideo
      this.$refs.editor.setContent(this.value)
    },
    setColor(val){
      this.$refs.editor.editor.execCommand('forecolor', val)
      this.dialogColor =  false
    },
    fontColor(){
      this.dialogColor = true
    },
    insertImage(val){
      const html = `<img src="${this.$res.prefix}${val}" width="100%">`
      this.$refs.editor.editor.execCommand('inserthtml', html)
      this.dialogImage =  false
    },
    uploadImage(){
      this.dialogImage = true
    },
    uploadVideo(){
      this.dialogVideo = true
    },
    insertVideo(val){
      const html = `<video src="${this.$res.prefix}${val}" width="100%"></video>`
      this.$refs.editor.editor.execCommand('inserthtml', html)
      this.dialogVideo =  false
    }
  }
}
</script>

<style scoped>
.form-artcile{
  line-height: 1;
}
.ueditor-content .edui-default .edui-editor{
  line-height: 1;
}
.edui-popup-content.edui-default{ height: auto !important; }
</style>
