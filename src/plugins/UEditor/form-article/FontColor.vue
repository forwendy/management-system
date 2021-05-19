<template>
  <el-form label-width="80px">
    <el-form-item label="字体颜色">
      <el-color-picker v-model="color" @change="setColor"></el-color-picker>
    </el-form-item>
    <el-form-item label="快捷选择">
      <div class="colorGroup">
        <span v-for="obj in colorArr" :key="obj" :style="{ background: '#' + obj }" @click="setColor('#' + obj)">{{ obj }}</span>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      color: '#000',
      colorArr: ['c7000b', 'fdd000', '6edd38', '00a0da', '143fab', 'ffffff', 'dcdcdc', 'c0c0c0', '8a8a8a', '707171', '505050', '2d2d2d']
    }
  },
  methods: {
    setColor(val) {
      this.$emit('submit', val)
    }
  }
}
</script>

<style scoped>
.colorGroup {
  display: flex;
  flex-wrap: wrap;
}
.colorGroup span {
  width: 80px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  margin-right: 10px;
  margin-bottom: 10px;
  color: #000;
  cursor: pointer;
}
</style>
