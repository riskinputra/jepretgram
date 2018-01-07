<template>
  <v-toolbar id="toolbar" fixed color='white toolbar' light app absolute clipped-left>

    <router-link to="Home">
      <v-btn icon>
        <v-icon color="indigo">home</v-icon>
      </v-btn>
    </router-link>
    <v-toolbar-title class="text">Jepretgram</v-toolbar-title>
    <v-spacer></v-spacer>
    <router-link to="explore">
      <v-btn icon>
        <v-icon color="cyan">public</v-icon>
      </v-btn>
    </router-link>
    <!-- <v-btn icon>
      <v-icon color="green">notifications</v-icon>
    </v-btn> -->
    <router-link to="profile">
      <v-btn icon>
        <v-icon color="pink">face</v-icon>
      </v-btn>
    </router-link>
    <header-post></header-post> 
  </v-toolbar>
</template>

<script>
import HeaderPost from './Header-Post'
export default {
  components: {
    'header-post': HeaderPost
  },
  data () {
    return {}
  },
  methods: {
    // explore () {
    //   console.log('masuk')
    //   this.$router.replace('/explore')
    // }
  }
}
</script>

<style scoped>
  .text {
    font-family: 'Pattaya', sans-serif;
  }
  a {
    text-decoration: none;
  }
  a:hover {
    color: rgb(14, 14, 14)
  }
  a,a:visited {
    color: black;
  }
  /* Visibility */
  /* Desktop and bigger */
  @media (min-width: 960px) {
    #toolbar{
      padding: 0 55px !important;
    }
  }
  /* Tablets portrait */
  @media (min-width: 768px) and (max-width: 959px) {

  }
  /* Phone landscape and smaller*/
  @media (max-width: 767px) {
    #toolbar {
      padding: 0;
    }
  }
</style>
