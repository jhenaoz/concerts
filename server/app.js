const express = require('express');
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const connectLivereload = require('connect-livereload');
require('./config/firebase');

const app = express();

app.listen(8080);

require('./config/express')(app);
require('./routes')(app);
// live reload of the server
app.use(connectLivereload());
// Serve files in app folder
app.use(express.static(path.join(__dirname, '/../app')));
