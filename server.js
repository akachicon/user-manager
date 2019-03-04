// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const project = require('./project.config');

const app = express();
const port = project.dev.port;

app.use(express.static(project.outDir));
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`App listening on port ${port}`));
