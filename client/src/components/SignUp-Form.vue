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
        label="Username"
        v-model="form.username"
        :rules="usernameRules"
        required
      ></v-text-field>
      <v-text-field
        label="E-mail"
        v-model="form.email"
        :rules="emailRules"
        required
      ></v-text-field>
      <v-text-field
        name="input-10-1"
        label="Password"
        v-model="form.password"
        required
        :rules="passwordRules"
        :append-icon="e1 ? 'visibility' : 'visibility_off'"
        :append-icon-cb="() => (e1 = !e1)"
        :type="e1 ? 'password' : 'text'"
      ></v-text-field>
      <v-btn
        @click.native="submit(form)"
        :disabled="!valid"
      >
        submit
      </v-btn>
      <v-btn @click="clear">clear</v-btn>
    </v-form>
  </v-container>
</template>

<script>

export default {
  data () {
    return {
      e1: false,
      valid: true,
      form: {
        password: '',
        email: '',
        username: ''
      },
      passwordRules: [
        (v) => !!v || 'Password is required'
      ],
      /* eslint-disable */
      emailRules: [
        (v) => !!v || 'E-mail is required',
        // eslint-disable-next-line 
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      /* eslint-enable */
      usernameRules: [
        (v) => !!v || 'Username is required'
      ],
      snackbar: false,
      y: 'top',
      timeout: 3000,
      msgError: ''
    }
  },
  methods: {
    submit (data) {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('registerUser', data)
        this.$router.push('/login')
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>

