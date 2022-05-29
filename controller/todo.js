'use strict';
var mongoose   = require('mongoose'),
    todo       = mongoose.model('todo'),
    async      = require('async'),
    jwt        = require('jsonwebtoken'),
    encryption = require('../utility/encryption'),
    config     = require('../config');

const privateKey = config.key.privateKey;

/**
   POST: /todo/create
 */

exports.create = function (req,res) {
    if(req.body.todotext && req.headers.authorization){
        async.waterfall([
            function(callback){
                var token = req.headers.authorization;
                jwt.verify(token, privateKey, function(err, decoded) {      
                  if (err) {
                    callback({ status: false, message: 'Failed to authenticate user.' });    
                  } else {
                    if(decoded.role == "client"){
                      callback(null, decoded);
                    } else{
                      callback({ status: false, message: 'Unauthorized !!' });    
                    }
                  }
                });
            },
            function(data, callback){
                let todoData = {
                    userId: data.userId,
                    todotext: req.body.todotext
                }
                todo.createTodo(todoData, function(err, result) {
                    if (!err) {
                        callback(null, "Success");
                    } else {
                        console.log(err);
                        callback({status: false, message: "Oops something went wrong in todo creation!!"});
                    }
                });
            }
        ], function (err, result) {
          if(err){
            return res.json(err);
          } else{
            return res.json({status: true, message: "Successfully created"});
          }
        });    
    } else{
        return res.json({status: false, message: "Invalid Request!!"});
    }
};

/**
   PUT: /todo/update
 */

exports.update = function (req,res) {
    if(req.body.todotext && req.body.id && req.headers.authorization){
        async.waterfall([
            function(callback){
                var token = req.headers.authorization;
                jwt.verify(token, privateKey, function(err, decoded) {      
                if (err) {
                    callback({ status: false, message: 'Failed to authenticate user.' });    
                } else {
                    if(decoded.role == "client"){
                    callback(null, decoded);
                    } else{
                    callback({ status: false, message: 'Unauthorized !!' });    
                    }
                }
                });
            },
            function(data, callback){
                todo.updateTodo(req.body.id, data.userId, req.body.todotext, function(err, result) {
                    if (!err) {
                        callback(null, "Success");
                    } else {
                        console.log(err);
                        callback({status: false, message: "Oops something went wrong in todo creation!!"});
                    }
                });
            }
        ], function (err, result) {
        if(err){
            return res.json(err);
        } else{
            return res.json({status: true, message: "Successfully updated"});
        }
        });    
    } else{
        return res.json({status: false, message: "Invalid Request!!"});
    }
};

/**
   PUT: /todo/list
 */

exports.list = function (req,res) {
    if(req.headers.authorization){
        async.waterfall([
            function(callback){
                var token = req.headers.authorization;
                jwt.verify(token, privateKey, function(err, decoded) {      
                if (err) {
                    callback({ status: false, message: 'Failed to authenticate user.' });    
                } else {
                    if(decoded.role == "client"){
                    callback(null, decoded);
                    } else{
                    callback({ status: false, message: 'Unauthorized !!' });    
                    }
                }
                });
            },
            function(data, callback){
                todo.getList(data.userId, function(err, result) {
                    if (!err) {
                        callback(null, result);
                    } else {
                        console.log(err);
                        callback({status: false, message: "Oops something went wrong in todo creation!!"});
                    }
                });
            }
        ], function (err, result) {
        if(err){
            return res.json(err);
        } else{
            return res.json({status: true, todoList: result});
        }
        });    
    } else{
        return res.json({status: false, message: "Invalid Request!!"});
    }
};