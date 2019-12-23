import { login, logout, getInfo } from '@/api/admin'
import { session } from '@/util/session'

const state = {
  token: session('token'),
  username: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  }
}

const actions = {
  login ({ commit }, data) {
    const { username, password } = data
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        session('token', data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  logout ({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_USERNAME', '')
        session(null)
        // resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const data = response.data
        if (!data.username) {
          reject(new Error('Error'))
        }
        commit('SET_USERNAME', data.username)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  resetToken ({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      session('token', null)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
