<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Dosis', sans-serif;
  /* font-family: 'Quicksand', sans-serif; */
  /* font-family: 'Pattaya', sans-serif; */
}
#app h1,h2,h3,h4,h5,h6,p,a {
  font-weight: normal;
}
</style>
