var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var currenttime = Date(Date.now()).toString();
  var passeddata = "Mateusz Pawlowski "

  res.render('index', { currenttime: currenttime, passeddata: passeddata});
});





module.exports = router;
