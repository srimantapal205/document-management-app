<template>
    <div>
      <input type="file" ref="fileInput" @change="uploadFile" />
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    methods: {
      uploadFile() {
        const file = this.$refs.fileInput.files[0];
        const formData = new FormData();
        formData.append("file", file);
  
        axios
          .post("http://localhost:8000/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            // File uploaded successfully
            this.$emit("file-uploaded");
          })
          .catch((error) => {
            console.error("Error uploading file: ", error);
          });
      },
    },
  };
  </script>
  