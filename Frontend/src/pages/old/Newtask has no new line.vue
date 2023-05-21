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
            <td class="px-4 py-2">{{ task.task_name }}</td>
            <td class="px-4 py-2">{{ task.task_desc }}</td>
            <td :class="getTaskStatusColor(task.task_status, task)">
                {{ task.task_status }}
            </td>
            <td class="px-4 py-2">{{ task.due_date }}</td>
            <td class="px-4 py-2">
                <router-link :to="`/tasks/${task.task_id}/subtasks/create`"
                    class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Create Subtask</router-link>
                <!-- <router-link :to="`/tasks/${task.task_id}/subtasks/view`" class="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded">View Subtasks</router-link> -->
            </td>
        </tr>
    </tbody>
</table>