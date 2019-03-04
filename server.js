const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const { outDir, html } = require('./project.config');

const app = express();
const port = 8080;

app.use(express.static(path.resolve(__dirname, outDir)));

app.get('/*', (req, res) => {
  if (req.url.indexOf('.') === -1) {
    res.sendFile(path.resolve(__dirname, outDir, html.output.filename));
  }
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
