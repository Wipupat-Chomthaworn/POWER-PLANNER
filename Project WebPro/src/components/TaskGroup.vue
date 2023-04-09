<template>
    <tr class="border-b border-gray-200" @click="isOpen = !isOpen">
      <td
        :style="{ backgroundColor: color }"
        class="px-4 py-3 font-semibold text-gray-900 cursor-pointer"
      >
        {{ name }}
        <svg
          v-if="isOpen"
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 inline-block ml-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10.854 15.146a.5.5 0 01-.708 0L5.293 10.5a.5.5 0 01.708-.708L10 13.793l4.146-4.147a.5.5 0 11.708.708l-4.5 4.5z"
            clip-rule="evenodd"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 inline-block ml-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M7.646 6.354a.5.5 0 01.708 0L10 8.293l1.646-1.646a.5.5 0 11.708.708l-2 2a.5.5 0 01-.708 0l-2-2a.5.5 0 010-.708z"
            clip-rule="evenodd"
          />
        </svg>
      </td>
      <template v-if="isOpen">
        <td
          class="px-4 py-2 whitespace-pre-line"
          v-for="(task, index) in tasks"
          :key="index"
        >
          {{ task }}
        </td>
      </template>
    </tr>
  </template>

  <script>
  export default {
    props: {
      name: {
        type: String,
        required: true,
      },
      color: {
        type: String,
        required: true,
      },
    },
}
</script>