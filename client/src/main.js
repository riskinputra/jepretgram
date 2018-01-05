// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './vuex/store'
import Vuetify from 'vuetify'
import * as VueGoogleMaps from 'vue2-google-maps'
import('vuetify/dist/vuetify.min.css')

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAFZ44PGwSAWU9RAu7xpuToJHJjIPhl8Is',
    libraries: 'places'
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  template: '<App/>',
  components: { App }
})
