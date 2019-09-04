import Vue from 'vue';
import Vuex from 'vuex';

import VuexPersist from 'vuex-persist';

Vue.use(Vuex);

import { SET_NAV, SET_NUM } from './mutation-types'

const vuxLocalStorage = new VuexPersist({
  key: 'alex_ui',
  storage: window.localStorage,
  reducer: state => ({
    nav: state.nav,
    number: state.number
  })
});


const store = new Vuex.Store({
  state: {
    nav: '',
    number: 0
  },
  mutations: {
    [SET_NAV](state, data) {
      state.nav = data;
    },
    [SET_NUM](state, data) {
      state.number = data;
    }
  },
  plugins: [vuxLocalStorage.plugin]
});


export default store;