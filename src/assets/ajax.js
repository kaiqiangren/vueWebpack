import qs from 'qs'

// 文件上传队列
const uploadQueue = {}
// 取消文件上传
export const cancelUpload = (md5) => {
  if (uploadQueue[md5]) {
    uploadQueue[md5].abort()
    delete uploadQueue[md5]
  }
}
// 文件上传请求
export const postFile = (url, params, md5) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            resolve(JSON.parse(xhr.responseText))
          } catch (e) {
            reject(e)
          }
        }
      }
    }
    if (md5) {
      uploadQueue[md5] = xhr
    }
    xhr.send(params)
  })
}
// 发送post请求
export const post = (url, params, md5) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', url)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            resolve(JSON.parse(xhr.responseText))
          } catch (e) {
            reject(e)
          }
        }
      }
    }
    if (md5) {
      uploadQueue[md5] = xhr
    }
    xhr.send(qs.stringify(params))
  })
}

export const get = (url, params, md5) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    if (params) {
      url = url + '?' + qs.stringify(params)
    }
    xhr.open('GET', url)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            resolve(JSON.parse(xhr.responseText))
          } catch (e) {
            reject(e)
          }
        }
      }
    }
    if (md5) {
      uploadQueue[md5] = xhr
    }
    xhr.send()
  })
}
