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
    },
    setComments (state, payload) {
      state.comment = payload.data
    },
    setPostComments (state, payload) {
      console.log('setPostComments', payload)
      state.postComment = payload.data
    },
    setProfileAccountOther (state, payload) {
      state.profileAccountOther = payload.data
      console.log('setProfileAccount', state.profileAccountOther)
    },
    setProfileTimelineOther (state, payload) {
      state.profileTimelineOther = payload.data
      console.log('profileTimelineOther', state.profileTimelineOther)
    },
    setFollowingOther (state, payload) {
      state.followingOther = payload.data
    },
    setFollowersOther (state, payload) {
      state.followersOther = payload.data
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
    getProfileAccountOther ({ commit }, userId) {
      http.get(`/profile/${userId}`)
      .then(({ data }) => {
        console.log('getProfileAccountOther', data)
        commit('setProfileAccountOther', data)
      })
      .catch(err => console.log(err))
    },
    getProfileTimelineOther ({ commit }, userId) {
      http.get(`/posts/profile/${userId}`)
      .then(({ data }) => {
        console.log('getProfileTimelineOther', data)
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
          console.log('getFollowing', data)
          commit('setFollowing', data)
        })
        .catch(err => console.log(err))
      }
    },
    getFollowingOther ({ commit }, userId) {
      http.get(`/following/${userId}`)
      .then(({ data }) => {
        console.log('getFollowingOther', data)
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
          console.log('getFollowers', data)
          commit('setFollowers', data)
        })
        .catch(err => console.log(err))
      }
    },
    getFollowersOther ({ commit }, userId) {
      http.get(`/following/followers/${userId}`)
      .then(({ data }) => {
        console.log('getFollowersOther', data)
        commit('setFollowersOther', data)
      })
      .catch(err => console.log(err))
    },
    getComments ({ commit }, postId) {
      http.get(`/comments/${postId}`)
      .then(({ data }) => {
        console.log('getComments', data)
        commit('setComments', data)
      })
      .catch(err => console.log(err))
    },
    getPostComments ({ commit }, postId) {
      // let postId = this.$route.params.id
      http.get(`/posts/comments/${postId}`)
      .then(({ data }) => {
        console.log('getPostComments', data)
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
          console.log('data hasil add like', data)
          location.reload()
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
    },
    addComment ({ coomit }, comment) {
      console.log('addcomment', comment)
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
          console.log('comment', data)
          location.reload()
        })
        .catch(err => {
          console.log(err)
        })
      }
    }
  }
})
