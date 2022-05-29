'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
  * @module  User
  * @description contain the details of user
*/

var userSchema = new Schema({

  userId: { type: String, unique: true  },
  
  name : { type: String, required: true, index: true },

  email : { type: String, unique: true },

  phoneNumber : { type: Number, unique: true },

  role: { type: String },

  password: { type: String, required: true },

  isActive: { type: Boolean, default: false, index: true },
  
  createdAt: { type: Number },

  updatedAt: { type: Number }
  
});

userSchema.statics.getAll= function(query, callback) {
    this.find(query, {__v: 0, createdAt: 0, updatedAt: 0, password: 0}).sort({_id: -1}).exec(callback);;
};

userSchema.statics.getList= function(query, callback) {
    this.find(query, {userId: 1, email: 1, phoneNumber: 1, role: 1, isActive: 1}).sort({_id: -1}).exec(callback);;
};

userSchema.statics.getOne= function(query, callback) {
    this.findOne(query,{__v: 0}, callback);
};


userSchema.statics.createUser = function(requestData, callback) {
    requestData.createdAt = (new Date()).getTime();
    requestData.updatedAt = (new Date()).getTime();
    this.create(requestData, callback);
};

userSchema.statics.updateUser = function(userId, updateData, callback) {
    updateData.updatedAt = (new Date()).getTime();
    this.update({userId: userId}, {$set: updateData}, callback);
};

userSchema.statics.updateActiveDeactive = function(id, updateData, callback) {
    updateData.updatedAt = (new Date()).getTime();
    this.update({_id: mongoose.Types.ObjectId(id)}, {$set: updateData}, callback);
};

userSchema.statics.updatePassword = function(email, password, callback){
    var updatedDate = (new Date()).getTime();
    this.update({email: email}, {$set: {password : password, updatedAt: updatedDate}}, callback);
};

userSchema.statics.deleteUser = function(userId, callback) {
    this.remove({userId: userId}, callback);
};

userSchema.statics.getUserDetail = function(query, callback){
    this.findOne(query, {__v: 0, createdAt: 0, updatedAt: 0, password: 0, role: 0, }, callback);
};

var affiliates = mongoose.model('affiliates', userSchema);

/** export schema */
module.exports = {
    affiliates : affiliates
};