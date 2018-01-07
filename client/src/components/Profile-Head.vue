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
          <h1>{{profileAccount.username}} 
          <small>
            <v-dialog v-model="dialog" persistent max-width="500px">
              <v-btn small color="primary" dark slot="activator">Edit Profile<v-icon right dark style="font-size:12px;">settings</v-icon></v-btn>
              <v-card>
                <v-card-title>
                  <span class="headline">Add Post</span>
                </v-card-title>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12>
                        <profile-edit-form></profile-edit-form>
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
          </small>
            <small>
              <v-btn
              small
              @click="logout()"
              color="blue-grey"
              class="white--text"
              >
              Logout
              <v-icon right dark style="font-size:12px;">lock</v-icon>
            </v-btn>
          </small>
          </h1>
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
    ]),
    logout () {
      localStorage.clear()
      location.reload()
    }
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
  small {
    font-size: 13px;
  }
</style>
