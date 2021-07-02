<template>
  <div v-drag class="chunk row">
    <SortItem v-for="(obj, i) in list" :key="obj.id" :obj="obj" draggable="true" :data-index="i" :data-sort="obj.sort"> </SortItem>
  </div>
</template>

<script>
import SortItem from './SortItem.vue'
export default {
  components: {
    SortItem
  },
  data() {
    return {
      list: [
        {
          id: 1,
          name: '1',
          sort: 0
        },
        {
          id: 2,
          name: '2',
          sort: 1
        },
        {
          id: 3,
          name: '3',
          sort: 2
        },
        {
          id: 4,
          name: '4',
          sort: 3
        },
        {
          id: 5,
          name: '5',
          sort: 4
        },
        {
          id: 6,
          name: '6',
          sort: 5
        }
      ]
    }
  },
  directives: {
    drag: {
      // 指令的定义
      inserted: function (el, binding, vnode) {
        const vm = vnode.context
        let draging = null
        let target = null
        el.ondragstart = (e) => {
          e.dataTransfer.setData('te', e.target.innerText)
          draging = e.target
        }
        el.ondragover = (e) => {
          e.preventDefault()
          target = e.target
        }
        el.ondragend = (e)=>{
          const flag = Boolean(target.getAttribute('draggable'))
          const targetIndex = Number(target.getAttribute('data-index'))
          const dragingIndex = Number(draging.getAttribute('data-index'))
          if (target != draging && flag) {
            // if (dragingIndex < targetIndex) {
            //   target.parentNode.insertBefore(draging, target.nextSibling)
            // } else {
            //   target.parentNode.insertBefore(draging, target)
            // }
            // for (let i = 0; i < el.childNodes.length; i++) {
            //   el.childNodes[i].setAttribute('data-index', i)
            // }
            vm.list = vm.list.map((el, i, arr)=>{
              if(i === targetIndex){
                return arr[dragingIndex]
              }
              if(i === dragingIndex){
                return arr[targetIndex]
              }
              return el
            })
            vm.sortChange()
          }
        }
      }
    }
  },
  methods: {
    sortChange() {
      const result = []
      for (let i = 0; i < this.list.length; i++) {
        if (i !== this.list[i].sort) {
          result.push({
            id: this.list[i].id,
            sort: i
          })
        }
      }
      console.log(result)
    },
    save() {}
  }
}
</script>

<style>
.chunk {
  padding: 10px;
  width: 210px;
  flex-wrap: wrap;
}
</style>
