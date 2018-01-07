<template>
  <v-layout row wrap id="home-timeline-list">
    <v-flex md4 xs12 v-for="item in profileTimeline" :key="item.id">
      <v-card>
        <v-card-media
          :src="item.image"
          height="300px"
        >
        </v-card-media>
        <v-card-actions class="white">
          <v-btn icon>
            <v-icon color="red">favorite</v-icon>
          </v-btn>
          <p id="likes">{{item.like.length}} Likes</p>
          <v-spacer></v-spacer>
          
          <v-btn slot="activator" icon @click="comments(item._id)"><v-icon color="purple" dark >comment</v-icon></v-btn>
          <v-btn icon @click.native.stop="dialog = true">
            <v-icon color="orange">delete_forever</v-icon>
          </v-btn>
          <v-dialog v-model="dialog" max-width="290">
            <v-card>
              <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="green darken-1" flat="flat" @click.native="dialog = false">Disagree</v-btn>
                <v-btn color="green darken-1" flat="flat" @click="deletePost(item._id)">Agree</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card-actions>
        <v-divider></v-divider>
        <v-card-text>
           <b>{{item.userId.username}}&nbsp;</b>
            {{item.caption}}
          </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    
  },
  data () {
    const defaultForm = Object.freeze({
      text: '',
      postId: ''
    })
    return {
      form: Object.assign({}, defaultForm),
      rules: {
        text: [val => (val || '').length > 0 || 'This field is required']
      },
      show: false,
      dialog: false,
      // comment: false,
      defaultForm
    }
  },
  created () {
    this.getProfileTimeline()
    this.getComments()
    // console.log(this.profileTimeline[0]._id)
  },
  methods: {
    ...mapActions([
      'getProfileTimeline',
      'getComments',
      'deletePost',
      'addComment'
    ]),
    resetForm () {
      this.form = Object.assign({}, this.defaultForm)
      this.$refs.form.reset()
    },
    comments (postId) {
      this.$router.replace(`/comments/${postId}`)
    }
  },
  computed: {
    formIsValid () {
      return (
        this.form.text
      )
    },
    ...mapState([
      'profileTimeline',
      'comment'
    ])
  }
}
</script>

<style scoped>

</style>
