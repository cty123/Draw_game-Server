var express = require('express');
var router = express.Router();
var Room = require('../models/room');
var UserProfile = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  Room.find()
    .then(doc => {
      res.json({
        "res": "OK",
        "rooms": doc
      });
    })
});

router.post('/', function(req, res, next){
  let name = req.body.name;
  let username = req.body.username;
  UserProfile.findOne({ 'name': username }, function (err, user) {
    if (err){
      res.json({
        "res": "Failed",
        "msg": handleError(err)
      });
    }
    var new_room = new Room({
      name: name,
      owner: user
    });
    new_room.save();
    user.room = new_room;
    user.save();
    res.json({
      "res": "OK"
    });
  });
});

module.exports = router;
