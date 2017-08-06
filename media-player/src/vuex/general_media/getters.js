/* eslint-disable no-unused-vars */
export const getAllTracks = state => state.tracks;
export const getAllPlaylists = state => state.playlists;
export const getNowPlaying = state => state.nowPlaying;
export const getIsFetching = state => state.isFetching;

// stripping down nesting
export const getCurrentPlayIndex = state => state.nowPlaying.currentIndex;
export const getCurrentTracks = state => state.nowPlaying.currentTracks;
