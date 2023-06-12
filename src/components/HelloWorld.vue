<template>
  <div>
    <input type="file" @change="handleFileUpload">
    <button @click="uploadFile">Upload</button>
    <ul>
      <li v-for="file in fileList" :key="file.id" @click="viewFile(file.id)">{{ file.name }}</li>
    </ul>
    <div v-if="selectedFile">
      <pdf-viewer :file="selectedFile" />
    </div>
  </div>
</template>

<script>
import { uploadFileToSharePoint, getFileFromSharePoint } from '@/service/sharepointService.js';
import PdfViewer from './PdfViewer.vue';

export default {
  components: {
    PdfViewer,
  },
  data() {
    return {
      fileList: [],
      selectedFile: null,
    };
  },
  methods: {
    async handleFileUpload(event) {
      this.selectedFile = null;
      const file = event.target.files[0];
      this.fileList.push(file);
    },
    async uploadFile() {
      const file = this.fileList[this.fileList.length - 1];
      await uploadFileToSharePoint(file);
      this.fileList.pop();
    },
    async viewFile(fileId) {
      const file = await getFileFromSharePoint(fileId);
      this.selectedFile = file;
    },
  },
};
</script>
