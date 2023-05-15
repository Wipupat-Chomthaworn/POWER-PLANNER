import { createStore } from 'vuex'
import kanbanStore from './kanbanStore.js'

const mainStore = createStore({
  state: {
    user: null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit('SET_USER', user)
    },
  },
})

// Create a new Vuex store instance by combining the main store and the kanban store
const store = createStore({
  modules: {
    main: mainStore,
    kanban: kanbanStore,
  }
})

export default store
// import { createApp } from 'vue'
// import App from '../pages/App.vue'
// import store from './store.js'
// import kanbanStore from './kanbanStore.js'

// const app = createApp(App)

// app.use(store)
// app.use(kanbanStore)

// app.mount('#app')
