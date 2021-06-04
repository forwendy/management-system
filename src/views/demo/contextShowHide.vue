<template>
  <div class="module-detail">
    <div class="chunk">
      <h3>内容超过N行，展示/收起</h3>
      <div class="content-wrapper" v-showRow="5" data-line-height="24">
        <p class="content">OVU创客星创立于2015年8月，是中国电子、中电光谷集团旗下跨区域、综合性的产业孵化平台。 依托中国电子、中电光谷的产业资源共享平台，OVU创客星以高品质物理空间及智能化管理系统为 底层基础，以“一平台两方法论”产业思维逻辑为指引，为产业园区、办公楼宇及办公配套空间，提 供产业策划咨询、规划设计管理、工程建设服务、产业招商运营、双创品牌输出、空间智能改造、 数字平台定制、能源物业管理共8大基于信息化、智能化的双创生态成长服务。秉承“创业者链接一 切资源”的宗旨，致力于构建“中央企业带动，大中小微企业联合创新”的高品质双创发展体系，为各 区域政府、地方经济培育双创发展动能。</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  directives: {
    showRow: {
      inserted: function (el, binding, vnode) {
        const conH = el.getBoundingClientRect().height
        // 行高
        const lineH = Number(el.getAttribute('data-line-height'))
        const row = binding.value
        const text = el.querySelector('.content')
        const btn = document.createElement('p')
        btn.setAttribute('status', 'open')
        btn.className = 'btn'
        btn.innerHTML = '展开'
        if (conH > lineH * row) {
          text.style.height = lineH * row + 'px'
          el.append(btn)
        }
        btn.addEventListener('click', (e) => {
          const btn = e.currentTarget
          const status = btn.getAttribute('status')
          if (status === 'open') {
            btn.setAttribute('status', 'close')
            btn.innerHTML = '收起'
            text.style.height = conH + 'px'
          }
          if (status === 'close') {
            btn.setAttribute('status', 'open')
            btn.innerHTML = '展开'
            text.style.height = lineH * row + 'px'
          }
        })
      },
      update: function (el, binding, vnode) {}
    }
  }
}
</script>

<style>
.chunk {
  margin: 0 10px;
  padding: 30px;
}
.content-wrapper {
  width: 400px;
  text-align: justify;
  font-size: 16px;
  line-height: 24px;
}
.content-wrapper .content {
  overflow: hidden;
  transition: 200ms all;
}
.content-wrapper .btn {
  text-align: right;
  cursor: pointer;
}
</style>
