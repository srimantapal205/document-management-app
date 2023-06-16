<template>
    <div>
      <file-list-item
        v-for="file in files"
        :key="file.id"
        :file="file"
        @file-clicked="convertToPDF(file)"
      />
      <FileViewer></FileViewer>
    </div>
  </template>
  
  <script>
  import FileListItem from "./FileListItem.vue";
  import FileViewer from "./FileViewer.vue";
  
  export default {
    components: {
      FileListItem,
      FileViewer,
    },
    data() {
      return {
        files: [],
        selectedFile: null,
      };
    },
    methods: {
      convertToPDF(file) {
        // Convert the file to PDF format
        // Implement conversion logic here using a library like pdfmake
  
        // Set the selected file
        this.selectedFile = file;
      },
      handleFileUploaded() {
        // Refresh the file list when a new file is uploaded
        this.getFiles();
      },
      getFiles() {
        // Fetch the list of files from the server
        // Implement server-side logic to retrieve the files
        // and update the 'files' data property
      },
    },
    mounted() {
      this.getFiles();
    },
  };
  </script>
  