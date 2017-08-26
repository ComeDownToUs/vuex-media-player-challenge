<template>
  <div class="small-player">
    <div class="container">
    <div class="row nowplaying-active" v-if="nowPlaying.currentTracks.length > 0" >
      <vue-slider
        ref="slider"
        :max="tracks[playIndex].duration"
        :value="0"
        :tooltip="'hover'"
        :clickable="true"
        :real-time="true"
        :speed="1"
        v-model="timePlace">
      </vue-slider>
      <div
        class="col-xs-2 col-sm-1 album-art vcentered-by-padding"
        v-bind:style="`background-image: url(` +
          nowPlaying.currentTracks[nowPlaying.currentIndex].artwork_url +
          `);`
        ">
      </div>
      <div class="col-sm-4 col-md-4 col-xs-7 player-details">
        {{nowPlaying.currentTracks[nowPlaying.currentIndex].artist}} <br/>
        {{nowPlaying.currentTracks[nowPlaying.currentIndex].title}}  <br/>
        {{nowPlaying.currentTracks[nowPlaying.currentIndex].genre}}
      </div>
      <div class="col-sm-2 col-xs-3 col-md-1 vcentered-by-padding text-right player-duration">
        {{timeDisplay(timePlace)}} /
        {{timeDisplay(nowPlaying.currentTracks[nowPlaying.currentIndex].duration)}}<br/>
        {{nowPlaying.currentIndex + 1}} of {{nowPlaying.currentTracks.length}}
      </div>
      <div class="col-md-offset-1 col-sm-5 col-md-5 col-lg-3 col-xs-12 text-center">
        <div class="player-controls row">
          <div class='col-md-1 hidden-sm hidden-xs'>
            <button v-on:click.prevent.stop="saveNowPlaying(nowPlaying)"
              :class="((nowPlaying.saved) ? 'disabled':'enabled') + 'player-save'"
              :disabled="((nowPlaying.saved) ? 'disabled':null)"
              >
              <span
                :class="`modifier-button glyphicon glyphicon-floppy-`+
                ((nowPlaying.saved) ? 'saved':'disk')">
              </span>
            </button>
          </div>
          <div class="col-xs-2 col-md-1">
            <button v-on:click.prevent.stop="toggleRepeat(!nowPlaying.repeat)"
              :class="((nowPlaying.repeat === true) ? 'toggle-active ': '') + 'player-repeat'">
              <span class="modifier-button glyphicon glyphicon-repeat"></span>
            </button>
          </div>
          <div class="col-xs-2">
            <button v-on:click.prevent.stop="changeTrack(-1)"
              class="player-back pull-right">
              <span class="control-button glyphicon glyphicon-fast-backward"></span>
            </button>
          </div>
          <div class="col-xs-4 col-sm-3">
            <button v-on:click.prevent.stop="togglePlay(!nowPlaying.isPlaying)"
              class="player-play">
              <span
                :class="`play-button glyphicon glyphicon-` +
                  ((nowPlaying.isPlaying === true) ? 'pause': 'play-circle')">
              </span>
            </button>
          </div>
          <div class="col-xs-2">
            <button v-on:click.prevent.stop="changeTrack(1)"
              class="player-forward pull-left">
              <span class="control-button glyphicon glyphicon-fast-forward"></span>
            </button>
          </div>
          <div class="col-xs-2">
            <button v-on:click.prevent.stop="toggleMute(!nowPlaying.mute)"
              class="player-mute">
              <span
                :class="`modifier-button glyphicon glyphicon-volume-`+((nowPlaying.mute === true) ? 'off': 'up')">
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row no-tracks" v-else>
      <div
        class="hidden-xs col-sm-1 album-art vcentered-by-padding"
        style="background-color: red;">
      </div>
      <div class="col-sm-5 text-right">
        <span style="font-size: 32px">Media Player</span><br>
        No tracks selected
      </div>
      <div class="col-sm-6 player-details" style="font-size: 12px;">
        <span class="glyphicon glyphicon-play"></span> set the listed tracks as your queue, selecting index<br/>
        <span class="glyphicon glyphicon-plus"></span> will add that track to the current playlist <br/>
        <span class="glyphicon glyphicon-star-empty"></span> will add the track to your favourites <br/>
        Then click <span class="glyphicon glyphicon-play-circle"></span> on media player to begin listening
      </div>
    </div>

    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import vueSlider from 'vue-slider-component';
import { timeMixin } from '../mixins/time';

export default {
  name: 'SmallPlayer',
  mixins: [timeMixin],
  components: {
    vueSlider,
  },
  computed: mapGetters({
    nowPlaying: 'getNowPlaying',
    tracks: 'getCurrentTracks',
    playIndex: 'getCurrentPlayIndex',
  }),
  methods: {
    ...mapActions([
      'togglePlay',
      'changeTrack',
      'changePlayStatus',
      'toggleMute',
      'toggleRepeat',
      'saveNowPlaying',
    ]),
    updatePlaytime() {
      if (this.nowPlaying.playStatus === 'newTrack') {
        this.timePlace = 0;
        this.changePlayStatus('playing');
      }
      if (this.nowPlaying.isPlaying) {
        const newTime = this.timePlace + this.nowPlaying.playSpeed;
        if (newTime < 0) {
          alert('rewind functionality not fully figure out yet');
          this.timePlace = 0;
          this.togglePlay();
        } else if (newTime > this.tracks[this.playIndex].duration) {
          this.timePlace = 0;
          if (!this.nowPlaying.repeat) {
            if ((this.playIndex + 1) < this.tracks.length) {
              this.changeTrack();
            } else {
              this.togglePlay();
            }
          }
        } else if (newTime <= this.tracks[this.playIndex].duration) {
          console.log('playing regularly');
          this.timePlace = newTime;
        }
      }
    },
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      timePlace: 0,
    };
  },
  mounted() {
    setInterval(this.updatePlaytime, 1000);
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

button{
  background: none;
  border: none;
}

.small-player{
  position: fixed;
  bottom: 0;
  width: 100%;
}

[class*="col-"] {
  color: #fff;
  height: 64px;
}
.vcentered-by-padding{
  padding: 16px 0px;
}
.row{
  background-color: #555;
  padding: 0px 16px;
}

.album-art{
  background-size: contain;
  background-repeat: no-repeat;
  padding: 28px 0px;
  background-position: right;
}

.player-controls{
  text-align: center;
}


.player-controls [class*="col-"] {
  padding: 0px;
  text-align: center;
}
.control-button{
  font-size: 24px;
  padding: 18px 0px;
}
.play-button{
  font-size: 48px;
  padding: 6px 0px;
}

button.toggle-active{
  color: #88FF88;

}
button:focus{
  outline: none;
}

.modifier-button{
  font-size: 20px;
  padding: 20px 0px;
}
.no-tracks{
  height: 128px;
}
@media (min-width: 768px){
  .pull-right-sm{
    float: right;
  }
  .no-tracks{
    height: 64px;
  }
}
</style>
