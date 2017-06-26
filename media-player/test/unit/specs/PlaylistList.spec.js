import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import PlaylistList from '../../../src/components/PlaylistList';
import store from '../../../src/vuex/store';
import option from '../../../src/vuex/general_media';

describe('PlaylistList.vue', () => {
  let testOptions;
  beforeEach(() => {
    testOptions = _.cloneDeep(option);
  });

  it('renders initial state', () => {
    const Component = Vue.extend({ ...PlaylistList, store });
    const vm = new Vue({
      el: document.createElement('div'),
      render: h => h(Component),
    });
    assert.equal(vm.$el.querySelector('.playlist-list-title').textContent, 'Playlist');
  });
});
