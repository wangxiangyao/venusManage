import {
  UPDATE_MINIHOMEPAGE_DATA,
  FETCH_MINIHOMEPAGE
} from '../mutation_type.js'

import MINIHOMEPAGE_QUERY from '@/gql/miniHomepage/getMiniHomepage.gql'
import MINIHOMEPAGE_MUTATION from '@/gql/miniHomepage/setMiniHomepage.gql'
import { apolloProvider } from '@/serverLink.js'
import { queryRemoveTypename } from '@/assets/lib/tools.js'
import { asignObj } from '../tools.js'

const client = apolloProvider.defaultClient

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
