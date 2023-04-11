<template>
    <table>
      <tbody>
        <CollapsibleTableRow v-for="(group, index) in groups" :key="index" :name="group.name" :color="group.color" :tasks="group.task_name" />
      </tbody>
    </table>
  </template>
  
  <script>
  import CollapsibleTableRow from '../components/CollapsibleTableRow.vue'
  
  export default {
    components: {
      CollapsibleTableRow
    },
    data() {
      return {
        groups: [
          { name: 'Group 1', color: '#FF0000', task_name: ['Task 1', 'Task 2'] },
          { name: 'Group 2', color: '#00FF00', task_name: ['Task 3', 'Task 4'] },
          { name: 'Group 3', color: '#0000FF', task_name: ['Task 5', 'Task 6'] }
        ]
      }
    }
  }
  </script>
  