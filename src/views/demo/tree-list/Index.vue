
<template>
  <div class="activity-type">
    <!-- 筛选 -->
    <type-filter class="chunk" @submit="queryData"></type-filter>
    <!-- 列表 -->
    <type-list class="chunk" :list="list" @edit="edit" @del="del"></type-list>
    <!-- 新增 -->
    <BtnGroup :arr="btnArr" @add="add"></BtnGroup>
    <!-- 表单 -->
    <el-dialog v-if="dialogVisible" :title="dialogTitle" width="500px"
    :close-on-click-modal="false" :visible.sync="dialogVisible" append-to-body>
      <type-edit :list="list" ref="edit" @close="close"></type-edit>
    </el-dialog>
  </div>
</template>

<script>
import BtnGroup from '@/components/ui/BtnGroup.vue'
import TypeFilter from './Filter.vue'
import TypeList from './List.vue'
import TypeEdit from './Edit.vue'
export default {
  components: {
    BtnGroup,
    TypeFilter,
    TypeList,
    TypeEdit
  },
  created(){
    this.getData(this.query)
  },
  data() {
    return {
      loading: false,
      query: {
        type_name_query: '',
      },
      list: [],
      dialogTitle: '', // 模态窗标题
      dialogVisible: false,
      btnArr: [
        {
          name: '新增',
          event: 'add',
          // 权限标志
          rightKey: 'add'
        }
      ]
    }
  },
  methods: {
    close(){
      this.dialogVisible = false
      this.getData(this.query)
    },
    // 新增
    add() {
      this.dialogTitle = '新增活动类型'
      this.dialogVisible = true
    },
    // 编辑
    edit(id){
      this.dialogTitle = '编辑活动类型'
      this.dialogVisible = true
      setTimeout(()=>{
        this.$refs.edit.getDetail(id)
      })
    },
    // 删除
    del(id) {
      this.$confirm('此操作将删除此活动类型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/space-os/rest/backstage/activitiesType/remove', {id: id}).then(res => {
          const data = res.data
          if (data.code == 200) {
            this.$notify.success({title: '成功', message: '删除成功!'})
            this.getData(this.query)
          }
        })
      }).catch(() => {
        this.$notify.info({title: '提示', message: '已取消删除'})
      })
    },
    // 获取页面数据
    getData(data) {
      this.list = []
      this.$store.commit('tableLoading', true)
      this.$axios.post('/space-os/rest/backstage/activitiesType/list', data).then(res => {
        if(res.code == 200) {
          this.list = res.data
          console.log(res)
        }
      }).finally(()=>{
        this.$store.commit('tableLoading', false)
      })
    },
    // 筛选列表
    queryData(form) {
      if(form) this.query = Object.assign(this.query, form)
      this.getData(this.query)
    }
  }
}
</script>

<style scoped>
.activity-type{
  padding-bottom: 120px;
}
.chunk{margin-bottom: 15px;}
</style>
