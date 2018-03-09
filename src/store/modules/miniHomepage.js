import {
  UPDATE_MINIHOMEPAGE_DATA,
  FETCH_MINIHOMEPAGE
} from '../mutation_type.js'

import MINIHOMEPAGE_QUERY from '@/gql/miniHomepage/getMiniHomepage.gql'
import MINIHOMEPAGE_MUTATION from '@/gql/miniHomepage/setMiniHomepage.gql'
import { apolloProvider } from '@/serverLink.js'
import { queryRemoveTypename } from '@/assets/lib/tools.js'

const client = apolloProvider.defaultClient

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
  actions: {
    getMiniHomepage ({ state, commit }) {
      // TODO: 根据
      commit(FETCH_MINIHOMEPAGE)
      client.query({
        query: MINIHOMEPAGE_QUERY
      })
      .then((res) => {
        state.data = res.data.getMiniHomepage
        state.isLoading = false
      })
    },
    setMiniHomepage ({ state, commit }) {
      commit(FETCH_MINIHOMEPAGE)
      client.mutate({
        mutation: MINIHOMEPAGE_MUTATION,
        variables: {
          input: queryRemoveTypename(state.data)
        }
      })
      .then((res) => {
        // 判断条件
        state.isLoading = false
      })
    }
  },
  mutations: {
    [FETCH_MINIHOMEPAGE] (state) {
      state.isLoading = true
    },
    [UPDATE_MINIHOMEPAGE_DATA] (state, data) {
      state.data = asignObj(JSON.parse(JSON.stringify(state.data)), data)
      state.isChanged = true
    }
  }
}
