var express = require('express');
var router = express.Router();
// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:3026/ProductInfo/
// ==================================================
router.get('/', function(req, res, next) {
let query = "SELECT ID, FirstName, LastName, Address1, Address2, City, State, Zip, Country, Email, PhoneNumber, Username, Password  FROM customers";
// execute query


db.query(query, (err, result) => {
        if (err) {
        console.log(err);
        res.render('error');
        }
res.render('customer/allrecords', {allrecs: result });
        });
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
        let query = "SELECT ID, FirstName, LastName, Address1, Address2, City, State, Zip, Country, Email, PhoneNumber, Username, Password  FROM customers WHERE ID = " + req.params.recordid;
        // execute query
        db.query(query, (err, result) => {
        if (err) {
        console.log(err);
        res.render('error');
        } else {
        res.render('customer/onerec', {onerec: result[0] });
        }
        });
        });



// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function(req, res, next) {
        res.render('customer/addrec');
        });


// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {
        let insertquery = "INSERT INTO customers ( ID, FirstName, LastName, Address1, Address2, City, State, Zip, Country, Email, PhoneNumber, Username, Password) VALUES(?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?)";
        
        db.query(insertquery,[req.body.ID ,req.body.FirstName, req.body.LastName, req.body.Address1, req.body.Address2, req.body.City, req.body.State, req.body.Zip, req.body.Country, req.body.Email, req.body.PhoneNumber, req.body.Username, req.body.Password],(err, result) => {
                        if (err) {
                                        console.log(err);
                                        res.render('error');
                                } else {
                                res.redirect('/customer');
                                        }
                        });
                });




// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
        let query = "SELECT ID, FirstName, LastName, Address1, Address2, City, State, Zip, Country, Email, PhoneNumber, Username, Password  FROM customers WHERE ID = " + req.params.recordid;
        // execute query
                db.query(query, (err, result) => {
                        if (err) {
                        console.log(err);
                         res.render('error');
                        } else {
                res.render('customer/editrec', {onerec: result[0] });
                        }
                });
        });
        

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
        let updatequery = "UPDATE customers SET  FirstName = ?,  LastName= ?,Address1 = ?, Address2 = ?, City = ?,State= ?,Zip= ?,Country= ?,Email= ?,PhoneNumber= ?,Username= ?,Password=? WHERE ID = " + req.body.ID;
        
        db.query(updatequery,[   req.body.FirstName, req.body.LastName, req.body.Address1, req.body.Address2, req.body.City, req.body.State, req.body.Zip, req.body.Email, req.body.PhoneNumber, req.body.Username, req.body.Password ],(err, result) => {if (err) {
        console.log(err);
        res.render('error');
        } else {
        res.redirect('/customer');
        }
 });
});


// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
        let query = "DELETE FROM customers WHERE ID = " + req.params.recordid;
        // execute query
        db.query(query, (err, result) => {
        if (err) {
        console.log(err);
        res.render('error');
        } else {
        res.redirect('/customer');
        }
        });
        });




module.exports = router;
