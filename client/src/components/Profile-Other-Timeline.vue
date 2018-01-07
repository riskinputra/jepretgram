<template>
  <v-layout row wrap id="home-timeline-list">
    <v-flex md4 xs12 v-for="item in profileTimelineOther" :key="item.id">
      <v-card>
        <v-card-media
          :src="item.image"
          height="300px"
        >
        </v-card-media>
        <v-card-actions class="white">
          <v-btn icon @click="addLike(item._id)">
            <v-icon color="red">favorite</v-icon>
          </v-btn>
          <p id="likes">{{item.like.length}} Likes</p>
          <v-spacer></v-spacer>
          
          <v-btn slot="activator" icon @click="comments(item._id)"><v-icon color="purple" dark >comment</v-icon></v-btn>
        </v-card-actions>
        <v-divider></v-divider>
        <v-card-text>
          <p style="white-space: pre-wrap;"><b>{{item.userId.username}}&nbsp;</b> {{item.caption}}</p>
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
    let userId = this.$route.params.userId
    this.getProfileTimelineOther(userId)
    // console.log(this.profileTimeline[0]._id)
  },
  methods: {
    ...mapActions([
      'getProfileTimelineOther',
      'deletePost',
      'addLike'
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
      'profileTimelineOther'
    ])
  }
}
</script>

<style scoped>

</style>
