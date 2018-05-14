var db = require("./index");
var mongoose = require('mongoose');
var room = require('./room');
var Schema = mongoose.Schema;

var UserProfileSchema = mongoose.Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    email: String,
    nickname: String,
    room: {type: Schema.Types.ObjectId, ref: 'Room'}
  });
  
  var UserProfile = mongoose.model("UserProfile", UserProfileSchema);

  module.exports = UserProfile