import Vue from 'vue';
import Vuex from 'vuex';

import generalMedia from './general_media';

Vue.use(Vuex);

// <<TODO>> Make timers run correctly, currently breaking vuex store structure
// const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    generalMedia,
  },
  // strict: debug,
});
