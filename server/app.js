const express = require('express');
const path = require('path');
const config = require('./config/firebase');
const firebase = require('firebase');


let app = express();
const server = app.listen(8080, function () {
	const host = server.address().address;
	const port = server.address().port;
  console.log('HOST:', server.address());
  	console.log(`Example app listening at http://${host}:${port}`);
});
require('./config/express')(app);
require('./routes')(app);
//live reload of the server
app.use(require('connect-livereload')());
//Serve files in app folder
app.use(express.static(path.join(__dirname, '/../app')));
