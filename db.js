'use strict';

var Mongoose = require('mongoose'); 
var config = require('./config');
var db = null;

function connectDatabase(){
	Mongoose.Promise = global.Promise;
	Mongoose.connect('mongodb://' + config.database.host + '/' + config.database.db);
	db = Mongoose.connection;
	db.on('error', function callback(){
		console.error.bind(console, 'connection error');
		console.log("Reconectting database");
		connectDatabase();
	});  
	db.once('open', function callback() {  
	    console.log("Connection with database succeeded.");
	});	
}


connectDatabase();

exports.Mongoose = Mongoose;  
exports.db = db;
