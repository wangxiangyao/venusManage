import { myFetch } from './fetch'

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
  }
}
