<template>
  <div class="filter">
    <el-form :inline="true" :model="form" ref="filter" size="medium" label-position="right" class="filter-form">
      <div class="left">
        <el-form-item label="活动类型名称" class="form-group" prop="type_name_query">
          <el-input class="form-input" v-model="form.type_name_query" placeholder="请输入名称" clearable></el-input>
        </el-form-item>
      </div>
      <div class="right">
        <el-button class="btn" type="primary" @click="submit">查询</el-button>
        <el-button class="btn" @click="reset('filter')">重置</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          // 页面筛选参数
          type_name_query: '',
        },
      }
    },
    methods: {
      submit() {
        this.$emit('submit', this.form)
      },
      reset(formName) {
        this.$refs[formName].resetFields()
        this.$emit('submit', this.form)
      },
    }
  }
</script>
