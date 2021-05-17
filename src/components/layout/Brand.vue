<template>
  <div class="brand" :class="{ isCollapse: !isCollapse }">
    <ImageView class="brand-pic" :prefix="$prefix" :src="brand.loginBg"></ImageView>
    <p class="brand-name">{{ brand.name }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ImageView from '@/components/ui/ImageView.vue'
export default {
  components: {
    ImageView
  },
  computed: {
    ...mapState({
      isCollapse: (state) => state.menus.leftMenuShow,
      brand: (state) => state.brand.info
    })
  }
}
</script>

<style scoped>
.brand {
  width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  background: #20222a;
  color: #fff;
  padding: 40px 15px;
}
.brand-pic {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  margin-bottom: 15px;
}
.brand-name {
  width: 100%;
  box-sizing: border-box;
  text-align: center;
}
.isCollapse {
  width: 64px;
  justify-content: center;
}
.isCollapse .brand-pic {
  width: 30px;
  height: 30px;
}
.isCollapse .brand-name {
  display: none;
}
</style>
