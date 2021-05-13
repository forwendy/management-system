<template>
  <el-form class="module-name-filter filter-form chunk" :inline="true" :model="form" ref="filter" size="medium" label-position="right" label-width="120px">
    <div class="left">
      <el-form-item label="选择类型" class="form-group" prop="type_query">
        <el-select v-model="form.type_query" placeholder="请选择操作类型" filterable clearable>
          <el-option v-for="obj in sysDictType" :key="obj.text" :label="obj.text" :value="obj.text"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述" class="form-group" prop="description_query">
        <el-input class="form-input" v-model="form.description_query" placeholder="请输入描述" clearable></el-input>
      </el-form-item>
    </div>
    <div class="right">
      <el-button class="btn" type="primary" @click="submit">查询</el-button>
      <el-button class="btn" @click="reset('filter')">重置</el-button>
    </div>
  </el-form>
</template>

<script>
export default {
  created() {
    // this.getTypeList()
  },
  data() {
    return {
      form: {
        // 页面筛选参数
        type_query: '',
        description_query: ''
      },
      sysDictType: []
    }
  },
  methods: {
    getTypeList() {
      this.$axios.post('/sysdict/listType', {}).then((res) => {
        const data = res.data
        if (data.code == 200) {
          this.sysDictType = data.data
        }
      })
    },
    submit() {
      this.$emit('submit', this.form)
    },
    reset(formName) {
      this.$refs[formName].resetFields()
      this.$emit('submit', this.form)
    }
  }
}
</script>
