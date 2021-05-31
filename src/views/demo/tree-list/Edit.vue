<template>
  <div class="article-part-edit" v-loading="loading">
    <el-form class="edit-form" :model="form" :rules="rules" ref="edit" label-width="90px" size="medium">
      <el-form-item label="上级栏目" prop="parent_id">
        <el-cascader class="form-input" :disabled="disabled" :options="parent" :props="{ checkStrictly: true, label: 'type_name', value: 'id', emitPath: false }" v-model="form.parent_id" placeholder="请选择上级栏目" filterable clearable> </el-cascader>
      </el-form-item>
      <el-form-item label="栏目名称" prop="type_name">
        <el-input class="form-input" v-model="form.type_name" clearable></el-input>
      </el-form-item>
      <el-form-item label="缩略图" prop="image">
        <Uploader v-model="form.image" :uploadType="1" :accept="['jpg', 'jpeg', 'png']" :maxMB="0.5" @change="verify('image')"></Uploader>
        <p class="form-info">建议使用.jpg、.png格式，文件应小于512k，建议上传512px*512px。</p>
      </el-form-item>
      <el-form-item class="but-group">
        <el-button type="primary" @click="save('edit')">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    list: Array
  },
  computed: {
    disabled() {
      return this.form.id ? true : false
    },
    parent() {
      let arr = [{ id: '0', type_name: '顶级类型', children: this.list }]
      return arr
    }
  },
  data() {
    return {
      loading: false,
      form: {
        parent_id: '',
        type_name: '',
        image: ''
      },
      rules: {
        parent_id: [{ required: true, message: '请选择上级栏目', trigger: ['blur', 'change'] }],
        type_name: [{ required: true, message: '请输入活动类型名称', trigger: 'blur' }],
        image: [{ required: true, message: '请选择活动类型缩略图', trigger: ['blur', 'change'] }]
      }
    }
  },
  methods: {
    verify(key) {
      this.$refs.edit.validateField(key)
    },
    getDetail(id) {
      this.loading = true
      this.$axios.post('/space-os/rest/backstage/activitiesType/detail', { id: id }).then((res) => {
        if (res.code == 200) {
          this.form = res.data
          this.loading = false
        }
      })
    },
    save(formName) {
      this.loading = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/space-os/rest/backstage/activitiesType/save', this.form).then((res) => {
            if (res.code == 200) {
              this.$notify.success({ title: '成功', message: '保存成功' })
              this.$emit('close')
              this.loading = false
            }
          })
        } else {
          this.loading = false
          return false
        }
      })
    }
  }
}
</script>

<style scoped></style>
