<template>
    <div @click="handleClick">{{ file.name }}</div>
  </template>
  
  <script>
  export default {
    props: {
      file: {
        type: Object,
        required: true,
      },
    },
    methods: {
      handleClick() {
        this.$emit("file-clicked", this.file);
      },
    },
  };
  </script>
  