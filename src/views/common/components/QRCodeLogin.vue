<template>
  <div class="QRCode-login">
    <p class="notes">请使用 <el-link type="primary" href="" target="_blank">{{brand.name}}员工端app</el-link> 扫码</p>
    <div class="qrcode">
      <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558589832876&di=b06bfdcf0d1e39d82af00edec9942fe8&imgtype=0&src=http%3A%2F%2Fimgs.soufun.com%2Fnews%2F2016_12%2F06%2Fhouse%2F1481006722484_000.gif">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data(){
    return {

    }
  },
  computed: mapState({
    brand: state => state.brand,
  }),
}
</script>

<style scoped>
.notes{
  font-size: 14px;
  line-height: 19px;
  margin: 5px 0 45px;
}
.qrcode img{
  display: block;
  width: 200px;
  height: 200px;
  margin: 0 auto;
}
</style>
