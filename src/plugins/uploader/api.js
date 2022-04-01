import axios from 'axios'
// 华为云 BrowserJS SDK
import ObsClient from '@/plugins/uploader/js/esdk-obs-browserjs-without-polyfill-3.19.9.min.js'
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
    const uptoken = await this.getQNToken()
    formData.append('token', uptoken)
    formData.append('file', file)
    formData.append('key', file.name)
    return instance.post(process.env.VUE_APP_QI_NIU_UP, formData).then((res) => {
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
      return res.data.uptoken
    })
  },
  // 服务端上传
  serverUpload({ file, prePath }) {
    const instance = axios.create({
      timeout: 3000,
      mimeType: 'multipart/form-data',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    const formData = new FormData()
    formData.append('file', file)
    formData.append('filename', file.name)
    return instance.post(process.env.VUE_APP_UPLOAD + `?prePath=${prePath}`, formData).then((res) => {
      if (res.status === 200) {
        return res.data
      } else {
        return Promise.reject(res)
      }
    })
  },
  // 华为云上传
  uploadHW({ file, key }) {
    const obsClient = new ObsClient({
      access_key_id: process.env.VUE_APP_HW_ACCESS_KEY_ID,
      secret_access_key: process.env.VUE_APP_HW_SECRET_ACCESS_KEY,
      server: process.env.VUE_APP_HW_SERVER,
      timeout: 60 * 5
    })
    return obsClient
      .putObject({
        Bucket: process.env.VUE_APP_HW_BUCKET,
        Key: key,
        Metadata: { property: 'property-value' },
        SourceFile: file,
        ProgressCallback: (transferredAmount, totalAmount, totalSeconds) => {

        }
      })
      .then((result) => {
        if (result.InterfaceResult) {
          return '/'+key
        }
      })
      .catch((err) => {
        return Promise.reject(err)
      })
  }
}
