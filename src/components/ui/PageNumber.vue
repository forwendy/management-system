<template>
  <el-pagination class="pagination" :class="{fixed:fixed}"
    background
    :page-count="8"
    @current-change="change"
    :current-page="index"
    :page-size="size"
    :total="total"
    layout="slot, prev, pager, next, jumper">
    <span class="total">共{{pages}}页/{{total}}条数据</span>
  </el-pagination>
</template>

<script>
export default {
  props: {
    fixed: Boolean,
    index: Number,
    size: Number,
    pages: Number,
    total: Number,
  },
  methods:{
    change(val){
      this.$emit('change', val)
    }
  }
}
</script>

<style>
.pagination{
  padding: 10px;
  text-align: center;
}
.fixed{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
}
.el-pagination span:not([class*=suffix]), .el-pagination button,
.el-pagination.is-background .btn-prev, .el-pagination.is-background .btn-next, .el-pagination.is-background .el-pager li
{
  font-size: 14px;
  color: #333;
  font-weight: 500;
}
</style>
