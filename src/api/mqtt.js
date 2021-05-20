import mqtt from 'mqtt'

export default {
  connection: {
    host: process.env.VUE_APP_HOST,
    port: 8183,
    endpoint: '/mqtt',
    clean: true, // 保留会话
    connectTimeout: 4000, // 超时时间
    reconnectPeriod: 4000, // 重连时间间隔
    // 认证信息
    clientId: 'bimScreen',
    username: 'admin',
    password: 'public'
  },
  client: {
    connected: false
  },
  connect (v) {
    const {host, port, endpoint, ...options} = this.connection
    const connectUrl = `ws://${host}:${port}${endpoint}`
    try {
      if (!this.client.connected) {
        this.client = mqtt.connect(connectUrl, options)
      }
    } catch (error) {
      console.log('mqtt.connect error', error)
    }
    this.client.on('connect', () => {
      this.subscribe('bim-screen', 0)
      console.log('Connection succeeded!')
    })
    this.client.on('error', error => {
      console.log('Connection failed', error)
    })
    this.client.on('message', (topic, message) => {
      console.log(this.byteToString(message))
      try {
        let payload = JSON.parse(this.byteToString(message))
        let myNotification = new Notification(payload.title, {
          body: payload.msg,
          data: payload,
          icon: payload.icon
        })
        myNotification.onclick = (e) => {
          // let win = window.remote.app.win
          const remote = window.require('electron').remote
          remote.getGlobal('win').show()
          console.log(remote.getGlobal('env')['OVU_PC_USER'])
          // console.log(win)
          let payload = e.target.data
          if (payload.type === '0') {
            v.$electron.shell.openExternal(payload.data.url)
          } else {
            v.$router.push(payload.data.url)
          }
        }
      } catch (error) {
        console.log('message failed', error)
      }
    })
  },
  byteToString (arr) {
    if (typeof arr === 'string') {
      return arr
    }
    let str = ''
    let _arr = arr
    for (let i = 0; i < _arr.length; i++) {
      let one = _arr[i].toString(2)
      let v = one.match(/^1+?(?=0)/)
      if (v && one.length === 8) {
        let bytesLength = v[0].length
        let store = _arr[i].toString(2).slice(7 - bytesLength)
        for (let st = 1; st < bytesLength; st++) {
          store += _arr[st + i].toString(2).slice(2)
        }
        str += String.fromCharCode(parseInt(store, 2))
        i += bytesLength - 1
      } else {
        str += String.fromCharCode(_arr[i])
      }
    }
    return str
  },
  // 订阅主题
  subscribe (topic, qos) {
    this.client.subscribe(topic, {qos}, (error, res) => {
      if (error) {
        console.log('Subscribe to topics error', error)
        return
      }
      this.subscribeSuccess = true
      console.log('Subscribe to topics res', res)
    })
  },
  // 取消订阅
  unSubscribe (topic) {
    this.client.unsubscribe(topic, error => {
      if (error) {
        console.log('Unsubscribe error', error)
      }
    })
  },
  // 消息发布
  publish (topic, qos, payload) {
    this.client.publish(topic, payload, qos, error => {
      if (error) {
        console.log('Publish error', error)
      }
    })
  },
  // 断开连接
  destroyConnection () {
    if (this.client.connected) {
      try {
        this.client.end()
        this.client = {
          connected: false
        }
        console.log('Successfully disconnected!')
      } catch (error) {
        console.log('Disconnect failed', error.toString())
      }
    }
  }
}
