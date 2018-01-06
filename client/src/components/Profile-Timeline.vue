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
          <v-btn icon>
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
    this.getProfileTimeline()
  },
  methods: {
    ...mapActions([
      'getProfileTimeline'
    ])
  },
  computed: {
    ...mapState([
      'profileTimeline'
    ])
  }
}
</script>

<style scoped>

</style>
