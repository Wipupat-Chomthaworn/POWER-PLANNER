<template>
    <div class="calendar">
      <full-calendar ref="calendar" :options="calendarOptions"></full-calendar>
    </div>
  </template>
  
  <script>
  import FullCalendar from "@fullcalendar/vue";
  import dayGridPlugin from "@fullcalendar/daygrid";
  
  export default {
    components: {
      FullCalendar,
    },
    props: {
      items: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        calendarOptions: {
          plugins: [dayGridPlugin],
          events: this.items.map((item) => ({
            title: item.name,
            start: item.dueDate,
            end: item.dueDate,
          })),
        },
      };
    },
    watch: {
      items(newItems) {
        this.$refs.calendar.getApi().removeAllEvents();
        this.$refs.calendar.getApi().addEventSource(
          newItems.map((item) => ({
            title: item.name,
            start: item.dueDate,
            end: item.dueDate,
          }))
        );
      },
    },
  };
  </script>
  
  <style scoped>
  .calendar {
    height: 500px;
  }
  </style>
  