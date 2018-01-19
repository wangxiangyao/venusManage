export let baseUrl = global.URI

export async function myFetch (url = '', data = {}, type = 'GET', base) {
  type = type.toUpperCase()
  if (base) {
    url = base + url
  } else {
    url = baseUrl + url
  }
  console.log(url, type)
  if (type === 'GET') {
    let dataStr = ''
    Object.keys(data).forEach(key => {
      dataStr = dataStr + key + '=' + data[key] + '&'
    })
    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
      url = url + '?' + dataStr
    }
  }

  if (window.fetch) {
    let requestConfig = {
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      cache: 'force-cache'
    }

    if (type === 'POST' || type === 'PUT' || type === 'DELETE') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      })
    }

    try {
      const response = await fetch(url, requestConfig)
      console.log('请求中')
      const responseJson = await response.json()
      return responseJson
    } catch (error) {
      let e = new Error(error)
      console.log('捕获到错误', e.name, e.message)
      if (e.message === 'TypeError: Failed to fetch') {
        console.log('更换url，重新fetch')
        return 'change fetch'
      }
      throw new Error(error)
    }
  } else {
    // 无法使用fetch api的，用普通ajax
    return new Promise((resolve, reject) => {
      let requestObj
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest()
      } else {
        /* eslint-disable no-undef */
        requestObj = new ActiveXObject()
      }

      let sendData = ''
      if (type === 'POST' || type === 'PUT' || type === 'DELETE') {
        sendData = JSON.stringify(data)
      }

      requestObj.open(type, url, true)
      requestObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      requestObj.send(sendData)

      requestObj.onreadystatechange = () => {
        if (requestObj.readyState === 4) {
          if (requestObj.status === 200) {
            let obj = requestObj.response
            if (typeof obj !== 'object') {
              obj = JSON.parse(obj)
            }
            resolve(obj)
          } else {
            reject(requestObj)
          }
        }
      }
    })
  }
}
