<template>
  <div class="set-password">
    <el-form ref="form" :model="password" label-width="80px">
      <el-form-item label="旧密码">
        <el-input show-password clearable type="password" v-model="password.old" style="width: 218px;" placeholder="旧密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input show-password clearable type="password" v-model="password.new1" style="width: 218px;" placeholder="新密码"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input show-password clearable type="password" v-model="password.new2" style="width: 218px;" placeholder="确认密码"></el-input>
      </el-form-item>
      <el-form-item class="but-group">
        <el-button type="primary" @click="save">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data(){
    return {
        password: {
          old: '',
          new1: '',
          new2: ''

      }
    }
  },

  methods:{
    save(){
        if (this.password.old === '')
            return  this.$notify.warning({ title: '提示', message: '请输入旧密码'})
        if (this.password.new1 === '')
            return  this.$notify.warning({ title: '提示', message: '请输入新密码'})
        if (this.password.new2 === '')
            return  this.$notify.warning({ title: '提示', message: '请输入确认密码'})
        if (this.password.new2 !== this.password.new1 )
            return  this.$notify.warning({ title: '提示', message: '两次输入的密码不一致'})
        if (this.password.new2 === this.password.old )
            return  this.$notify.warning({ title: '提示', message: '新旧密码不能相同'})
        this.$axios.post('/account/checkPassword', {oldPassword: this.password.old})
            .then((res) => {
                if (res.data.code == 200) {
                    this.$axios.post('/account/updatePassword', {newPassword: this.password.new2})
                        .then((res) => {
                            let data = res.data
                            if (data.code == 200) {
                                this.$notify.success({title: '成功',message: '密码修改成功'})
                                this.close()
                            }
                        })
                }
            })
    },
    close(){
      this.$emit('close')
    }
  }
}
</script>

<style>
</style>
