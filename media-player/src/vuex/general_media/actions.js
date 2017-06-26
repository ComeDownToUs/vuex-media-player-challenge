import axios from 'axios';
import uuid from 'uuid';

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
  CHANGE_TRACK,
  TOGGLE_PLAY,
  TOGGLE_REPEAT,
  TOGGLE_MUTE,
  UPDATE_PLAYTIME,

  ACTION_ERROR,
} from './mutations';

const API_URL = 'http://localhost:3000'; // <<TODO>>remove hardcoded url

// utility functions
export function expandPlaylistFromIds(tracks, playlist) {
  const expandedPlaylist = [];
  Object.values(playlist).forEach((value) => {
    if (tracks[value]) {
      expandedPlaylist.push(tracks[value]);
    }
  });
  return expandedPlaylist;
}

// Track API actions
export function fetchTracks({ commit }) {
  axios.get((`${API_URL}/tracks`))
    .then((response) => {
      commit(FETCH_TRACKS, response.data.data);
    }, (err) => {
      commit(ACTION_ERROR, err);
    });
}
export function rateTrack({ commit }, track) {
  // eslint-disable-next-line no-param-reassign
  const updatedTrack = {
    ...track,
    rating: !track.rating,
  };
  axios.put(`${API_URL}/tracks/${track.id}`, updatedTrack)
    .then((response) => {
      commit(RATE_TRACK, response.data);
    }, (err) => {
      commit(ACTION_ERROR, err);
    });
}

// Playlist API actions
export function fetchPlaylists({ commit }) {
  axios.get((`${API_URL}/playlists`))
    .then((response) => {
      commit(FETCH_PLAYLISTS, response.data.data);
    }, (err) => {
      commit(FETCH_PLAYLISTS, err);
      // console.log(err);
    });
}
export function savePlaylist({ commit, state }, playlist) {
  const index = state.playlists.findIndex(p => p.id === playlist.id);

  if (index !== -1) {
    axios.put((`${API_URL}/playlists/${playlist.id}`), playlist)
      .then(() => {
        commit(UPDATE_PLAYLIST, playlist);
      }, (err) => {
        commit(ACTION_ERROR, err);
      });
  } else {
    // eslint-disable-next-line no-param-reassign
    playlist.id = uuid.v4();
    axios.post((`${API_URL}/playlists`), playlist)
      .then(() => {
        commit(CREATE_PLAYLIST, playlist);
      }, (err) => {
        commit(ACTION_ERROR, err.title);
      });
  }
}
export function saveNowPlaying({ commit, state }, nowPlaying) {
  const nowPlaylist = {
    name: `TEMP+${Date().toString()}`,
    description: 'a temporary playlist',
    tracks: nowPlaying.currentTracks.map(track => track.id),
    id: uuid.v4(),
  };
  axios.post((`${API_URL}/playlists`), nowPlaylist)
    .then(() => {
      commit(CREATE_PLAYLIST, nowPlaylist);
    }, (err) => {
      commit(ACTION_ERROR, err);
    });
}
export function deletePlaylist({ commit }, playlistId) {
  axios.delete((`${API_URL}/playlists/${playlistId}`))
    .then(() => {
      commit(DELETE_PLAYLIST, playlistId);
    }, (err) => {
      commit(ACTION_ERROR, err);
    });
}

// Viewer Processes
export function buildNowPlaying({ commit, state }, playlist, index) {
  const nowPlaying = {
    tracks: expandPlaylistFromIds(state.tracks, playlist),
    currently: index,
    position: 0,
  };
  commit(BUILD_NOW_PLAYING, nowPlaying);
}
export function addToNowPlaying({ commit, state }, track) {
  if (state.tracks[track.id]) {
    commit(ADD_TO_NOW_PLAYING, track);
  } else {
    commit(ACTION_ERROR, 'No such track to add');
  }
}

// Playback Actions
export function playNewTrack({ commit, state }, newTrackList) {
  commit(PLAY_NEW_TRACK, newTrackList);
}
export function changeTrack({ commit }, change = 1) {
  commit(CHANGE_TRACK, change);
}
export function togglePlay({ commit }, playSwitch) {
  commit(TOGGLE_PLAY, playSwitch);
}
export function toggleMute({ commit }, muteSwitch) {
  commit(TOGGLE_MUTE, muteSwitch);
}
export function toggleRepeat({ commit }, repeatSwitch) {
  commit(TOGGLE_REPEAT, repeatSwitch);
}

export function updatePlaytime({ commit }) {
  /* eslint-disable */
  commit(UPDATE_PLAYTIME);
  /* eslint-enable */
}
