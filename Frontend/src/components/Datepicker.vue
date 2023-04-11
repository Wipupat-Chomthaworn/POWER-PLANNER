<template>
  <datepicker v-model="value"></datepicker>
</template>

<script>
import Datepicker from "vuejs-datepicker";

export default {
  components: {
    Datepicker,
  },
  props: {
    value: {
      type: [String, Date],
      default: null,
    },
  },
};
</script>
