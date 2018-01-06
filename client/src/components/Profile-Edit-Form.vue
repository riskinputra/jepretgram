<template>
  <v-card flat>
    <v-snackbar
      v-model="snackbar"
      absolute
      multi-line
      color="blue"
    >
      <span>Add Post Successful!</span>
      <v-icon dark>done_all</v-icon>
    </v-snackbar>
    <v-form @submit.prevent="editProfile(form)" ref="form">
      <v-container grid-list-xl fluid>
        <v-layout wrap>
          <v-flex xs12>
            <VueImgInputer 
            v-model="form.image"
            :rules="rules.image"
            :imgSrc="profileAccount.image"
            theme="light" style="width:100%; height:200px;"
            placeholder="Upload Image"
            bottomText="This Your Image">
            </VueImgInputer>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              color="blue darken-2"
              label="Username"
              required
              v-model="form.username"
              :rules="rules.username"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              color="blue darken-2"
              label="Email"
              required
              :value="profileAccount.email"
              v-model="form.email"
              :rules="rules.emailRules"
            ></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              color="blue darken-2"
              label="Password"
              required
              v-model="form.password"
              :rules="rules.password"
              :append-icon="e1 ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (e1 = !e1)"
              :type="e1 ? 'password' : 'text'"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
      <v-card-actions>
        <v-btn flat @click="resetForm">Cancel</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          flat
          color="primary"
          type="submit"
          :disabled="!formIsValid"
        >Submit</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
  
</template>


<script>
  import VueImgInputer from 'vue-img-inputer'
  import { mapActions, mapState } from 'vuex'

  export default {
    components: {
      VueImgInputer
    },
    data () {
      const defaultForm = Object.freeze({
        username: '',
        image: '',
        email: '',
        password: ''
      })

      return {
        form: Object.assign({}, defaultForm),
        rules: {
          username: [val => (val || '').length > 0 || 'This field is required'],
          password: [val => (val || '').length > 0 || 'This field is required'],
          emailRules: [ 
            (v) => !!v || 'E-mail is required',
            (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid' 
          ],
          image: [val => (val || '').length > 0 || 'This field is required']
        },
        snackbar: false,
        e1: false,
        userId: '',
        defaultForm
      }
    },
    created () {
      if (localStorage.getItem('token')) {
        this.getProfileAccount()
        console.log(this.profileAccount)
        this.form.username = this.profileAccount.username
        this.form.email = this.profileAccount.email
        this.form.password = this.profileAccount.password
      }
    },
    computed: {
      formIsValid () {
        return (
          this.form.username &&
          this.form.email &&
          this.form.password &&
          this.form.image
        )
      },
      ...mapState([
        'profileAccount'
      ])
    },
    methods: {
      resetForm () {
        this.form = Object.assign({}, this.defaultForm)
        this.$refs.form.reset()
      },
      ...mapActions([
        'editProfile',
        'getProfileAccount'
      ])
    }
  }
</script>

<style scoped>
  #map{
    width: 100%; 
    height: 300px
  }
</style>