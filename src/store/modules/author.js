import {
  UPDATE_AUTHOR,
  STORE_AUTHOR
} from '../mutation_type.js'

import { apolloProvider } from '@/serverLink.js'
import QUERY_AUTHORLIST from '@/gql/getAuthorList.gql'
import ADD_AUTHOR from '@/gql/addAuthor.gql'

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
    deleteAuthor () {

    }
  },
  mutations: {
    [STORE_AUTHOR] (state, data) {
      for (let [key, value] of data.getAuthorList.entries()) {
        console.log(key, value)
        state.byId[value.id] = value
        state.all.push(value.id)
        state.isLoading = false
      }
    },
    [UPDATE_AUTHOR] (state, {id, data}) {
      state.byId[id] = data
    }
  }
}
