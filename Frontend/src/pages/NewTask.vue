<template>
    <!-- <Navbar/> -->
    <SideBar />
    <div class="p-4 sm:ml-64">
        <!-- <br class=""> -->
        <!-- <h2 class="text-2xl font-bold mb-4">Create Task</h2> -->
        <h2 class="text-2xl font-bold mb-3 mt-5">Create Task</h2>

        <form @submit="createTask" class="mb-4">
            <div class="form-group">
                <label for="taskName">Task Name:</label>
                <input type="text" class="form-control" id="taskName" v-model="newTask.task_name" required>
            </div>
            <div class="form-group">
                <label for="taskDescription">Task Description:</label>
                <textarea class="form-control" id="taskDescription" v-model="newTask.task_desc" rows="4"
                    required></textarea>
            </div>
            <div class="form-group">
                <label for="dueDate">Due Date:</label>
                <input type="date" class="form-control" id="dueDate" v-model="newTask.due_date" required>
            </div>
            <br>
            <button type="submit" class="bg-yellow-500 text-white py-2 px-4 rounded">Create Task</button>
        </form>


        <!-- Task list -->
        <h2 class="text-2xl font-bold mb-4" :style="{ backgroundColor: getGroupColor() }">Task List</h2>
        <table class="w-full border">
            <thead>
                <tr>
                    <th class="px-4 py-2 bg-gray-200">Task Name</th>
                    <th class="px-4 py-2 bg-gray-200">Task Description</th>
                    <th class="px-4 py-2 bg-gray-200">Task Status</th>
                    <th class="px-4 py-2 bg-gray-200">Due Date</th>
                    <th class="px-4 py-2 bg-gray-200">Actions</th> <!-- Added Actions column -->
                </tr>
            </thead>
            <tbody>
                <tr v-for="task in tasks" :key="task.task_id">
                    <td class="px-4 py-2">
                        <!-- edit task Name -->
                        <template v-if="task.editing">
                            <input type="text" v-model="task.task_name" class="form-control" required>
                        </template>
                        <template v-else>
                            {{ task.task_name }}
                        </template>
                    </td>
                    <!-- edit task Description -->
                    <td class="px-4 py-2">
                        <template v-if="task.editing">
                            <textarea v-model="task.task_desc" rows="4" class="form-control" required></textarea>
                        </template>
                        <template v-else>
                            <div v-if="task.task_desc.length > 100">
                                {{ task.task_desc.slice(0, 100) }}<br>
                                {{ task.task_desc.slice(100) }}
                            </div>
                            <div v-else>
                                {{ task.task_desc }}
                            </div>
                        </template>
                    </td>

                    <!-- status color -->
                    <!-- <td :class="getTaskStatusColor(task.task_status, task)">
                        {{ task.task_status }}
                    </td> -->
                <!-- task status -->
                    <td class="px-4 py-2" :class="getTaskStatusColor(task.task_status, task)">
                        <template v-if="task.editing">
                            <select v-model="task.task_status" class="form-control" required>
                                <option value="Todo">Todo</option>
                                <option value="Doing">Doing</option>
                                <option value="Done">Done</option>
                            </select>
                        </template>
                        <template v-else>
                            {{ task.task_status }}
                        </template>
                    </td>

                    <!-- edit due_date -->
                    <td class="px-4 py-2">
                        <template v-if="task.editing">
                            <input type="date" v-model="task.due_date" class="form-control" required>
                        </template>
                        <template v-else>
                            {{ task.due_date }}
                        </template>
                    </td>

                    <td class="px-4 py-2">
                        <!-- Editing Task -->
                        <template v-if="task.editing">
                            <button @click="saveTask(task)"
                                class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Save</button>
                            <button @click="cancelEdit(task)"
                                class="bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded">Cancel</button>
                        </template>
                        <!-- click to edit Task -->
                        <template v-else>
                            <button @click="editTask(task)"
                                class="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">Edit</button>
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>
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
                task_desc: '',
                group_id: null,
                due_date: '', // Add the due_date property
            },
        };
    },
    created() {
        const taskGroupId = this.$route.params.taskGroupId;
        this.newTask.group_id = taskGroupId;
        this.fetchTasks(taskGroupId);
    },
    methods: {
        createTask() {
            axios
                .post('http://localhost:3000/api/addTask', this.newTask)
                .then((response) => {
                    // Reset form fields
                    this.newTask.task_name = '';
                    this.newTask.task_desc = '';
                    this.newTask.due_date = '',
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
                    const tasks = response.data;

                    // Add the 'editing' property to each task
                    tasks.forEach((task) => {
                        task.editing = false;
                    });
                    this.tasks = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        getGroupColor() {
            if (this.tasks.length > 0) {
                // console.log(this.tasks[0].group_color)
                return `backgroundColor: ${this.tasks[0].group_color}`
            }
            else {
                // console.log('else')
                return `backgroundColor: green`
            }

        },
        getTaskStatusColor(taskStatus, task) {
            const dueDate = new Date(task.due_date);
            const currentDate = new Date();

            if (dueDate < currentDate & taskStatus != "Done") {
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

        // mode of task ( edit or not )
        editTask(task) {
            task.editing = true;
        },
        // to save task ( send to backend )
        saveTask(task) {
            axios
                .put(`/api/updateTasks/${task.task_id}`, task)
                .then((response) => {
                    task.editing = false;
                    alert(response.data.message);
                })
                .catch((error) => {
                    alert("save task error");
                    console.log('save task error')
                    console.error(error);
                });
        },
        // toggle mode
        cancelEdit(task) {
            task.editing = false;
        },
    },
};
</script>
  
<style scoped>
/* Add tailwind styles here */
</style>
  