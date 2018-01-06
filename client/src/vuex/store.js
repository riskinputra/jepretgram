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
    exploreTimeline: []
  },
  mutations: {
    setHomeTimeline (state, payload) {
      console.log('setHomeTimeline', payload)
      state.homeTimeline = payload.data
    },
    setExplore (state, payload) {
      console.log('setExplore', payload)
      state.exploreTimeline = payload.data
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
      http.get('/posts')
      .then(({ data }) => {
        console.log('getExplore', data)
        commit('setExplore', data)
      })
      .catch(err => console.log(err))
    }
  }
})
