var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
let query = "SELECT Product_ID, Supplier_ID, Productname , ItemSold , RetailPrice , Packaging , IsDiscontinued  FROM ProductInfo WHERE Productname LIKE '%" + req.query.searchcriteria + "%' OR ItemSold LIKE '%" +  req.query.searchcriteria + "%'";
// execute query
db.query(query, (err, result) => {
if (err) {
console.log(err);
res.render('error');
} else {
res.render('search', {allrecs: result});
}
});
});
module.exports = router;