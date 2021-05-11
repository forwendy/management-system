<template>
  <div class="module-name-list table-list chunk">
    <div v-setHeight="60">
      <el-table height="100%" header-cell-class-name="header-th" :data="page.data" style="width: 100%" highlight-current-row>
        <el-table-column align="center" prop="value" label="键值"> </el-table-column>
        <el-table-column align="center" prop="label" label="标签"> </el-table-column>
        <el-table-column align="center" prop="type" label="类型"> </el-table-column>
        <el-table-column align="center" prop="description" label="描述"> </el-table-column>
        <el-table-column align="center" prop="sort" label="排序"> </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="addKey(scope.row)">添加键值</el-button>
            <el-button type="text" @click="edit(scope.row)">编辑</el-button>
            <el-button type="text" @click="del(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <page-number :index="query.pageIndex" :size="query.pageSize" :pages="page.pageTotal" :total="page.totalCount" @change="changePage"></page-number>
  </div>
</template>

<script>
import PageNumber from '@/components/layout/PageNumber.vue'
export default {
  components: {
    PageNumber
  },
  props: {
    page: Object,
    query: Object
  },
  methods: {
    changePage(val) {
      this.$emit('change', val)
    },
    edit(row) {
      this.$emit('edit', row)
    },
    del(id) {
      this.$emit('del', id)
    },
    addKey(row) {
      this.$emit('addKey', row)
    }
  }
}
</script>

<style></style>
