var express = require('express');
var router = express.Router();
// ==================================================
// Route to list all records. Display view to list all records
// ==================================================
router.get('/', function(req, res, next) {
let query = "SELECT LineItemID, OrderNumber, Product_ID, Qty, SalePrice FROM OrderLineItems";
// execute query
db.query(query, (err, result) => {
if (err) {
console.log(err);
res.render('error');
}
res.render('orderline/allrecords', {allrecs: result });
});
});

    // ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
    let query = "SELECT LineItemID, OrderNumber, Product_ID, Qty, SalePrice FROM OrderLineItems WHERE LineItemID = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.render('orderline/onerec', {onerec: result[0] });
    }
    });
    });
// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function(req, res, next) {
    res.render('orderline/addrec');
    });
   
// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {
    let insertquery = "INSERT INTO OrderLineItems (LineItemID, OrderNumber, Product_ID, Qty, SalePrice) VALUES(?, ?, ?, ?, ?)";
    db.query(insertquery,[req.body.LineItemID, req.body.OrderNumber, req.body.Product_ID, req.body.Qty, req.body.SalePrice],(err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.redirect('/orderline');
    }
    });
    });
   
// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
    let query = "SELECT LineItemID, OrderNumber, Product_ID, Qty, SalePrice FROM OrderLineItems WHERE LineItemID = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.render('orderline/editrec', {onerec: result[0] });
    }
    });
    });
// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
    let updatequery = "UPDATE OrderLineItems SET OrderNumber = ?, OrderNumber = ?, Qty = ?,SalePrice = ?WHERE LineItemID = " + req.body.LineItemID;
    
    db.query(updatequery,[req.body.OrderNumber, req.body.OrderNumber, req.body.Qty, req.body.SalePrice],(err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.redirect('/orderline');
    }
    });
    });


// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
    let query = "DELETE FROM OrderLineItems WHERE LineItemID = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.redirect('/orderline');
    }
    });
    });
    
module.exports = router;
