import {
  UPDATE_AUTHOR,
  STORE_AUTHOR,
  REMOVE_AUTHOR,
  FETCH
} from '../mutation_type.js'

import { apolloProvider } from '@/serverLink.js'
import QUERY_AUTHORLIST from '@/gql/getAuthorList.gql'
import ADD_AUTHOR from '@/gql/addAuthor.gql'
import DELETE_AUTHOR from '@/gql/deleteAuthor.gql'

const client = apolloProvider.defaultClient

export default {
  namespaced: true,
  state () {
    return {
      byId: {},
      all: [],
      isLoading: true,
      isChanged: false,
      isSave: false,
      needDestory: true,
      updated: +new Date()
    }
  },
  actions: {
    getAuthorList ({ commit }) {
      client.query({
        query: QUERY_AUTHORLIST
      })
      .then((res) => {
        commit('STORE_AUTHOR', res.data)
      })
    },
    saveAuthorList ({ state, commit }) {

    },
    addAuthor ({ commit }, author) {
      commit(FETCH)
      client.mutate({
        mutation: ADD_AUTHOR,
        variables: {
          input: author
        }
      })
      .then((res) => {
        let newAuthor = res.data.addAuthor
        commit(UPDATE_AUTHOR, {
          id: newAuthor.id,
          data: newAuthor
        })
      })
    },
    deleteAuthor ({ commit }, id) {
      commit(FETCH)
      client.mutate({
        mutation: DELETE_AUTHOR,
        variables: {
          id: id
        }
      })
      .then((res) => {
        commit(REMOVE_AUTHOR, res.data.deleteAuthor.id)
      })
    }
  },
  mutations: {
    [FETCH] (state) {
      state.isLoading = true
    },
    [STORE_AUTHOR] (state, data) {
      for (let [key, value] of data.getAuthorList.entries()) {
        state.byId[value.id] = value
        state.all.push(value.id)
        state.isLoading = false
      }
    },
    [UPDATE_AUTHOR] (state, {id, data}) {
      state.byId[id] = data
      if (!state.all.includes(id)) {
        state.all.push(id)
      }
      state.isLoading = false
    },
    [REMOVE_AUTHOR] (state, id) {
      delete state.byId[id]
      state.all.splice(state.all.indexOf(id), 1)
      state.isLoading = false
    }
  }
}
