import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import TrackList from '../../../src/components/TrackList';
import store from '../../../src/vuex/store';
import option from '../../../src/vuex/general_media';

describe('TrackList.vue', () => {
  const dataTracks = {
    'ffc4d1b6-56f0-11e7-907b-a6006ad3dba0': {
      artist: 'Solu Music',
      duration: 59,
      track_path: 'http://www.stephaniequinn.com/Music/Allegro from Duet in C Major.mp3',
      title: 'Fade (feat Kimblee - Fuchse remix)',
      genre: 'Trance',
      rating: false,
      id: 'ffc4d1b6-56f0-11e7-907b-a6006ad3dba0',
    },
    'ffc4d45e-56f0-11e7-907b-a6006ad3dba0': {
      artist: 'Freemasons',
      duration: 90,
      track_path: 'http://www.stephaniequinn.com/Music/Canon.mp3',
      title: 'Tears (Club Mix)',
      genre: 'House',
      rating: false,
      id: 'ffc4d45e-56f0-11e7-907b-a6006ad3dba0',
    },
  };
  let testOptions;
  beforeEach(() => {
    testOptions = _.cloneDeep(option);
  });

  it('renders initial state', () => {
    const Component = Vue.extend({ ...TrackList, store });
    const vm = new Vue({
      el: document.createElement('div'),
      render: h => h(Component),
    });
    console.log(vm.$el);
    assert.equal(vm.$el.querySelector('.sort-artist').textContent, 'Artist');
  });
});
