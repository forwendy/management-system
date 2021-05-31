<template>
  <div class="module-name-list table-list chunk">
    <div v-setHeight="60">
      <el-table height="100%" header-cell-class-name="header-th" :data="page.data" style="width: 100%" highlight-current-row>
        <el-table-column align="center" label="图片轮播">
          <template slot-scope="scope">
            <ImageView :prefix="$prefix" :src="scope.row.imgs" width="300px" height="200px"></ImageView>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
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
import ImageView from '@/components/ui/ImageView.vue'
import PageNumber from '@/components/ui/PageNumber.vue'
export default {
  components: {
    ImageView,
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
    }
  }
}
</script>