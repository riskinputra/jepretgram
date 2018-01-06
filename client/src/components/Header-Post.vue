<template>
  <v-dialog v-model="dialog" persistent max-width="500px">
    <v-btn icon slot="activator">
      <v-icon color="orange">add_circle</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">Add Post</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-snackbar
                v-model="snackbar"
                :timeout="timeout"
                :top="y"
                absolute
                color="blue"
              >
                <span>Success Add Post</span>
                <v-icon dark>done_all</v-icon>
              </v-snackbar>
              <header-post-form></header-post-form>
            </v-flex>
          </v-layout>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" dark @click.native="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import HeaderPostForm from './Header-Post-Form.vue'

  export default {
    components: {
      'header-post-form': HeaderPostForm
    },
    data () {
      return {
        valid: true,
        formUser: {
          password: '',
          username: '',
          email: ''
        },
        passwordRules: [
          (v) => !!v || 'Password is required'
        ],
        usernameRules: [
          (v) => !!v || 'Username is required',
          (v) => v && v.length <= 20 || 'Username must be less than 10 characters'
        ],
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        dialog: false
      }
    }
  }
</script>