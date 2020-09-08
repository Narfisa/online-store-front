import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id_User: null,
  },
  getters: {
    getId: (state) => state.id_User,
  },
  mutations: {
    /* eslint no-param-reassign: 0 */
    SET_ID_USER: (state, payload) => {
      state.id_User = payload;
    },
  },
  actions: {
    Authorized({ commit }, payload) {
      commit('SET_ID_USER', payload);
    },
  },
  modules: {},
});
