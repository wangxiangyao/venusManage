import {
  STORE_HOMEPAGE_DATA,
  UPDATE_HOMEPAGE_DATA,
  SAVE_HOMEPAGE_DATA
} from '../mutation_type.js'

import { asignObj } from '../tools.js'

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
    [STORE_HOMEPAGE_DATA] (state, data) {
      state.data = data
      state.isLoading = false
    },
    [UPDATE_HOMEPAGE_DATA] (state, data) {
      state.data = asignObj(JSON.parse(JSON.stringify(state.data)), data)
      state.isChanged = true
    },
    [SAVE_HOMEPAGE_DATA] (state) {

    }
  }
}
