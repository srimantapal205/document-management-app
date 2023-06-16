<template>
    <div v-if="selectedFile">
      <!-- Display the PDF document here -->
    </div>
  </template>
  
  <script>
  export default {
    props: {
      selectedFile: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  