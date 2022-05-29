'use strict';
var mongoose   = require('mongoose'),
    user       = mongoose.model('affiliates'),
    async      = require('async'),
    jwt        = require('jsonwebtoken'),
    encryption = require('../utility/encryption'),
    config     = require('../config');

const privateKey = config.key.privateKey;

/**
   POST: /user/create
 */

exports.create = function (req,res) {
    if(req.body.userId && req.body.email && req.body.phoneNumber && req.body.password){
        async.waterfall([
            function(callback){
              user.getOne({ $or: [ {userId: req.body.userId}, {email: req.body.email}, {phoneNumber: req.body.phoneNumber} ] }, function(err, result){
                if(err){
                  callback({status: false, message: "Oops something went wrong in verify userId!!"});
                } else{
                  if(result){
                    callback({status: false, message: "duplicate userId, phonenumber or email exist"});
                  } else{
                    callback(null, req.body);
                  }
                }
              });
            },
            function(data, callback){
                let userData = {
                    name: data.name,
                    userId: data.userId,
                    email: data.email,
                    phoneNumber: data.phoneNumber,
                    role: "client",
                    password: encryption.encrypt(data.password)
                }
                
                user.createUser(userData, function(err, result) {
                    if (!err) {
                        callback(null, "Success");
                    } else {
                        console.log(err);
                        callback({status: false, message: "Oops something went wrong in account creation!!"});
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
   POST: /user/login
 */

   exports.login = function (req,res) {
    if(req.body.phoneNumber && req.body.password){
        async.waterfall([
            function(callback) {
              user.getOne({phoneNumber: req.body.phoneNumber}, function(err, result){
                if(err){
                  callback({status: false, message: "Oops something went wrong!!"});
                } else{
                  if(result){
                    callback(null, result)
                  } else{
                    callback({status: false, message: "Invalid username or password"});
                  }
                }
              });
            },
            function(user, callback) {
              let pass = encryption.decrypt(user.password);
              if(req.body.password == pass){
                var response = {
                                userId: user.userId,
                                name: user.name,
                                email: user.email,
                                phoneNumber: user.phoneNumber,
                                role: user.role
                              };
                response.token = jwt.sign(response, privateKey);
                callback(null, response);
              } else{
                callback({status: false, message: "Invalid username or password"});
              }
            }
        ], function (err, result) {
            if(err){
              return res.json(err);
            } else{
              return res.json({status: true, result: result});
            }
        });
    } else{
        return res.json({status: false, message: "Invalid Request!!"});
    }
  };