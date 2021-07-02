<template>
  <div class="sort-item">
    {{ obj.name }}
  </div>
</template>

<script>
export default {
  props: {
    obj: Object
  }
}
</script>

<style>
.sort-item {
  width: 50px;
  height: 50px;
  background: #eeeeee;
  margin: 10px;
  text-align: center;
  line-height: 50px;
}
</style>
