<template>
  <el-form class="edit-form" :model="form" :rules="rules" ref="edit" label-width="120px" size="medium">
    <el-form-item label="富文本" prop="html">
      <TinymceEditor v-model="form.html"></TinymceEditor>
    </el-form-item>
    <el-form-item class="but-group">
      <el-button type="primary" @click="save('edit')">确定</el-button>
      <el-button @click="close">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import TinymceEditor from '@/plugins/tinymce/TinymceEditor.vue'
export default {
  components: {
    TinymceEditor
  },
  data() {
    return {
      form: {
        html: ''
      },
      rules: {}
    }
  },
  methods: {
    save() {},
    close() {}
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
