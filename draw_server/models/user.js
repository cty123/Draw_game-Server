var db = require("./index");
var mongoose = require('mongoose');

var UserProfileSchema = mongoose.Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    email: String,
    nickname: String,
  })
  
  var UserProfile = mongoose.model("UserProfile", UserProfileSchema);

  module.exports = UserProfile