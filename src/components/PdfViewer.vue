<template>
    <div>
      <pdf-viewer :binary="pdfData"></pdf-viewer>
    </div>
  </template>
  
  <script>
  import { PdfViewer } from 'vue-pdf';
  
  export default {
    components: {
      PdfViewer
    },
    props: ['pdfData']
  };
  </script>
  