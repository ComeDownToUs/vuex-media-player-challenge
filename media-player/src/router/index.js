import Vue from 'vue';
import Router from 'vue-router';
import Library from '@/components/Library';
import Playlist from '@/components/Playlist';
import PlaylistList from '@/components/PlaylistList';

Vue.use(Router);

export const routes = [
  {
    path: '/playlist/:id',
    name: 'Playlist',
    component: Playlist,
  },
  {
    path: '/playlists',
    name: 'PlaylistList',
    component: PlaylistList,
  },
  {
    path: '/',
    name: 'Library',
    component: Library,
  },
];

export default new Router({
  routes,
});
