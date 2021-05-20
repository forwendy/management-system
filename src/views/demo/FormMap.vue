<template>
  <el-form class="edit-form" :model="form" :rules="rules" ref="edit" label-width="120px" size="medium">
    <el-form-item label="百度地图" prop="address">
      <FormMap v-model="form.address"></FormMap>
    </el-form-item>
    <el-form-item class="but-group">
      <el-button type="primary" @click="save('edit')">确定</el-button>
      <el-button @click="close">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import FormMap from '@/plugins/baidu/FormMap.vue'
export default {
  components: {
    FormMap
  },
  data() {
    return {
      form: {
        address: {
          address: '',
          longitude: '',
          latitude: ''
        }
      },
      rules: {
        address: [{ required: true, message: '请选择地址', trigger: 'change' }]
      }
    }
  },
  methods: {
    save() {},
    close() {}
  }
}
</script>

<style class="scss">
.edit-form {
  margin: 0 15px;
  padding: 50px;
  background: #ffffff;
}
</style>
