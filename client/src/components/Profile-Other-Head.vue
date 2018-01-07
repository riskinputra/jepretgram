<template>
  <v-layout row wrap id="profile-account">
    <v-flex md4 xs12 text-xs-center>
      <v-avatar size="136px" slot="activator">
        <img :src="profileAccountOther.image" alt="">
      </v-avatar>
    </v-flex>
    <v-flex md8 xs12>
      <v-card>
        <v-card-text>
          <h1>
            {{profileAccountOther.username}} 
          </h1>
        </v-card-text>
        <v-card-text>
          <div id="post">
            <h3><b>{{profileTimelineOther.length}}</b> posts</h3>
          </div>
          <div>
            <h3 id="followers"><b>{{followersOther.length}}</b> followers</h3>
          </div>
          <div>
            <h3 id="following"><b>{{followingOther.length}}</b> following</h3>
          </div>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ProfileEditForm from './Profile-Edit-Form'

export default {
  components: {
    'profile-edit-form': ProfileEditForm
  },
  data () {
    return {
      show: false,
      dialog: false
    }
  },
  created () {
    let userId = this.$route.params.userId
    console.log()
    this.getProfileAccountOther(userId)
    this.getProfileTimelineOther(userId)
    this.getFollowingOther(userId)
    this.getFollowersOther(userId)
  },
  methods: {
    ...mapActions([
      'getProfileAccountOther',
      'getProfileTimelineOther',
      'getFollowingOther',
      'getFollowersOther'
    ]),
    logout () {
      localStorage.clear()
      location.reload()
    }
  },
  computed: {
    ...mapState([
      'profileAccountOther',
      'profileTimelineOther',
      'followersOther',
      'followingOther'
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
  small {
    font-size: 13px;
  }
</style>
