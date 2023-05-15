// store.js

import axios from 'axios';

const API_URL = 'http://localhost:3000/api/GetTasks';

const state = {
  tasks: [],
};

const getters = {
  getTasksByStatus: (state) => (status) => {
    return state.tasks.filter(task => task.task_status === status);
  },
};

const mutations = {
  SET_TASKS(state, tasks) {
    state.tasks = tasks;
  },
  ADD_TASK(state, task) {
    state.tasks.push(task);
  },
  UPDATE_TASK(state, task) {
    const index = state.tasks.findIndex(t => t.task_id === task.task_id);
    if (index !== -1) {
      state.tasks.splice(index, 1, task);
    }
  },
  REMOVE_TASK(state, task_id) {
    const index = state.tasks.findIndex(t => t.task_id === task_id);
    if (index !== -1) {
      state.tasks.splice(index, 1);
    }
  },
};

const actions = {
  async fetchTasks({ commit }) {
    try {
      const response = await axios.get(API_URL);
      commit('SET_TASKS', response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async addTask({ commit }, task) {
    try {
      const response = await axios.post(API_URL, task);
      commit('ADD_TASK', response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async updateTask({ commit }, task) {
    try {
      const response = await axios.put(`${API_URL}${task.task_id}/`, task);
      commit('UPDATE_TASK', response.data);
    } catch (error) {
      console.log(error);
    }
  },
  async removeTask({ commit }, task_id) {
    try {
      await axios.delete(`${API_URL}${task_id}/`);
      commit('REMOVE_TASK', task_id);
    } catch (error) {
      console.log(error);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};

// import Vue from 'vue';
// import Vuex from 'vuex';

// Vue.use(Vuex);

// const store = new Vuex.Store({
//   state: {
//     tasks: []
//   },
//   mutations: {
//     setTasks(state, tasks) {
//       state.tasks = tasks;
//     },
//     updateTask(state, updatedTask) {
//       const taskIndex = state.tasks.findIndex(task => task.task_id === updatedTask.task_id);
//       if (taskIndex !== -1) {
//         Vue.set(state.tasks, taskIndex, updatedTask);
//       }
//     },
//     addTask(state, newTask) {
//       state.tasks.push(newTask);
//     },
//     removeTask(state, taskId) {
//       const taskIndex = state.tasks.findIndex(task => task.task_id === taskId);
//       if (taskIndex !== -1) {
//         state.tasks.splice(taskIndex, 1);
//       }
//     }
//   },
//   actions: {
//     async fetchTasks({ commit }) {
//       const response = await fetch('/api/tasks');
//       const tasks = await response.json();
//       commit('setTasks', tasks);
//     },
//     async updateTask({ commit }, updatedTask) {
//       const response = await fetch(`/api/tasks/${updatedTask.task_id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(updatedTask)
//       });
//       const updatedTaskResponse = await response.json();
//       commit('updateTask', updatedTaskResponse);
//     },
//     async addTask({ commit }, newTask) {
//       const response = await fetch('/api/tasks', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newTask)
//       });
//       const newTaskResponse = await response.json();
//       commit('addTask', newTaskResponse);
//     },
//     async removeTask({ commit }, taskId) {
//       await fetch(`/api/tasks/${taskId}`, {
//         method: 'DELETE'
//       });
//       commit('removeTask', taskId);
//     }
//   },
//   getters: {
//     tasks: state => state.tasks,
//     tasksByStatus: state => {
//       return state.tasks.reduce((tasksByStatus, task) => {
//         if (!tasksByStatus[task.task_status]) {
//           tasksByStatus[task.task_status] = [];
//         }
//         tasksByStatus[task.task_status].push(task);
//         return tasksByStatus;
//       }, {});
//     }
//   }
// });

// export default store;
