<template>
  <v-layout row wrap id="home-timeline-list">
    <v-flex md4 xs12 v-for="item in profileTimeline" :key="item.id">
      <v-avatar size="136px" slot="activator">
        <img :src="item.userId.image" alt="">
      </v-avatar>
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
