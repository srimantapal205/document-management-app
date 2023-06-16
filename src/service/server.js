const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const { exec } = require('child_process');

const app = express();

app.use(express.json());
app.use(fileUpload());

app.post('/upload', (req, res) => {
  const file = req.files.file;

  // Save the file
  file.mv(`${__dirname}/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    // Convert to PDF
    exec(`libreoffice --headless --convert-to pdf ${__dirname}/uploads/${file.name}`, (error) => {
      if (error) {
        console.error(error);
        return res.status(500).send(error);
      }

      // Read the PDF file
      fs.readFile(`${__dirname}/uploads/${file.name}.pdf`, (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }

        // Delete temporary files
        fs.unlink(`${__dirname}/uploads/${file.name}`, (err) => {
          if (err) {
            console.error(err);
          }
        });

        fs.unlink(`${__dirname}/uploads/${file.name}.pdf`, (err) => {
          if (err) {
            console.error(err);
          }
        });

        // Send the converted PDF data
        res.send(data);
      });
    });
  });
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
