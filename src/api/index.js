import { myFetch } from './fetch'

// function deepCopy (a) {
//   let obj = JSON.parse(JSON.stringify(a))
//   return obj
// }
export default {
  deleteImg (name) {
    return myFetch('/api/deleteImg', {
      name
    }, 'POST')
  }
}
