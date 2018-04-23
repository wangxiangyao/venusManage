import { myFetch } from './fetch'
import axios from 'axios'

// function deepCopy (a) {
//   let obj = JSON.parse(JSON.stringify(a))
//   return obj
// }
export default {
  deleteImg (name) {
    return myFetch({
      url: '/api/deleteImg',
      data: {name: name},
      type: 'POST'
    })
  },
  uploadImg (file) {
    return myFetch({
      url: '/api/uploadImg',
      data: file,
      type: 'POST'
    })
  },
  brand () {
    return myFetch({
      url: '/api/brands',
      type: 'GET'
    })
  },
  oldHome () {
    return myFetch({
      type: 'GET',
      url: '/home/json/main.json',
      base: 'http://venus-resource.oss-cn-shanghai.aliyuncs.com'
    })
  },
  oldHomeUpdata (data) {
    return axios.post(`${global.URI}/api/oldHome`, {
      ...data
    })
  }
}
