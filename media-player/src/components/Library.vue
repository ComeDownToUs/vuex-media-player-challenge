<template>
  <div class="library">
    <div class="container">
      <div class="row">
        <div class="library-title col-sm-4">Library</div>
        <div class="col-sm-6 pull-right text-right">
          <form>
            <select>
              <option>Artist</option>
              <option>Track</option>
            </select>
            <input type="text" placeholder="this ain't working yet" disabled/>
            <button>Search</button>
          </form>
        </div>
      </div>
    </div>
    <track-list :tracks="tracks"></track-list>

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import TrackList from './TrackList';
import PlaylistList from './PlaylistList';

export default {
  name: 'Library',
  components: {
    TrackList,
    PlaylistList,
  },
  computed: mapGetters({
    tracks: 'getAllTracks',
    playlists: 'getAllPlaylists',
  }),
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
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
