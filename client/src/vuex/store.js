import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true
})
