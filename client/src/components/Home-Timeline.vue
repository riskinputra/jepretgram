<template>
  <v-layout row wrap id="home-timeline-list">
    <v-flex xs12 text-xs-center v-if="homeTimeline.length === 0">
      <v-card>
        <v-card-text>
          <h1 color="blue">No Users You Follow, Please Following One !</h1>
          <router-link to="explore">
            <v-btn small color="warning" dark>Click Here..<v-icon right dark style="font-size:14px;">warning</v-icon></v-btn>
          </router-link>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-flex md4 xs12 v-else v-for="item in homeTimeline" :key="item.id">
      <v-card>
        <v-card-actions>
          <v-avatar size="36px" slot="activator">
            <img :src="item.userId.image" alt="">
          </v-avatar>
          <v-btn small @click="profileOther(item.userId._id)">
            &nbsp;{{item.userId.username}}
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn small color="warning" dark slot="activator" @click="unfollowing(item.userId._id)">UnFollow<v-icon right dark style="font-size:12px;">content_cut</v-icon></v-btn>
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
    this.getHomeTimeline()
    console.log('timeline', this.homeTimeline)
  },
  methods: {
    ...mapActions([
      'getHomeTimeline',
      'addLike',
      'unfollowing'
    ]),
    comments (postId) {
      this.$router.replace(`/comments/${postId}`)
    },
    profileOther (userId) {
      this.$router.replace(`/profile-other/${userId}`)
    }
  },
  computed: {
    ...mapState([
      'homeTimeline',
      'comment'
    ])
  }
}
</script>

<style scoped>
  a {
    text-decoration: none;
  }
</style>
