<template>
  <div class="module-name-index">
    <!-- 按钮组 -->
    <BtnGroup :arr="btnArr" @add="add"></BtnGroup>
    <!-- 筛选 -->
    <ModuleFilter @submit="queryPage"></ModuleFilter>
    <!-- table 列表 -->
    <ModuleList :page="page" :query="query" @edit="edit" @del="del" @change="changePage"></ModuleList>
    <!-- 表单 -->
    <el-dialog :title="dialogTitle" width="800px" :close-on-click-modal="false" :visible.sync="dialogVisible" append-to-body>
      <ModuleEdit v-if="dialogTitle" @close="close"></ModuleEdit>
    </el-dialog>
  </div>
</template>

<script>
import moduleApi from '@/api/modules/module.js'
import BtnGroup from '@/components/ui/BtnGroup.vue'
import ModuleFilter from './ModuleFilter.vue'
import ModuleList from './ModuleList.vue'
import ModuleEdit from './ModuleEdit.vue'
export default {
  components: {
    BtnGroup,
    ModuleFilter,
    ModuleList,
    ModuleEdit
  },
  created() {
    // this.getPage(this.query)
  },
  data() {
    return {
      btnArr: [
        {
          name: '新增',
          event: 'add',
          // 权限标志
          rightKey: 'add'
        },
        // {
        //   name: '排序',
        //   event: 'sort',
        //   // 权限标志
        //   rightKey: 'sort'
        // }
      ],
      query: {
        pageSize: 20, // 全局变量
        pageIndex: 1
      },
      page: {
        data: [{
          imgs: '/1611563240363/7e8a0994-9cf2-42e0-901d-d4af5d48f4c6[1].jpg,1.jpg,/1566802234373/QQ截图20190826145020.jpg'
        },{
          imgs: '/1611563240363/7e8a0994-9cf2-42e0-901d-d4af5d48f4c6[1].jpg'
        },{
          imgs: null
        },{
          imgs: 'null'
        }],
        pageIndex: 0,
        pageSize: 20,
        pageTotal: null,
        totalCount: null
      },
      dialogTitle: '', // 模态窗标题
      dialogVisible: false
    }
  },
  methods: {
    // 获取页面数据
    getPage(query) {
      this.data = []
      this.$store.commit('tableLoading', true)
      moduleApi.getPage(query)

      this.$axios
        .post('/sysdict/page', data)
        .then((res) => {
          const data = res.data
          if (data.code == 200) {
            this.page = data.data
          }
        })
        .finally(() => {
          this.$store.commit('tableLoading', false)
        })
    },
    // 筛选列表
    queryPage(form) {
      if (form) this.query = Object.assign(this.query, form)
      this.query.pageIndex = 1
      this.getPage(this.query)
    },
    // 列表翻页
    changePage(val) {
      this.query.pageIndex = val
      this.getPage(this.query)
    },
    close() {
      this.dialogVisible = false
      this.getPage(this.query)
    },
    // 新增
    add() {
      this.dialogTitle = '新增'
      this.dialogVisible = true
    },
    // 编辑
    edit(row) {
      this.dialogTitle = '编辑'
      this.dialogVisible = true
    },
    // 删除
    del(id) {
      this.$confirm('此操作将删除该条记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios.post('/sysdict/remove', { id }).then((res) => {
            const data = res.data
            if (data.code == 200) {
              this.$notify.success({ title: '成功', message: '删除成功!' })
              this.getPage(this.query)
            }
          })
        })
        .catch(() => {
          this.$notify.info({ title: '提示', message: '已取消删除' })
        })
    }
  }
}
</script>
