<template>
    <!-- <Navbar/> -->
    <SideBar />
    <div class="p-4 sm:ml-64">
        <h2 class="text-2xl font-bold mb-4">Create Task</h2>
        <form @submit="createTask" class="mb-4">
            <div class="form-group">
                <label for="taskName">Task Name:</label>
                <input type="text" class="form-control" id="taskName" v-model="newTask.task_name" required>
            </div>
            <div class="form-group">
                <label for="taskDescription">Task Description:</label>
                <textarea class="form-control" id="taskDescription" v-model="newTask.task_description" rows="4"
                    required></textarea>
            </div>
            <br>
            <button type="submit" class="bg-yellow-500 text-white py-2 px-4 rounded">Create Task</button>
        </form>

        <!-- task list -->
        <h2 class="text-2xl font-bold mb-4" :style="{ getGroupColor }">Task List</h2>
        <ul>
            <li v-for="task in tasks" :key="task.task_id">
                <h3 class="text-lg font-bold">{{ task.task_name }}</h3>
                <p>{{ task.task_desc }}</p>
                
                <div :class="getTaskStatusColor(task.task_status, task)">
                    <p>{{ task.task_status }}</p>
                </div>
                <p class="text-gray-500">Due Date: {{ task.due_date }}</p>
            </li>
        </ul>
    </div>
</template>
  
<script>
//   import axios from 'axios';
import axios from '../plugins/axios';

import Navbar from '../components/Navbar.vue';
import SideBar from '../components/SideBar.vue';

export default {
    name: 'CreateTask',
    components: {
        Navbar,
        SideBar,
    },
    data() {
        return {
            tasks: [],
            newTask: {
                task_name: '',
                task_description: '',
                taskGroup: null,
            },
        };
    },
    created() {
        const taskGroupId = this.$route.params.taskGroupId;
        this.newTask.taskGroup = taskGroupId;
        this.fetchTasks(taskGroupId);
    },
    methods: {
        createTask() {
            axios
                .post('http://localhost:3000/api/addTask', this.newTask)
                .then((response) => {
                    // Reset form fields
                    this.newTask.task_name = '';
                    this.newTask.task_description = '';
                    alert(response.data.message);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        fetchTasks(taskGroupId) {
            axios
                .get(`/api/TaskGroups/${taskGroupId}/tasks`)
                .then((response) => {
                    this.tasks = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        getGroupColor(){
            if (this.tasks.length > 0){
                console.log(this.tasks[0].group_color)
                return `backgroundColor: ${this.tasks[0].group_color}`
            }
            else{
                console.log('else')

                return `backgroundColor: green`
            }
            
        },
        getTaskStatusColor(taskStatus, task) {
            const dueDate = new Date(task.due_date);
            const currentDate = new Date();

            if (dueDate < currentDate & taskStatus !="Done") {
                return 'bg-red-500 text-white'; // Apply red color for overdue tasks
            }
            else {
                switch (taskStatus) {
                    case 'Done':
                        return 'bg-green-500 text-white';
                    case 'Todo':
                        return 'bg-yellow-500 text-black';
                    case 'Doing':
                        return 'bg-blue-500 text-white';
                    default:
                        return '';
                }
            }

        },
    },
};
</script>
  
<style scoped>
/* Add tailwind styles here */
</style>
  