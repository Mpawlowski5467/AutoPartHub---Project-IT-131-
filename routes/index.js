var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let query = "SELECT Product_id, Supplier_ID, Productname, ItemSold, RetailPrice, Packaging, IsDiscontinued, homepage FROM ProductInfo WHERE homepage = true"; 

  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    }
    res.render('index', {allrecs: result });
  }); 

//   var currenttime = Date(Date.now()).toString();
//   var passeddata = "Mateusz Pawlowski "
// res.render('index', { currenttime: currenttime, passeddata: passeddata});
});








module.exports = router;
