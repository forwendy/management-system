<template>
  <div class="article-part-edit" v-loading="loading">
    <el-form class="edit-form" :model="form" :rules="rules" ref="edit" label-width="120px" size="medium">
      <el-form-item label="键值" prop="value">
        <el-input class="form-input" v-model="form.value" clearable></el-input>
      </el-form-item>
      <el-form-item label="标签" prop="label">
        <el-input class="form-input" v-model="form.label" clearable></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-input class="form-input" v-model="form.type" clearable></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input clearable type="textarea" :autosize="{ minRows: 3 }" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input class="form-input" v-model="form.sort" clearable></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input clearable type="textarea" :autosize="{ minRows: 3 }" v-model="form.remarks"></el-input>
      </el-form-item>
      <el-form-item class="but-group">
        <el-button type="primary" @click="save('edit')">确定</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    const checkInt = (rule, value, callback) => {
      setTimeout(() => {
        if (!Number.isInteger(parseFloat(value))) {
          callback(new Error('请输入整数数字值'))
        } else {
          callback()
        }
      }, 200)
    }
    return {
      loading: false,
      form: {
        id: '',
        value: '',
        label: '',
        type: '',
        description: '',
        sort: '',
        remarks: ''
      },
      rules: {
        value: [{ required: true, message: '请输入键值', trigger: 'blur' }],
        label: [{ required: true, message: '请输入标签', trigger: 'blur' }],
        type: [{ required: true, message: '请输入类型', trigger: 'blur' }],
        description: [{ required: true, message: '请输入描述', trigger: 'blur' }],
        sort: [
          { required: true, message: '请输入排序', trigger: 'blur' },
          { validator: checkInt, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    save(formName) {
      this.loading = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/sysdict/save', this.form).then((res) => {
            const data = res.data
            if (data.code == 200) {
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
    },
    close(){
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
.row {
  display: flex;
}
</style>
