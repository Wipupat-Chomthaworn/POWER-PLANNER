<template>
    <!-- <Navbar></Navbar> -->
    <div>
        <h1>Task Page</h1>

        <!-- Dropdown Select for Existing Groups -->
        <div>
            <label for="groupSelect">Select Group:</label>
            <select id="groupSelect" v-model="selectedGroup">
                <option value="">-- Select Group --</option>
                <option v-for="group in groups" :value="group.id" :key="group.id">{{ group.name }}</option>
            </select>
        </div>

        <!-- Display Tasks for Selected Group -->
        <ul v-if="selectedGroup">
            <li v-for="task in tasks" :key="task.group_id">
                <router-link :to="`/task/${task.id}`">{{ task.name }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from '../plugins/axios';
export default {
    data() {
        return {
            selectedGroup: '', // Holds the selected group ID
            groups: [], // Holds the list of existing groups
            tasks: [] // Holds the tasks for the selected group
        };
    },
    mounted() {
        this.fetchGroups(); // Fetch the list of existing groups
    },
    watch: {
        selectedGroup(newValue) {
            if (newValue) {
                this.fetchTasks(newValue); // Fetch tasks for the selected group
            } else {
                this.tasks = []; // Clear the tasks when no group is selected
            }
        }
    },
    methods: {
        fetchGroups() {
            axios.get(`/api/TaskGroups`)
            .then(response => {
                // Assign the tasks to the "tasks" data property
                this.groups = response.data;
            })
            .catch(error => {
                console.error(error);
            });
        },
    fetchTasks(groupId) {
        // Make an API call to fetch tasks for the given group ID
        axios.get(`/api/TaskGroups/${groupId}/tasks`)
            .then(response => {
                // Assign the tasks to the "tasks" data property
                this.tasks = response.data;
            })
            .catch(error => {
                console.error(error);
            });
    }
}
};
</script>
