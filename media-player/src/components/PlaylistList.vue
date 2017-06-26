<template>
  <div class="container playlist-list">
    <div class="row playlist heading">
      <div class="col-sm-6 col-xs-6 playlist-list-title">Playlist</div>
      <div class="col-xs-2 playlist-list-tracks">#Tracks</div>
    </div>
    <div v-for="(value, key) in playlists" class="row playlist">
      <div class="col-sm-6 col-xs-8 playlist-name">{{value.name}}</div>
      <div class="col-xs-2 playlist-count">{{value.tracks.length}}</div>
      <div class="col-xs-2 pull-right text-right">
        <router-link
        v-bind:to="{name: 'Playlist', params: {id: key}}"
        class="playlist-link"
        >
          View
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PlaylistList',
  computed: mapGetters({
    playlists: 'getAllPlaylists',
  }),
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row{
  margin: 0px;
}
.playlist-list{
  height: calc(100vh - 80px);
  background-color: #f6f6f6;
  padding: 0px 0px 160px ;
  overflow-y: scroll;
}
.playlist-list.heading{
  padding: 0px;
  height: initial;
}
.playlist{
  background-color: #eee;
  padding: 8px 0px;
  margin: 4px 0px;
}
.playlist.heading{
  background-color: #e0e0e0;
}
</style>
