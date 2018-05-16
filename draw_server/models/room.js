var db = require("./index");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserProfile = require('./user');

var RoomSchema = mongoose.Schema({
    name: {type: String, required: true},
    owner: {type: Schema.Types.ObjectId, ref: "UserProfile"},
    members: [{type: Schema.Types.ObjectId, ref: "UserProfile"}],
  });
  
var Room = mongoose.model("Room", RoomSchema);

module.exports = Room

