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
        v-model="from.email"
        :rules="emailRules"
        required
      ></v-text-field>
      <v-text-field
        name="input-10-1"
        label="Password"
        v-model="from.password"
        required
        :rules="passwordRules"
        :append-icon="e1 ? 'visibility' : 'visibility_off'"
        :append-icon-cb="() => (e1 = !e1)"
        :type="e1 ? 'password' : 'text'"
      ></v-text-field>
      <v-btn
        @click.native="submit(from)"
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
    /* eslint-disable no-alert, no-console */
    return {
      e1: false,
      valid: true,
      from: {
        email: '',
        password: ''
      },
      passwordRules: [
        (v) => !!v || 'Password is required'
      ],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      snackbar: false,
      y: 'top',
      timeout: 3000,
      msgError: ''
    }
    /* eslint-enable no-alert, no-console */
  },
  methods: {
    submit (data) {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('loginUser', data)
        this.$router.push('/')
      }
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>

