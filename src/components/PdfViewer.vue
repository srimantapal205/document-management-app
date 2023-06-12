<template>
    <div ref="pdfContainer"></div>
  </template>
  
  <script>

  export default {
    props: {
      file: {
        type: Object,
        required: true,
      },
    },
    mounted() {
      const pdfContainer = this.$refs.pdfContainer;
      const pdfFile = URL.createObjectURL(this.file);
      const pdfjsLib = require('pdfjs-dist');
  
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.8.335/pdf.worker.min.js';
  
      pdfjsLib.getDocument(pdfFile).promise.then((pdf) => {
        const pageNumber = 1;
        pdf.getPage(pageNumber).then((page) => {
          const scale = 1.5;
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
  
          const renderContext = {
            canvasContext: context,
            viewport,
          };
  
          page.render(renderContext).promise.then(() => {
            pdfContainer.appendChild(canvas);
          });
        });
      });
    },
  };
  </script>
  