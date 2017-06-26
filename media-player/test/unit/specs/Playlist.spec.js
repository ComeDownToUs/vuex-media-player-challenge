import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import Playlist from '../../../src/components/Playlist';
import store from '../../../src/vuex/store';
import option from '../../../src/vuex/general_media';

describe('Playlist.vue', () => {
  let testOptions;
  beforeEach(() => {
    testOptions = _.cloneDeep(option);
  });

  it('renders initial state', () => {
    const Component = Vue.extend({ ...Playlist, store });
    const vm = new Vue({
      el: document.createElement('div'),
      render: h => h(Component),
    });
    console.log(vm.$el);
    assert.equal(vm.$el.querySelector('.playlist-list.title').textContent, 'Playlist: ');
  });
});
