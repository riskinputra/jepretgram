<template>
  <v-layout row wrap id="profile-account">
    <v-flex md4 xs12 text-xs-center>
      <v-avatar size="136px" slot="activator">
        <img :src="profileAccount.image" alt="">
      </v-avatar>
    </v-flex>
    <v-flex md8 xs12>
      <v-card>
        <v-card-text>
          <h1>{{profileAccount.username}}</h1>
        </v-card-text>
        <v-card-text>
          <div id="post">
            <h3><b>{{profileTimeline.length}}</b> posts</h3>
          </div>
          <div>
            <h3 id="followers"><b>{{followers.length}}</b> followers</h3>
          </div>
          <div>
            <h3 id="following"><b>{{following.length}}</b> following</h3>
          </div>
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
    this.getProfileAccount()
    this.getProfileTimeline()
    this.getFollowing()
    this.getFollowers()
  },
  methods: {
    ...mapActions([
      'getProfileAccount',
      'getProfileTimeline',
      'getFollowing',
      'getFollowers'
    ])
  },
  computed: {
    ...mapState([
      'profileAccount', 
      'profileTimeline',
      'followers',
      'following'
    ])
  }
}
</script>

<style scoped>
  h1 {
    font-size: 30px;
  }
  #post,#followers {
    float: left;
    margin-right: 40px;
  }
  #post #post-count {
    float: left;
  }
</style>
