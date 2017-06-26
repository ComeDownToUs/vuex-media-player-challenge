<template>
  <div class="playlists">
    <div class="text-center">
      Playlist: {{playlists[$route.params.id].name}}
    </div>
    <track-list :tracks="playlistTracks"></track-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TrackList from './TrackList';

export default {
  name: 'Library',
  components: {
    TrackList,
  },
  computed: {
    ...mapGetters({
      tracks: 'getAllTracks',
      playlists: 'getAllPlaylists',
    }),
    /* eslint-disable */
    playlistTracks() {
      if (this.playlists[this.$route.params.id]) {
        return this.playlists[this.$route.params.id].tracks.map((track) => {
          return this.tracks[track];
        });
      }
    },
    /* eslint-enable */
  },
  route: {
    canReuse: false,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
