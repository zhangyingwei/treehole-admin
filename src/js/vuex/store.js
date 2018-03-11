import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    User: {},
    showMenu: true,
    article: null,
  },
  mutations: {
    updateAccount(state, data){
      state.User = data;
    },
    updateMenu(state, isShow){
      state.showMenu = isShow;
    },
    updateArticle(state,data){
      state.article = data
    }
  },
  actions: {
    updateAccount(context, data){
      context.commit('updateAccount', data)
    },
    updateMenu(context, data){
      context.commit('updateMenu', data)
    },
    updateArticle(context,data){
      context.commit("updateArticle",data)
    }
  },
  getters: {
    account: state => {
      return state.User
    },
    showMenu: state => {
      return state.showMenu
    },
    article: state => {
      return state.article
    }
  }
})