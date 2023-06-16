<template>
  <div>
    <input type="file" @change="handleFileUpload" />
    <ul>
      <li v-for="(file, index) in fileList" :key="index" @click="displayPDF(file)">
        {{ file.name }}
      </li>
    </ul>
  </div>
</template>

<script>
//import { PdfViewer } from 'vue-pdf';
export default {
  components: {
   // PdfViewer
  },
  data() {
    return {
      fileList: []
    };
  },
  methods: {
    handleFileUpload(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        this.fileList.push(files[i]);
      }
    },
    displayPDF(file) {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        const pdfData = fileReader.result;
        // Set the PDF data to a reactive property
        this.pdfData = pdfData;
      };

      fileReader.readAsArrayBuffer(file);
    }
  }
};
</script>
