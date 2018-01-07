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
    profileTimeline: [],
    profileAccount: [],
    followers: [],
    following: []
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
    },
    setProfileAccount (state, payload) {
      state.profileAccount = payload.data
      console.log('setProfileAccount', state.profileAccount)
    },
    setFollowing (state, payload) {
      state.following = payload.data
    },
    setFollowers (state, payload) {
      state.followers = payload.data
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
    getProfileAccount ({ commit }) {
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token')
        const decode = jwtDecode(token)
        const userId = decode.id
        http.get(`/profile/${userId}`)
        .then(({ data }) => {
          console.log('getProfileAccount', data)
          commit('setProfileAccount', data)
        })
        .catch(err => console.log(err))
      }
    },
    getFollowing ({ commit }) {
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token')
        const decode = jwtDecode(token)
        const userId = decode.id
        http.get(`/following/${userId}`)
        .then(({ data }) => {
          console.log('getFollowing', data)
          commit('setFollowing', data)
        })
        .catch(err => console.log(err))
      }
    },
    getFollowers ({ commit }) {
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token')
        const decode = jwtDecode(token)
        const userId = decode.id
        http.get(`/following/followers/${userId}`)
        .then(({ data }) => {
          console.log('getFollowers', data)
          commit('setFollowers', data)
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
          // commit('saveLike', data)
        })
        .catch(err => console.log(err))
      }
    },
    addPost ({ commit }, newPost) {
      console.log('post', newPost)
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token')
        const decode = jwtDecode(token)
        const userId = decode.id
        let newData = new FormData()
        console.log('newData', newData)
        newData.append('caption', newPost.description)
        newData.append('image', newPost.image)
        newData.append('userId', userId)
        http.post(`/posts`, newData, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(({data}) => {
          console.log('addPost', data)
          location.reload()
          // commit('savePost', data)
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
    deletePost ({ commit }, postId) {
      console.log('postId', postId)
      http.delete(`/posts/${postId}`)
      .then(({data}) => {
        console.log('DeletePost', data)
        location.reload()
      })
      .catch(err => {
        console.log(err)
      })
    },
    editProfile ({ commit }, profileData) {
      console.log('postId', profileData)
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token')
        const decode = jwtDecode(token)
        const userId = decode.id
        let newData = new FormData()
        console.log('profileData', profileData)
        newData.append('username', profileData.username)
        newData.append('image', profileData.image)
        newData.append('email', profileData.email)
        newData.append('password', profileData.password)
        http.put(`/profile/${userId}`, newData, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(({data}) => {
          console.log('editProfile', data)
          location.reload()
          // commit('savePost', data)
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
    addFollowing ({ commit }, followingId) {
      console.log('followingId', followingId)
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token')
        const decode = jwtDecode(token)
        const userId = decode.id
        http.post('/following', {
          userId: userId,
          followingId: followingId
        })
        .then(({data}) => {
          console.log('addFollowing', data)
          location.replace('/')
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
    unfollowing ({ commit }, followingId) {
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token')
        const decode = jwtDecode(token)
        const userId = decode.id
        http.post('/following/unfollowing', {
          userId: userId,
          followingId: followingId
        })
        .then(({data}) => {
          console.log('unfollowing', data)
          location.reload()
        })
        .catch(err => {
          console.log(err)
        })
      }
    }
  }
})
