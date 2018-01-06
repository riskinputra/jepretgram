import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

Vue.use(Vuex)

const http = axios.create({
  baseURL: 'http://localhost:3003'
})

export const store = new Vuex.Store({
  strict: true,
  state: {
    homeTimeline: [],
    exploreTimeline: [],
    profileTimeline: []
  },
  mutations: {
    setHomeTimeline (state, payload) {
      console.log('setHomeTimeline', payload)
      state.homeTimeline = payload.data
      console.log(state.homeTimeline[0].like)
    },
    setExplore (state, payload) {
      console.log('setExplore', payload)
      state.exploreTimeline = payload.data
    },
    setProfileTimeline (state, payload) {
      console.log('setProfileTimeline', payload)
      state.profileTimeline = payload.data
    }
  },
  actions: {
    getHomeTimeline ({ commit }) {
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token')
        const decode = jwtDecode(token)
        const userId = decode.id
        console.log(decode)
        http.get(`/posts/follow/${userId}`)
        .then(({ data }) => {
          console.log('getHouse', data)
          commit('setHomeTimeline', data)
        })
        .catch(err => console.log(err))
      }
    },
    getExplore ({ commit }) {
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token')
        const decode = jwtDecode(token)
        const userId = decode.id
        http.get(`/posts/${userId}`)
        .then(({ data }) => {
          console.log('getExplore', data)
          commit('setExplore', data)
        })
        .catch(err => console.log(err))
      }
    },
    getProfileTimeline ({ commit }) {
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token')
        const decode = jwtDecode(token)
        const userId = decode.id
        http.get(`/posts/profile/${userId}`)
        .then(({ data }) => {
          console.log('getProfileTimeline', data)
          commit('setProfileTimeline', data)
        })
        .catch(err => console.log(err))
      }
    },
    addLike ({ commit }, postId) {
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token')
        const decode = jwtDecode(token)
        const userId = decode.id
        console.log(postId)
        console.log(userId)
        http.put(`/posts/like/${postId}`, {like: userId})
        .then(({data}) => {
          console.log('data hasil add like', data)
          commit('saveLike', data)
        })
        .catch(err => console.log(err))
      }
    }
  }
})
