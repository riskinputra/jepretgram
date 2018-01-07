<template>
  <v-layout row wrap id="home-timeline-list">
    <v-flex md4 xs12 v-for="item in exploreTimeline" :key="item.id">
      <v-card>
        <v-card-actions>
          <v-avatar size="36px" slot="activator">
            <img :src="item.userId.image" alt="">
          </v-avatar>
          <b>&nbsp;{{item.userId.username}}</b>
          <v-spacer></v-spacer>
          <v-btn small color="primary" dark slot="activator" @click="addFollowing(item.userId._id)">Follow<v-icon right dark style="font-size:12px;">done_all</v-icon></v-btn>
        </v-card-actions>
        <v-card-media
          :src="item.image"
          height="300px"
        >
        </v-card-media>
        <v-card-actions class="white">
          <v-btn @click="addLike(item._id)" icon>
            <v-icon color="red">favorite</v-icon>
          </v-btn>
          <p id="likes">{{item.like.length}} Likes</p>
          <v-spacer></v-spacer>
          <v-btn icon @click="comments(item._id)">
            <v-icon color="purple">comment</v-icon>
          </v-btn>
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
  data () {
    return {
      show: false
    }
  },
  created () {
    this.getExplore()
  },
  methods: {
    ...mapActions([
      'getExplore',
      'addFollowing',
      'addLike'
    ]),
    comments (postId) {
      this.$router.replace(`/comments/${postId}`)
    }
  },
  computed: {
    ...mapState([
      'exploreTimeline'
    ])
  }
}
</script>

<style scoped>

</style>
