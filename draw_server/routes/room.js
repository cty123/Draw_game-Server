var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
      "group":""
  });
});

module.exports = router;
