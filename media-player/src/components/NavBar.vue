<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <router-link
          v-bind:to="{name: 'PlaylistList'}"
          class="link-playlist">
          Playlists
        </router-link> |
        <router-link
          v-bind:to="{name: 'Library'}"
          class="link-library">
          Library
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nav-bar',
};
</script>
