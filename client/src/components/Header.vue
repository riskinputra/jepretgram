<template>
  <v-toolbar id="toolbar" fixed color='white toolbar' light app absolute clipped-left>
    <v-btn icon>
      <router-link to="Home"><v-icon color="indigo">home</v-icon></router-link>
    </v-btn>
    <v-toolbar-title class="text">Jepretgram</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon>
      <router-link to="explore"><v-icon color="cyan">public</v-icon></router-link>
    </v-btn>
    <v-btn icon>
      <v-icon color="green">notifications</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon color="pink">face</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  data () {
    return {}
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
  }
</style>
