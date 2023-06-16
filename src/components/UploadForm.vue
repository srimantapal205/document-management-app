<template>
    <div>
      <input type="file" @change="handleFileUpload" />
      <ul>
        <li v-for="(file, index) in fileList" :key="index" @click="convertToPdf(file)">
          {{ file.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { saveAs } from 'file-saver';
  
  export default {
    data() {
      return {
        fileList: [],
      };
    },
    methods: {
      handleFileUpload(event) {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
          this.fileList.push(files[i]);
        }
      },
      convertToPdf(file) {
        const formData = new FormData();
        formData.append('file', file);
  
        axios.post('http://localhost:8000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'blob',
        })
          .then(response => {
            const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
            saveAs(pdfBlob, `${file.name}.pdf`);
          })
          .catch(error => {
            console.error(error);
          });
      },
    },
  };
  </script>
  