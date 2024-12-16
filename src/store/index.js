import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    apiMessage: "",
    dialog: false,
  },
  getters: {
    apiMessage(state) {
      return state.apiMessage;
    },
    dialog(state) {
      return state.dialog;
    },
  },
  mutations: {
    setApiMessage(state, message) {
      state.apiMessage = message;
    },
    UPDATE_DIALOG(state, value) {
      state.dialog = value;
    },
  },
  actions: {},
  modules: {},
});
