<template>
  <v-container>
      <v-snackbar
        v-model="snackbar"
        :timeout="timeout"
        :top="y"
        absolute
        color="error"
      >
        <span>{{msgError}}</span>
      <v-icon dark>highlight_off</v-icon>
    </v-snackbar>
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-text-field
        label="E-mail"
        v-model="email"
        :rules="emailRules"
        required
      ></v-text-field>
      <v-text-field
        name="input-10-1"
        label="Password"
        v-model="password"
        required
        :rules="passwordRules"
        :append-icon="e1 ? 'visibility' : 'visibility_off'"
        :append-icon-cb="() => (e1 = !e1)"
        :type="e1 ? 'password' : 'text'"
      ></v-text-field>
      <v-btn
        @click.native="submit"
        :disabled="!valid"
      >
        submit
      </v-btn>
      <v-btn @click="clear">clear</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      e1: false,
      valid: true,
      password: '',
      passwordRules: [
        (v) => !!v || 'Password is required'
      ],
      email: '',
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      snackbar: false,
      y: 'top',
      timeout: 3000,
      msgError: ''
    }
  },
  methods: {
    submit () {
      if (this.$refs.form.validate()) {
        // Native form submission is not yet supported
        axios.post('http://localhost:3003/signin', {
          email: this.email,
          password: this.password
        })
        .then(result => {
          console.log(result.data)
          localStorage.setItem('token', result.data.token)
          this.$router.replace('/')
        })
        .catch(err => {
          this.msgError = 'E-mail or Password Wrong !!! Please Try Again !'
          this.snackbar = true
          console.log(err)
        })
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>

