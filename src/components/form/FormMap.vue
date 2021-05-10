<template>
<div class="form-map">
  <el-input v-model="address" auto-complete="off" style="width: 100%;" @input="changeKey"></el-input>
  <baidu-map id="map" class="map" :center="center" :zoom="zoom" :scroll-wheel-zoom="true"
  @click="click" @ready="mapReady" @load="mapLoad">
    <bm-local-search class="map-search"
     @markersset="markersset" @infohtmlset="infohtmlset" @resultshtmlset="resultshtmlset" @searchcomplete="searchcomplete"
    :keyword="keyword" :auto-viewport="true" :pageCapacity="4"></bm-local-search>
    <bm-marker v-if="point" :position="point" :dragging="true" animation="BMAP_ANIMATION_BOUNCE"></bm-marker>
  </baidu-map>
</div>
</template>

<script>
import Vue from 'vue'
// 引入百度地图
import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  ak: process.env.VUE_APP_BAI_DU_AK
})

export default {
  data() {
    return {
      center: '武汉',
      mapObject: null, // 地图对象
      mapMarker: null, // 坐标点对象
      zoom: 18, // 地图缩放

      keyword: '',

      // province: '', // 省
      // city: '', // 市
      // district: '', // 区

      address: '', // 地图搜索关键词 (地址)
      longitude: '', // 经度
      latitude: '', // 纬度
    }
  },
  props: {
    value: Object,
    options: Object
  },
  watch: {
    value(val) {
      this.setValue()
    }
  },
  methods: {
    mapReady({ BMap, map }) {
      this.mapObject = map
    },
    mapLoad(){
      this.setValue()
    },
    // 标注添加完成后的回调函数。
    markersset(obj){
      // console.log(obj)
    },
    // 标注气泡内容创建后的回调函数。
    infohtmlset(obj){
      // console.log(obj)
      this.longitude = obj.point.lng
      this.latitude = obj.point.lat
      this.address = obj.address
      this.keyword = ''
      // 赋值
      this.change()
    },
    // 结果列表添加完成后的回调函数。
    resultshtmlset(obj){
      // console.log(obj)
    },
    // 检索完成后的回调函数。
    searchcomplete(obj){
      // console.log(obj)
    },
    changeKey(val){
      this.keyword = val

      this.$emit('input', {
        address: this.address,
        longitude: this.longitude,
        latitude: this.latitude
      })
    },
    click({ type, target, point, pixel, overlay }) {
      const vm = this
      // console.log(type,target,point,pixel,overlay)
      if (type == 'onclick') {
        this.longitude = point.lng
        this.latitude = point.lat

        const geoc = new BMap.Geocoder()
        geoc.getLocation(point, function(rs) {
          // console.log(rs)
          vm.address = rs.address
          // 赋值
          vm.change()
        })
      }
    },
    setPoint(){
      if (this.longitude && this.latitude) {
        this.point = this.center = {
          lng: this.longitude,
          lat: this.latitude
        }
      } else {
        this.point = false
        this.center = '武汉'
      }
    },
    setValue(){
      // 赋值
      this.longitude = this.value.longitude
      this.latitude = this.value.latitude
      this.address = this.value.address
      this.setPoint()
    },
    change(){
      this.setPoint()
      this.$emit('input', {
        address: this.address,
        longitude: this.longitude,
        latitude: this.latitude
      })
      this.$emit('change')
      // console.log({
      //   address: this.address,
      //   longitude: this.longitude,
      //   latitude: this.latitude
      // })
    }
  }
}
</script>

<style>
.map {
  width: 100%;
  height: 300px;
  margin-top: 10px;
  position: relative;
}
.map-search{
  position: absolute;
  top: -11px;
  width: 50%;
  background: #fff;
  z-index: 1;
}
.form-map .el-input__inner {
  width: 100%;
}
</style>
