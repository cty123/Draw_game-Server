var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Mongodb connection: Success");
});

var UserProfileSchema = mongoose.Schema({
  name: {type: String, required: true},
  password: {type: String, required: true},
  email: String,
  nickname: String,
})

var UserProfile = mongoose.model("UserProfile", UserProfileSchema);


/*
* This class contains user account operations
*/
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// Register account
router.post('/register', function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  let password_confirm = req.body.password_confirm;
  let email = req.body.email;
  let nickname = req.body.nickname;

  if (!username){
    res.json({
      "response":400,
      "msg":"No username given"
    });
  }
  if (!password){
    res.json({
      "response":400,
      "msg":"No password given"
    });
  }
  if (!password_confirm){
    res.json({
      "response":400,
      "msg":"No password_confirm given"
    });
  }
  if (!email){
    res.json({
      "response":400,
      "msg":"No email given"
    });
  }
  if (!nickname){
    res.json({
      "response":400,
      "msg":"No nickname given"
    });
  }
  if (password != password_confirm) {
    res.json({
      "response":400,
      "msg":"Two passwords are not equal"
    });
  }

  var account = {
    name: username,
    password: password,
    email: email,
    nickname: nickname,
  }
  var data = new UserProfile(account);
  data.save();
  res.json({
    "response": 201,
    "msg": "Account registered"
  });
}); 

// Check existing users
router.get('/check', function(req, res, next) {
  UserProfile.find()
    .then(function(doc) {
      res.send(doc);
    });
});

// Login
router.post('/login', function(req, res, next) {
  let user = req.body.username;
  let pass = req.body.password;
  // Check param existance
  if (!user) {
    res.json({
      "response":400,
      "msg":"No username given"
    });
  }
  if (!pass) {
    res.json({
      "response":400,
      "msg":"No password given"
    });
  }
  console.log(user);
  console.log(pass);
  // Find user
  UserProfile.findOne({
    name: user,
    password: pass
  }, function(err, obj){
    console.log(obj);
  }).then(function(doc) {
      if (!doc) {
        res.json({
          "response":400,
          "msg":"Login Failed"
        });
      }else {
        res.json({
          "response":200,
          "msg":"Login Success"
        });
      }
    });
});

module.exports = router;
