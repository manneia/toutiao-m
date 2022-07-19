import Vue from 'vue'
import Vuex from 'vuex'
import { LoginOptions } from './LoginOptions/index'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    LoginOptions
  }
})
