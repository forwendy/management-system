import axios from 'axios'
export default {
  // 上传七牛云
  async uploadFileQN(file) {
    const instance = axios.create({
      timeout: 3000,
      mimeType: 'multipart/form-data',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    const formData = new FormData()
    const { uptoken } = await getQNToken()
    formData.append('token', uptoken)
    formData.append('file', file)
    formData.append('key', formatName(file.name))
    instance.post(process.env.VUE_APP_QI_NIU_UP, formData).then((res) => {
      if (res.status === 200) {
        return res.data
      } else {
        return Promise.reject(res)
      }
    })
  },
  // 获取七牛云token
  getQNToken() {
    const instance = axios.create({
      timeout: 3000,
      mimeType: 'multipart/form-data'
    })
    return instance.get(process.env.VUE_APP_API_ROOT + '/space-os/rest/backstage/portal/qiniu/getToken').then((res) => {
      return res.uptoken
    })
  },
  // 服务端上传
  serverUpload() {
    const instance = axios.create({
      timeout: 3000,
      mimeType: 'multipart/form-data',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    const formData = new FormData()
    formData.append('file', file)
    formData.append('filename', formatName(file.name))
    instance.post(process.env.VUE_APP_UPLOAD + `?prePath=${prePath}`, formData).then((res) => {
      if (res.status === 200) {
        return res.data
      } else {
        return Promise.reject(res)
      }
    })
  },
  // url解码
  decodeName(url) {
    if (this.status < 4) return ''
    const name = url.split('://')[1].split('//')[1].split('/')[1]
    if (!name) return ''
    const lastComma = name.lastIndexOf('.')
    if (!lastComma) return ''
    const text = name.slice(0, lastComma)
    if (!text) return ''
    const suffix = name.slice(lastComma, name.length)
    return decode(text) + suffix
  },
  // 格式化文件名称
  formatName(name) {
    // 移除逗号 - 空格 - 转义
    name = name.replace(',', '').replace(/\s*/g, '')
    const lastComma = name.lastIndexOf('.')
    const text = name.slice(0, lastComma)
    const suffix = name.slice(lastComma, name.length)
    return new Date().getTime() + '/' + encode(text) + suffix
  }
}

const encode = (data) => {
  return window.btoa(encodeURIComponent(JSON.stringify(data)))
}

const decode = (data) => {
  return JSON.parse(decodeURIComponent(window.atob(data)))
}
