<template>
  <v-app id="signup">
    <header-toolbar></header-toolbar>
    <v-content>
      <v-container grid-list-lg>
        <section>
          <profile-head></profile-head>
          <v-divider></v-divider>
        </section>
        <section style="margin-top:20px;">
          <profile-timeline></profile-timeline>
        </section>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Header from './Header'
import ProfileTimeline from './Profile-Timeline'
import ProfileHead from './Profile-Head'
export default {
  components: {
    'header-toolbar': Header,
    'profile-timeline': ProfileTimeline,
    'profile-head': ProfileHead
  },
  data () {
    return {
    }
  },
  created () {
    if (!localStorage.getItem('token')) {
      this.$router.replace('/login')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #keep main .container {
    height: 660px;
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
