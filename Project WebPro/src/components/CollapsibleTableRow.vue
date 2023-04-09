<!-- <template>
    <tr>
      <td :style="{ backgroundColor: color }" @click="collapsed = !collapsed">{{ name }}</td>
      <td v-if="!collapsed" v-for="(task, index) in tasks" :key="index">{{ task }}</td>
    </tr>
  </template>
  
  <script>
  export default {
    props: {
      name: String,
      color: String,
      tasks: Array
    },
    data() {
      return {
        collapsed: true
      }
    }
  }
  </script>
   -->
   <template>
    <div>
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-bold text-gray-900">{{ group.name }}</h3>
        <button @click="folded = !folded" class="text-gray-700">
          <i :class="{'fa fa-chevron-down': folded, 'fa fa-chevron-right': !folded}"></i>
        </button>
      </div>
      <transition name="fold">
        <div v-if="!folded">
          <div v-for="(task, index) in group.task_name" :key="index" class="flex flex-col border-b border-gray-200 py-2">
            <div class="flex justify-between items-center">
              <p class="text-lg font-medium text-gray-800">{{ task.name }}</p>
              <input type="checkbox" v-model="task.completed" class="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
            </div>
            <p class="text-sm text-gray-600">{{ task.description }}</p>
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      group: Object
    },
    data() {
      return {
        folded: true
      }
    }
  }
  </script>
  
  <style>
  .fold-enter-active, .fold-leave-active {
    transition: all 0.2s ease;
  }
  
  .fold-enter, .fold-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
  </style>
  