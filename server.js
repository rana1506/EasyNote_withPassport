require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a simple route

app.use('/api', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
 	next();
});



const indexRouter = require('./app_server/routes/note.route.js');
const apiRouter = require('./app_api/routes/note.route.js');
app.use('/server', indexRouter);
app.use('/api', apiRouter);
require('./app_api/models/db.js');


// view engine setup

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'app_server','views'));
app.set('view engine', 'pug');


// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});