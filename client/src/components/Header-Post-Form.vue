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
    <v-form @submit.prevent="addPost(form)" ref="form">
      <v-container grid-list-xl fluid>
        <v-layout wrap>
          <v-flex xs12>
            <VueImgInputer 
            v-model="form.image"
            :rules="rules.address" 
            theme="light" style="width:100%; height:200px;"
            placeholder="Upload Image"
            bottomText="This Your Image">
            </VueImgInputer>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              color="blue darken-2"
              required
              multi-line
              v-model="form.description"
              :rules="rules.description"
            >
              <div slot="label">
                Description*
              </div>
            </v-text-field>
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
  import { mapActions } from 'vuex'

  export default {
    components: {
      VueImgInputer
    },
    data () {
      const defaultForm = Object.freeze({
        description: '',
        image: ''
      })

      return {
        form: Object.assign({}, defaultForm),
        rules: {
          description: [val => (val || '').length > 0 || 'This field is required'],
          image: [val => (val || '').length > 0 || 'This field is required']
        },
        snackbar: false,
        userId: '',
        defaultForm
      }
    },
    created () {
      if (localStorage.getItem('token')) {
        // let token = localStorage.getItem('token')
        // let decode = jwt_decode(token)
        // this.userId = decode.id
      }
    },
    computed: {
      formIsValid () {
        return (
          this.form.description &&
          this.form.image
        )
      }
    },
    methods: {
      resetForm () {
        this.form = Object.assign({}, this.defaultForm)
        this.$refs.form.reset()
      },
      ...mapActions([
        'addPost'
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