var db = require("./index");
var mongoose = require('mongoose');

var RoomSchema = mongoose.Schema({
    name: {type: String, required: true},
    owner: {type: String, required: true},
    members: {type: Array},
  });
  
var Room = mongoose.model("Room", RoomSchema);

module.exports = Room

