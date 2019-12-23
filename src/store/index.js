import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import admin from './modules/admin'
import setting from './modules/setting'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    admin,
    setting
  },
  getters
})

export default store
