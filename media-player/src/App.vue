<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view></router-view>
    <small-player></small-player>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar';
import SmallPlayer from '@/components/SmallPlayer';

export default {
  name: 'app',
  components: {
    NavBar,
    SmallPlayer,
  },
  created() {
    this.$store.dispatch('fetchPlaylists');
    this.$store.dispatch('fetchTracks');
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
