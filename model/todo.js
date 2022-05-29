'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
  * @module  Todo
  * @description contain the details of user todo
*/

var todoSchema = new Schema({

  userId: { type: String, required: true },

  todotext: { type: String, required: true },
  
  createdAt: { type: Number },

  updatedAt: { type: Number }
  
});


todoSchema.statics.getList= function(query, callback) {
    this.find(query).sort({_id: -1}).exec(callback);;
};

todoSchema.statics.getOne= function(query, callback) {
    this.findOne(query,{__v: 0}, callback);
};


todoSchema.statics.createTodo = function(requestData, callback) {
    requestData.createdAt = (new Date()).getTime();
    requestData.updatedAt = (new Date()).getTime();
    this.create(requestData, callback);
};

todoSchema.statics.updateTodo = function(id, todotext, callback) {
    updateData.updatedAt = (new Date()).getTime();
    this.update({_id: mongoose.Types.ObjectId(id)}, {$set: {todotext: todotext}}, callback);
};
todoSchema.statics.deleteTodo = function(id, callback) {
    this.remove({_id: mongoose.Types.ObjectId(id)}, callback);
};

var todo = mongoose.model('todo', todoSchema);

/** export schema */
module.exports = {
    todo : todo
};