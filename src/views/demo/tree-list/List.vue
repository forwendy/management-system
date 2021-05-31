<template>
  <div class="tree-table">
    <div class="tree-table-title">
      <span style="width: 200px; text-align: left">活动类型名称</span>
      <span style="width: 200px">操作</span>
    </div>
    <el-tree class="tree-table-list" :default-expand-all="false" node-key="id" :data="list" :draggable="true" :allow-drop="allowDrop" @node-drag-end="handleDragEnd">
      <div class="table-tree-item" slot-scope="{ data }">
        <div style="width: 200px; text-align: left">{{ data.type_name }}</div>
        <div style="width: 150px; justify-content: space-around">
          <el-button size="mini" @click.stop="edit(data.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click.stop="del(data.id)">删除</el-button>
          <span class="iconfont move">&#xe63e;</span>
        </div>
      </div>
    </el-tree>
  </div>
</template>

<script>
import moveApi from '@/api/modules/move.js'
export default {
  props: {
    list: Array
  },
  methods: {
    edit(id) {
      this.$emit('edit', id)
    },
    del(id) {
      this.$emit('del', id)
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      const pid = dropNode.parent.key || 0 // 父id
      const id = draggingNode.key //id
      const list = dropNode.parent.childNodes
      const sortField = 'sort' //排序字段
      const pidField = 'parent_id' //父节点字段
      let index = 0
      if (dropType == 'before' || dropType == 'after') {
        for (let i = 0; i < list.length; i++) {
          if (list[i].key == id) {
            index = i + 1
          }
        }
        // console.log('pid：',pid, 'id：',id,'index',index)
        moveApi.moveTree('activities_type', id, pid, index, sortField, pidField).then((res) => {
          this.$notify.success({ title: '成功', message: '移动成功!' })
        })
      }
    },
    allowDrop(draggingNode, dropNode, type) {
      if (type == 'inner') {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/css/tree-list.scss';
</style>
