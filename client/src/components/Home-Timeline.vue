<template>
  <v-layout row wrap id="home-timeline-list">
    <v-flex md4 xs12 v-for="n in 6" :key="n">
      <v-card>
        <v-card-media
          src="https://spectrum.ieee.org/image/Mjc1NzQ0NQ.jpeg"
          height="300px"
        >
        </v-card-media>
        <v-card-actions class="white">
          <v-btn icon>
            <v-icon color="red">favorite</v-icon>
          </v-btn>
          <p id="likes">29 Likes</p>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon color="purple">comment</v-icon>
          </v-btn>
        </v-card-actions>
        <v-divider></v-divider>
        <v-card-text>
           <b>Caption ..</b>
            I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
          </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  }
}
</script>

<style scoped>

</style>
