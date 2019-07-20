import { config } from '../config.js'

const tips = {
  1: '抱歉，出现了一个错误'
}
// let head = {
//   'content-type': 'application/x-www-form-urlencoded'
// }
let token = wx.getStorageSync('_token')

// if (token){

// }

class HTTP{
  request({ url, data = {}, method = 'GET' }) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method)
    })
  }
  _request(url, resolve, reject, data = {}, method = 'GET') {
    let token = wx.getStorageSync('_token')
    wx.request({
      url: config.api_blink_url + url,
      method: method,
      data: data,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'request-attr-user':token
      },
      success: (res) => {
        const code = res.statusCode.toString()
        console.log(res.data.code)
        if(res.data.code == '9999'){
          wx.navigateTo({
            url: '/pages/log/index',
          })
        }
        if (code.startsWith('2')) {
          resolve(res.data)
        }
        else {
          reject()
          const error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        reject()
        this._show_error(1)
      }
    })

  }

  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 2000
    })
  }
}

export { HTTP }