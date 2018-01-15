import {myFetch} from './fetch'

// function deepCopy (a) {
//   let obj = JSON.parse(JSON.stringify(a))
//   return obj
// }
export default {
  getHomepageDate (op = {}) {
    console.log('请求数据')
    return myFetch('', op)
  }
}
