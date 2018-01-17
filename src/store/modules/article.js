import {
  STORE_ARTICLELIST,
  STORE_ARTICLE,
  NEW_ARTICLE,
  REMOVE_ARTICLE,
  FETCH
} from '../mutation_type.js'
import QUERY_ARTICLELIST from '@/gql/getArticleList.gql'
import QUERY_ARTICLE from '@/gql/getArticle.gql'
import SAVE_ARTICLE from '@/gql/saveArticle.gql'
import ADD_ARTICLE from '@/gql/addArticle.gql'
import DELETE_ARTICLE from '@/gql/deleteArticle.gql'
import { apolloProvider } from '@/serverLink.js'
const client = apolloProvider.defaultClient

function queryRemoveTypename (item) {
  let newInput
  if (typeof item === 'object') {
    // 如果依然是对象类型（数组也是，递归调用），基本类型，复制到新对象
    if (Array.isArray(item)) {
      newInput = []
      for (let [index, value] of item.entries()) {
        if (typeof value === 'object') {
          newInput[index] = queryRemoveTypename(value)
        }
      }
    } else {
      newInput = {}
      for (let [key, value] of Object.entries(item)) {
        if (typeof value === 'object') {
          newInput[key] = queryRemoveTypename(value)
        } else {
          if (key !== '__typename') {
            newInput[key] = value
          }
        }
      }
    }
  }
  return newInput
}

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
    getArticleList ({ commit }) {
      commit('FETCH')
      return client.query({
        query: QUERY_ARTICLELIST
      })
      .then((res) => {
        commit('STORE_ARTICLELIST', res.data)
        return res.data.getArticleList
      })
    },
    getArticle ({ commit }, id) {
      console.log('获取文章id=', id)
      commit('FETCH')
      client.query({
        query: QUERY_ARTICLE,
        variables: {
          id: id
        }
      })
      .then((res) => {
        console.log('获取到文章数据：', res)
        commit('STORE_ARTICLE', res.data.getArticle)
      })
    },
    saveArticle ({ commit }, data) {
      commit(FETCH)
      console.log('要保存的文章：', data)
      client.mutate({
        mutation: SAVE_ARTICLE,
        variables: {
          input: queryRemoveTypename(data)
        }
      })
      .then((res) => {
        console.log('保存文章成功：', res)
        commit('STORE_ARTICLE', res.data.saveArticle)
      })
    },
    addArticle ({ commit }) {
      commit(FETCH)
      client.mutate({
        mutation: ADD_ARTICLE
      })
      .then((res) => {
        commit(NEW_ARTICLE, res.data.addArticle)
      })
    },
    deleteArticle ({ commit }, id) {
      commit(FETCH)
      client.mutate({
        mutation: DELETE_ARTICLE,
        variables: {
          id
        }
      })
      .then((res) => {
        commit(REMOVE_ARTICLE, res.data.deleteArticle.id)
      })
    }
  },
  mutations: {
    [FETCH] (state) {
      state.isLoading = true
    },
    [STORE_ARTICLELIST] (state, data) {
      for (let [key, value] of data.getArticleList.entries()) {
        console.log(key, value)
        state.byId[value.id] = value
        state.all.push(value.id)
      }
      state.isLoading = false
    },
    [NEW_ARTICLE] (state, data) {
      state.all.push(data.id)
      state.byId[data.id] = data
      state.isLoading = false
    },
    [STORE_ARTICLE] (state, data) {
      state.byId[data.id] = data
      state.isLoading = false
    },
    [REMOVE_ARTICLE] (state, id) {
      delete state.byId[id]
      state.all.splice(state.all.indexOf(id), 1)
      state.isLoading = false
    }
  }
}
