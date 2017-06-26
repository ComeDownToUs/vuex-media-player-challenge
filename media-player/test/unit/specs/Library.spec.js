import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';
import _ from 'lodash';
import Library from '../../../src/components/Library';
import router from '../../../src/router';
import store from '../../../src/vuex/store';
import option from '../../../src/vuex/general_media';

describe('Library.vue', () => {
  let testOptions;
  beforeEach(() => {
    testOptions = _.cloneDeep(option);
  });

  it('renders initial state', () => {
    Vue.use(Router);
    const Component = Vue.extend({ ...Library, store });
    const vm = new Vue({
      el: document.createElement('div'),
      render: h => h(Component),
    });
    assert.equal(vm.$el.querySelector('.library-title').textContent, 'Library');
  });
});
