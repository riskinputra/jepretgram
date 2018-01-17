import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

Vue.use(Vuex)

const http = axios.create({
  baseURL: 'http://35.197.159.250:3003'
})

export const store = new Vuex.Store({
  strict: true,
  state: {
    homeTimeline: [],
    postFollow: [],
    exploreTimeline: [],
    profileTimeline: [],
    profileAccount: [],
    followers: [],
    following: [],
    comment: [],
    postComment: [],
    profileTimelineOther: [],
    profileAccountOther: [],
    followersOther: [],
    followingOther: []
  },
  mutations: {
    setHomeTimeline (state, payload) {
      state.homeTimeline = payload
      console.log('setHomeTimeline ono', state.homeTimeline)
    },
    setExplore (state, payload) {
      state.exploreTimeline = payload.data
    },
    setProfileTimeline (state, payload) {
      state.profileTimeline = payload.data
    },
    setProfileAccount (state, payload) {
      state.profileAccount = payload.data
    },
    setFollowing (state, payload) {
      state.following = payload.data
    },
    setFollowers (state, payload) {
      state.followers = payload.data
    },
    setComments (state, payload) {
      state.comment = payload.data
    },
    setPostComments (state, payload) {
      state.postComment = payload.data
    },
    setProfileAccountOther (state, payload) {
      state.profileAccountOther = payload.data
    },
    setProfileTimelineOther (state, payload) {
      state.profileTimelineOther = payload.data
    },
    setFollowingOther (state, payload) {
      state.followingOther = payload.data
    },
    setFollowersOther (state, payload) {
      state.followersOther = payload.data
    },
    setPostFollow (state, payload) {
      let following = state.homeTimeline
      for (let i = 0; i < following.length; i++) {
        for (let j = 0; j < payload.length; j++) {
          if (state.homeTimeline[i].followingId === payload[j].userId._id) {
            state.postFollow.push(payload[j])
            console.log('postFollow ini', state.postFollow)
          }
        }
      }
    }
  },
  actions: {
    registerUser ({ commit }, payload) {
      http.post('/signup', payload)
      .then(({ data }) => {
        console.log(data)
      })
      .catch(err => {
        console.error(err)
      })
    },
    loginUser ({ commit }, payload) {
      // console.log(payload)
      http.post('/signin', payload)
      .then(({data}) => {
        console.log(data.token)
        localStorage.setItem('token', data.token)
        location.reload()
      })
      .catch(err => {
        console.error(err)
      })
    },
    getHomeTimeline ({ commit }) {
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token')
        const decode = jwtDecode(token)
        const userId = decode.id
        http.get(`/posts/follow/${userId}`)
        .then(({ data }) => {
          console.log('getHomeTimeline', data.data)
          commit('setHomeTimeline', data.data)
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
          console.log('explore', data)
          commit('setPostFollow', data.data)
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
          commit('setProfileAccount', data)
        })
        .catch(err => console.log(err))
      }
    },
    getProfileAccountOther ({ commit }, userId) {
      http.get(`/profile/${userId}`)
      .then(({ data }) => {
        commit('setProfileAccountOther', data)
      })
      .catch(err => console.log(err))
    },
    getProfileTimelineOther ({ commit }, userId) {
      http.get(`/posts/profile/${userId}`)
      .then(({ data }) => {
        commit('setProfileTimelineOther', data)
      })
      .catch(err => console.log(err))
    },
    getFollowing ({ commit }) {
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token')
        const decode = jwtDecode(token)
        const userId = decode.id
        http.get(`/following/${userId}`)
        .then(({ data }) => {
          commit('setFollowing', data)
        })
        .catch(err => console.log(err))
      }
    },
    getFollowingOther ({ commit }, userId) {
      http.get(`/following/${userId}`)
      .then(({ data }) => {
        commit('setFollowingOther', data)
      })
      .catch(err => console.log(err))
    },
    getFollowers ({ commit }) {
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token')
        const decode = jwtDecode(token)
        const userId = decode.id
        http.get(`/following/followers/${userId}`)
        .then(({ data }) => {
          commit('setFollowers', data)
        })
        .catch(err => console.log(err))
      }
    },
    getFollowersOther ({ commit }, userId) {
      http.get(`/following/followers/${userId}`)
      .then(({ data }) => {
        commit('setFollowersOther', data)
      })
      .catch(err => console.log(err))
    },
    getComments ({ commit }, postId) {
      http.get(`/comments/${postId}`)
      .then(({ data }) => {
        commit('setComments', data)
      })
      .catch(err => console.log(err))
    },
    getPostComments ({ commit }, postId) {
      http.get(`/posts/comments/${postId}`)
      .then(({ data }) => {
        commit('setPostComments', data)
      })
      .catch(err => console.log(err))
    },
    addLike ({ commit }, postId) {
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token')
        const decode = jwtDecode(token)
        const userId = decode.id
        http.put(`/posts/like/${postId}`, {like: userId})
        .then(({data}) => {
          location.reload()
        })
        .catch(err => console.log(err))
      }
    },
    addPost ({ commit }, newPost) {
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token')
        const decode = jwtDecode(token)
        const userId = decode.id
        let newData = new FormData()
        newData.append('caption', newPost.description)
        newData.append('image', newPost.image)
        newData.append('userId', userId)
        http.post(`/posts`, newData, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
        .then(({data}) => {
          location.reload()
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
    deletePost ({ commit }, postId) {
      http.delete(`/posts/${postId}`)
      .then(({data}) => {
        location.reload()
      })
      .catch(err => {
        console.log(err)
      })
    },
    editProfile ({ commit }, profileData) {
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token')
        const decode = jwtDecode(token)
        const userId = decode.id
        let newData = new FormData()
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
          location.reload()
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
    addFollowing ({ commit }, followingId) {
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token')
        const decode = jwtDecode(token)
        const userId = decode.id
        http.post('/following', {
          userId: userId,
          followingId: followingId
        })
        .then(({data}) => {
          console.log('addFolllowing', data)
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
          location.reload()
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
    addComment ({ coomit }, comment) {
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token')
        const decode = jwtDecode(token)
        const userId = decode.id
        http.post('/comments', {
          userId: userId,
          postId: comment.postId,
          text: comment.text
        })
        .then(({data}) => {
          location.reload()
        })
        .catch(err => {
          console.log(err)
        })
      }
    }
  }
})
