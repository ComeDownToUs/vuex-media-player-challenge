import * as actions from './actions';
import * as getters from './getters';

import {
  FETCH_TRACKS,
  RATE_TRACK,

  FETCH_PLAYLISTS,
  CREATE_PLAYLIST,
  UPDATE_PLAYLIST,
  DELETE_PLAYLIST,

  ADD_TO_NOW_PLAYING,
  BUILD_NOW_PLAYING,

  PLAY_NEW_TRACK,
  CHANGE_PLAY_STATUS,
  CHANGE_TRACK,
  TOGGLE_PLAY,
  TOGGLE_MUTE,
  TOGGLE_REPEAT,

  ACTION_ERROR,
} from './mutations';

const initialState = {
  playlists: [],
  tracks: [],
  nowPlaying: {
    currentTracks: [],
    currentIndex: 0,
    playSpeed: 1,
    isPlaying: false,
    isLoading: false,
    mute: false,
    repeat: false,
    saved: false,
    playStatus: 'newTrack',
  },
  error: '',
  isFetching: false,
};


/* eslint-disable no-param-reassign */

const mutations = {
  [FETCH_TRACKS](state, tracks) {
    state.tracks = tracks;
  },
  [RATE_TRACK](state, track) {
    if (state.tracks[track.data.id]) {
      state.tracks[track.data.id] = track.data;
    }
  },

  [FETCH_PLAYLISTS](state, playlists) {
    state.playlists = playlists;
  },
  [CREATE_PLAYLIST](state, playlist) {
    state.playlists[playlist.id] = playlist;
    state.nowPlaying.saved = true;
  },
  [UPDATE_PLAYLIST](state, playlist) {
    const index = state.playlists.findIndex(p => p.id === playlist.id);
    if (index !== -1) {
      state.playlists.splice(index, 1, playlist);
    }
  },
  [DELETE_PLAYLIST](state, playlistId) {
    state.playlists = state.playlists.filter(p => p.id !== playlistId);
  },

  [ADD_TO_NOW_PLAYING](state, track) {
    state.nowPlaying.saved = false;
    state.nowPlaying.currentTracks.push(track);
  },
  [BUILD_NOW_PLAYING](state, tracks) {
    state.nowPlaying.tracks = tracks;
  },

  [PLAY_NEW_TRACK](state, tracklist) {
    state.nowPlaying.currentTracks = tracklist.tracks;
    state.nowPlaying.currentIndex = tracklist.index;
    state.nowPlaying.position = 0;
    state.nowPlaying.isPlaying = false;
    state.nowPlaying.playStatus = 'newTrack';
  },
  [CHANGE_PLAY_STATUS](state, status) {
    state.nowPlaying.playStatus = status;
  },
  [CHANGE_TRACK](state, change) {
    if (change === 1) {
      if (state.nowPlaying.currentIndex === state.nowPlaying.currentTracks.length - 1) {
        state.nowPlaying.currentIndex = 0;
      } else {
        state.nowPlaying.currentIndex += 1;
      }
    } else if (change === -1) {
      if (state.nowPlaying.currentIndex === 0) {
        state.nowPlaying.currentIndex = (state.nowPlaying.currentTracks.length - 1);
      } else {
        state.nowPlaying.currentIndex -= 1;
      }
    }
    state.nowPlaying.position = 0;
  },
  [TOGGLE_PLAY](state, playStatus) {
    state.nowPlaying.isPlaying = playStatus;
  },
  [TOGGLE_MUTE](state, muteStatus) {
    state.nowPlaying.mute = muteStatus;
  },
  [TOGGLE_REPEAT](state, repeatStatus) {
    state.nowPlaying.repeat = repeatStatus;
  },

  [ACTION_ERROR](state, message) {
    state.error = message;
  },
};

/* eslint-enable no-param-reassign */

export default {
  state: { ...initialState },
  actions,
  getters,
  mutations,
};
