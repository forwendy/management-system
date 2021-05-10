<template>
  <script :id="name" type="text/plain"></script>
</template>

<script>
export default {
  name: 'UEditor',
  props: {
    name: {
      type: String
    },
    config: {
      type: Object
    },
    value: {
      type: String
    },
  },
  data() {
    return {
      editor: null
    }
  },
  watch: {
    value(val){
      this.setContent(val)
    }
  },
  mounted() {
    this.editor = UE.getEditor(this.name, this.config)
    this.editor.addListener('ready', (editor) => {
      this.$emit('ready')
    })
    this.editor.addListener('contentChange', (editor) => {
      this.$emit('input', this.getContent())
    })
  },
  destroyed() {
    this.editor.destroy()
  },
  methods: {
    getHtml() {
      return this.editor.getAllHtml()
    },
    getContent() {
      return this.editor.getContent()
    },
    setContent(val) {
      // this.editor.addListener('ready', (editor) => {
      //   if(val) this.editor.setContent(val)
      // })
      if(val) this.editor.setContent(val)
    },
    destroyed() {
      this.editor.destroy()
    }
  }
}
</script>
