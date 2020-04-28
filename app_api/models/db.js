const mongoose = require('mongoose');

var url= 'mongodb://localhost:27017/Loc8r';

// Connecting to the database
const connect = () => {
	mongoose.Promise = global.Promise;
	mongoose.connect(url, {
    	useNewUrlParser: true, useUnifiedTopology: true 
	}).then(() => {
    	console.log("Successfully connected to the database");    
	}).catch(err => {
    	console.log('Could not connect to the database. Exiting now...', err);
    	process.exit();
	});	
}
connect();