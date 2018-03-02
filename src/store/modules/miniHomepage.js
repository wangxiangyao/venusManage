import {
  STORE_MINIHOMEPAGE_DATA,
  UPDATE_MINIHOMEPAGE_DATA,
  SAVE_MINIHOMEPAGE_DATA,
  FETCH_MINIHOMEPAGE
} from '../mutation_type.js'

function asignObjOriginHad (origin, data) {
  for (let key in data) {
    if (origin.hasOwnProperty(key)) {
      if (typeof origin[key] === 'object') {
        // 递归调用
        asignObjOriginHad(origin[key], data[key])
      } else {
        if (origin[key] !== data[key]) {
          console.log('改变了', key, data[key])
          origin[key] = data[key]
        }
      }
    } else {
      if (typeof data[key] === 'object') {
        origin[key] = data[key]
      }
    }
  }
}

function asignObjDelete (origin, data) {
  for (let key in origin) {
    if (data.hasOwnProperty(key)) {
      if (typeof origin[key] === 'object') {
        asignObjDelete(origin[key], data[key])
      }
    } else {
      if (typeof origin === 'object') {
        if (Array.isArray(origin)) {
          origin.splice(key, 1)
        }
      } else {
        delete origin[key]
      }
    }
  }
}

function asignObj (origin, data) {
  // 只有origin中存在的项才用data中的数据更新更新
  asignObjOriginHad(origin, data)
  asignObjDelete(origin, data)

  return origin
}

export default {
  namespaced: true,

  state () {
    return {
      data: {},
      isLoading: true,
      isChanged: false,
      isSave: false,
      needDestory: true,
      updated: +new Date()
    }
  },

  mutations: {
    [FETCH_MINIHOMEPAGE] (state) {
      state.isLoading = true
    },
    [STORE_MINIHOMEPAGE_DATA] (state, data) {
      state.data = data
      state.isLoading = false
    },
    [UPDATE_MINIHOMEPAGE_DATA] (state, data) {
      state.data = asignObj(JSON.parse(JSON.stringify(state.data)), data)
      state.isChanged = true
    },
    [SAVE_MINIHOMEPAGE_DATA] (state) {

    }
  }
}
