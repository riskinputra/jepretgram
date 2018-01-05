<template>
  <v-app id="login">
    <v-content>
      <v-container>
        <section class="text-xs-center">
          <span id="logo"><img src="../../static/logo.png" alt="logo"></span>
          <h1 id="title-login">Jepretgram</h1>
          <v-layout row wrap>
            <v-flex xs10 md4 offset-xs1 offset-md4>
              <v-card light color="white">
                <v-card-text>
                  <login-from></login-from>
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
import LoginForm from './Login-Form'

export default {
  components: {
    'login-from': LoginForm
  }  
}
</script>


<style scoped>
  #login {
    padding-top: 70px;
    background: #3a6186;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #89253e, #3a6186);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #89253e, #3a6186); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  h1#title-login {
    font-size: 50px;
  }
  #title-login {
    font-family: 'Pattaya', sans-serif;
    color: white;
  }
</style>

