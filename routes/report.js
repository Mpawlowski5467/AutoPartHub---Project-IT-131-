var express = require('express');
var router = express.Router();

// ==================================================
// Route to display report menu
// URL: http://localhost:3002/report
// ==================================================
router.get('/', function(req, res, next) {
    res.render('report/menu');
});


// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:3002/report/customer/ 
// ==================================================
router.get('/customer', function(req, res, next) {
    let query = "SELECT ID, FirstName, LastName, City, State, Country FROM customers"; 

    // execute query
    db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}
	res.render('report/custlist', {allrecs: result });
 	});
});


// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:3002/report/product
// ==================================================
router.get('/product', function(req, res, next) {
    let query = "SELECT Product_ID, Supplier_ID, Productname, RetailPrice, Packaging  FROM ProductInfo";
    // execute query
    
    
    db.query(query, (err, result) => {
            if (err) {
            console.log(err);
            res.render('error');
            }
    res.render('report/prodlist', {allrecs: result });
            });
    });


// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:3002/report/sale
// ==================================================
router.get('/sale', function(req, res, next) {
    let query = "SELECT o.OrderNumber OrderNumber, c.FirstName FirstName, c.LastName LastName, o.Time Time, p.Productname Productname, i.SalePrice SalePrice, i.Qty Qty FROM ProductInfo p, customers c, AutoPartOrders o, OrderLineItems i WHERE o.OrderNumber = i.OrderNumber AND i.Product_ID = p.Product_ID";
    // execute query
    db.query(query, (err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    }
    res.render('report/salelist', {allrecs: result });
    });
    });

    

module.exports = router;




// SELECT o.OrderNumber OrderNumber, c.FirstName FirstName, c.LastName LastName, o.Time Time, p.Product_ID Product_ID, i.SalePrice SalePrice, i.Qty Qty FROM ProductInfo p, customers c, AutoPartOrders o, OrderLineItems i, WHERE o.OrderNumber = i.OrderNumber AND i.Product_ID = p.Product_ID AND o.Customer_ID = c.Customer_ID