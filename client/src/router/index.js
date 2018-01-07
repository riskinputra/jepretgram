import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Explore from '@/components/Explore'
import Profile from '@/components/Profile'
import Comments from '@/components/Comments'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/explore',
      name: 'Explore',
      component: Explore
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/comments/:id',
      name: 'Comments',
      component: Comments
    }
  ]
})
