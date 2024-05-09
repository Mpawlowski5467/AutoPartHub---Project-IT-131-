var express = require('express');
var router = express.Router();
// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:3026/ProductInfo/
// ==================================================
router.get('/', function(req, res, next) {
let query = "SELECT Product_ID, Supplier_ID, ProductName, ItemSold, RetailPrice, Packaging  FROM ProductInfo";
// execute query


db.query(query, (err, result) => {
        if (err) {
        console.log(err);
        res.render('error');
        }
res.render('product/allrecords', {allrecs: result });
        });
});



// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
        let query = "SELECT Product_ID, Supplier_ID, Productname , ItemSold , RetailPrice , Packaging , IsDiscontinued FROM ProductInfo WHERE Product_ID = " + req.params.recordid;
        // execute query
        db.query(query, (err, result) => {
        if (err) {
        console.log(err);
        res.render('error');
        } else {
        res.render('product/onerec', {onerec: result[0] });
        }
        });
        });
        

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function(req, res, next) {
        res.render('product/addrec');
        });



 // ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {
        let insertquery = "INSERT INTO ProductInfo ( Product_ID, Supplier_ID, Productname , ItemSold , RetailPrice , Packaging , IsDiscontinued) VALUES(?, ?, ?, ?, ?, ?, ?)";
        
        db.query(insertquery,[req.body.Product_ID, req.body.Supplier_ID, req.body.Productname, req.body.ItemSold,
         req.body.RetailPrice, req.body.Packaging, req.body.IsDiscontinued],(err, result) => {
                        if (err) {
                                        console.log(err);
                                        res.render('error');
                                } else {
                                res.redirect('/product');
                                        }
                        });
                });
        
// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
        let query = "SELECT Product_ID, Supplier_ID, Productname , ItemSold , RetailPrice , Packaging , IsDiscontinued FROM ProductInfo WHERE Product_ID = " + req.params.recordid;
        // execute query
                db.query(query, (err, result) => {
                        if (err) {
                        console.log(err);
                         res.render('error');
                        } else {
                res.render('product/editrec', {onerec: result[0] });
                        }
                });
        });
        


// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
        let updatequery = "UPDATE ProductInfo SET Product_ID = ?, Supplier_ID = ?,  ItemSold= ?,RetailPrice = ?, Packaging = ?, IsDiscontinued = ? WHERE Product_ID = " + req.body.Product_ID;
        
        db.query(updatequery,[req.body.Product_ID, req.body.Supplier_ID, req.body.ItemSold, req.body.RetailPrice, req.body.Packaging, req.body.IsDiscontinued ],(err, result) => {
        if (err) {
        console.log(err);
        res.render('error');
        } else {
        res.redirect('/product');
        }
 });
});
        

// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
        let query = "DELETE FROM ProductInfo WHERE Product_ID = " + req.params.recordid;
        // execute query
        db.query(query, (err, result) => {
        if (err) {
        console.log(err);
        res.render('error');
        } else {
        res.redirect('/product');
        }
        });
        });
        
                
        
module.exports = router;
