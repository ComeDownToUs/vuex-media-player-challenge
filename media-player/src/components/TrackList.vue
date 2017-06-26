<template>
  <div>
    <div class="container track-list heading">
      <div class="row track heading">
        <div class="col-sm-3">
          <a class='track-sorter sort-artist' v-on:click.prevent.stop="sortTracks('artist')">
            Artist
          </a>
        </div>
        <div class="col-sm-3">
          <a class='track-sorter sort-track' v-on:click.prevent.stop="sortTracks('track')">
            Track
          </a>
        </div>
        <div class="col-sm-2 hidden-xs">
          <a  class='track-sorter sort-genre' v-on:click.prevent.stop="sortTracks('genre')">
            Genre
          </a>
        </div>
        <div class="col-sm-1">
          <a  class='track-sorter sort-duration' v-on:click.prevent.stop="sortTracks('duration')">
            Duration
          </a>
        </div>
        <div class="col-sm-1 hidden-xs">
          <a class='track-sorter sort-rating' v-on:click.prevent.stop="sortTracks('rating')">
            Rating
          </a>
        </div>
      </div>
    </div>
    <div class="container track-list">
      <div v-for="(track, index) in tracksArray" class="row track tracks">
        <div class="col-sm-3 track-artist">
          {{track.artist}}
        </div>
        <div class="col-sm-3 track-title">
          {{track.title}}
        </div>
        <div class="col-sm-2 track-genre hidden-xs">
          {{track.genre}}
        </div>
        <div class="col-sm-1 col-xs-8 track-duration">
          {{timeDisplay(track.duration)}}
        </div>
        <div class="col-sm-1 hidden-xs text-center">
          <a v-on:click.prevent.stop="rateTrack(track)"
            class="track-star">
            <span v-if="track.rating" class="glyphicon glyphicon-star"></span>
            <span v-if="!track.rating" class="glyphicon glyphicon-star-empty"></span>
          </a>
        </div>
        <div class="col-sm-2 col-xs-4 tracks-nowplaying-options text-right">
          <a href="#" v-on:click.prevent.stop="playNewTrack({tracks: tracksArray, index: index})"
            class="track-play" title="make this list the now playing queue">
            <span class="glyphicon glyphicon-play" style="margin: 0 12px;"></span>
          </a>
          <a href="#"  v-on:click.prevent.stop="addToNowPlaying(track)"
            class="track-add" title="add to now playing queue">
            <span class="glyphicon glyphicon-plus" style="margin: 0 12px;"></span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { timeMixin } from '../mixins/time';

export default {
  name: 'tracklist',
  mixins: [timeMixin],
  computed: {
    ...mapGetters({
      currentPlaying: 'getNowPlaying',
    }),
    tracksArray() {
      return Object.keys(this.tracks).map(track => this.tracks[track]);
    },
  },
  methods: {
    ...mapActions([
      'playNewTrack',
      'addToNowPlaying',
      'rateTrack',
    ]),
    onPlayTrack(trackId, tracks, index) {
      this.playTrack(trackId, tracks, index);
      this.playingTrack();
    },
    updatePosition() {
      this.currentPlaying.position = this.currentPlaying.position + 1;
    },
    /* eslint-disable */
    sortTracks(sorter) {
      this.tracksArray = this.tracksArray.sort((a, b) =>
        b[sorter] - a[sorter]
      );
    },
    filterTracks(keyword) {
      this.tracksArray = this.tracksArray.filter((track) => {
        if (track.indexOf(keyword) !== -1) {
          return track;
        }
      });
    },
    /* eslint-enable */
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  props: ['tracks'],
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.track-list{
  height: calc(100vh - 128px);
  background-color: #f6f6f6;
  padding: 0px 0px 160px ;
  overflow-y: scroll;
}

.track{
  background-color: #eee;
  padding: 8px 0px;
  margin: 4px 0px;
}
a > .track:hover{
  background-color: #e6e6e6;
}
.track-list.heading{
  padding: 0px;
  height: initial;
}
.track.heading{
  background-color: #e0e0e0;
}

@media(max-width: 767px){
  .tracks-nowplaying-options{
    padding: 0px;
  }
}
</style>
