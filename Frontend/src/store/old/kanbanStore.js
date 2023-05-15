import { createStore } from 'vuex'

const kanbanStore = createStore({
  state: {
    tasks: []
  },
  mutations: {
    SET_TASKS(state, tasks) {
      state.tasks = tasks
    },
    ADD_TASK(state, task) {
      state.tasks.push(task)
    },
    UPDATE_TASK(state, updatedTask) {
      const taskIndex = state.tasks.findIndex(task => task.id === updatedTask.id)
      if (taskIndex !== -1) {
        state.tasks.splice(taskIndex, 1, updatedTask)
      }
    },
    REMOVE_TASK(state, taskId) {
      const taskIndex = state.tasks.findIndex(task => task.id === taskId)
      if (taskIndex !== -1) {
        state.tasks.splice(taskIndex, 1)
      }
    }
  },
  actions: {
    fetchTasks({ commit }) {
      // Perform API request to fetch tasks
      const tasks = [
        { id: 1, name: 'Task 1', description: 'Task 1 description', status: 'Todo', dueDate: '2023-05-31' },
        { id: 2, name: 'Task 2', description: 'Task 2 description', status: 'Doing', dueDate: '2023-05-15' },
        { id: 3, name: 'Task 3', description: 'Task 3 description', status: 'Done', dueDate: '2023-06-01' }
      ]
      commit('SET_TASKS', tasks)
    },
    addTask({ commit }, task) {
      // Perform API request to add task
      // ...
      // If successful, commit mutation to add task to state
      commit('ADD_TASK', task)
    },
    updateTask({ commit }, updatedTask) {
      // Perform API request to update task
      // ...
      // If successful, commit mutation to update task in state
      commit('UPDATE_TASK', updatedTask)
    },
    removeTask({ commit }, taskId) {
      // Perform API request to remove task
      // ...
      // If successful, commit mutation to remove task from state
      commit('REMOVE_TASK', taskId)
    }
  },
  getters: {
    todoTasks: (state) => {
      return state.tasks.filter(task => task.status === 'Todo');
    },
    doingTasks: (state) => {
      return state.tasks.filter(task => task.status === 'Doing');
    },
    doneTasks: (state) => {
      return state.tasks.filter(task => task.status === 'Done');
    }
  }
})

export default kanbanStore
