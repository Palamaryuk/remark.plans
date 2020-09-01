import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    currentTasks: [],
    // currentTasks: [
    //   {
    //     num: '1',
    //     title: 'Задача 1 qwfqwef qwf qw efq wf qwefqwfqw fq wef qwfe ',
    //     link: 'https://element.eleme.io/#/en-US/component/icon'
    //   },
    // ],
    apiKey: "",
    hyperLink: null,
    helpExtension: null,
    work_chat_id: "chat22636",
    // work_chat_id: "5764",
  },
  getters: {
    currentTasks: state => {
      return state.currentTasks;
    },
    apiKey: state => {
      return state.apiKey;
    },
    hyperLink: state => {
      return state.hyperLink;
    },
    helpExtension: state => {
      return state.helpExtension;
    },
  },
  mutations: {
    set_currentTasks: (state, payload) => {
      state.currentTasks = payload

      chrome.storage.sync.set({
        tasks: state.currentTasks
      });
    },
    set_apiKey: (state, payload) => {
      state.apiKey = payload

      chrome.storage.sync.set({
        s_apiKey: state.apiKey
      });
    },
    set_hyperLink: (state, payload) => {
      state.hyperLink = payload

      chrome.storage.sync.set({
        s_hyperLink: state.hyperLink
      });
    },
    set_helpExtension: (state, payload) => {
      state.helpExtension = payload

      chrome.storage.sync.set({
        s_helpExtension: state.helpExtension
      });
    },
  },
  actions: {
    clearTasks({state}) {
      chrome.storage.sync.remove(["tasks"],function(){
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }else{
          state.currentTasks = []
        }
      })
    },
    getCurrentTasks({state}) {
      chrome.storage.sync.get('tasks', function(result) {
        state.currentTasks = typeof result.tasks === "undefined" ? [] : result.tasks
      })
    },
    getAppSettings({state}) {
      chrome.storage.sync.get(['s_apiKey', 's_hyperLink', 's_helpExtension'], function(result) {
        state.apiKey = typeof result.s_apiKey === "undefined" ? "" : result.s_apiKey;
        state.hyperLink = typeof result.s_hyperLink === "undefined" ? true : result.s_hyperLink;
        state.helpExtension = typeof result.s_helpExtension === "undefined" ? true : result.s_helpExtension;
      })
    },
    initData(){
      store.dispatch('getCurrentTasks')
      store.dispatch('getAppSettings')
    },
    removeCurrentTaskByID({state, commit}, data){
      state.currentTasks.splice(data, 1)
      commit('set_currentTasks', state.currentTasks)
    }
  },
});
