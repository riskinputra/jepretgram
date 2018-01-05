<template>
  <v-app id="signup">
    <v-content>
      <v-container grid-list-md>
        <section class="text-xs-center">
          <span id="logo"><img src="../../static/logo.png" alt="logo"></span>
          <h1 id="title-signup">Jepretgram</h1>
          <v-layout row wrap>
            <v-flex xs10 md4 offset-xs1 offset-md4>
              <v-card light color="white" flat tile>
                <v-card-text>
                  <signup-from></signup-from>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text>
                  Have an account? <router-link to="login">Log in</router-link>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </section>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import SignUpForm from './SignUp-Form'

export default {
  components: {
    'signup-from': SignUpForm
  },
  created () {
    if (localStorage.getItem('token')) {
      this.$router.replace('/')
    }
  }
}
</script>


<style scoped>
  #signup {
    padding-top: 50px;
    background: #3a6186;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #89253e, #3a6186);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #89253e, #3a6186); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  h1#title-signup {
    font-size: 50px;
  }
  #title-signup {
    font-family: 'Pattaya', sans-serif;
    color: white;
  }
  a {
    text-decoration: none;
  }
</style>

