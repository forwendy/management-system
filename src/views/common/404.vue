<template>
  <div class="page-404">
    <h1>404</h1>
    <h4>找不到页面</h4>
    <ol>
      <li>请确定路径地址是否正确？</li>
      <li>是否添加品牌后缀？</li>
      <li><el-button type="text" @click="replace('/login/ovu')">OVU创客星</el-button></li>
    </ol>
  </div>
</template>

<script>
export default {
  methods:{
    replace(path){
      this.$router.replace({path: path})
    }
  }
}
</script>

<style scoped>
.page-404{
  width: 250px;
  margin: 30px auto;
}
h1,h4{
  text-align: center;
}
li{
  line-height: 40px;
}
</style>
