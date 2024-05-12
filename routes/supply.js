var express = require('express');
var router = express.Router();
// ==================================================
// Route to list all records. Display view to list all records
// URL: http://localhost:3026/Supply_IDInfo/
// ==================================================
router.get('/', function(req, res, next) {
let query = "SELECT Supplier_ID, CompanyName, ContactName, City, Country, PhoneNumber FROM supplierinformation";
// execute query


db.query(query, (err, result) => {
        if (err) {
        console.log(err);
        res.render('error');
        }
res.render('supply/allrecords', {allrecs: result });
        });
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
    let query = "SELECT Supplier_ID, CompanyName, ContactName, City, Country, PhoneNumber FROM supplierinformation WHERE Supplier_ID = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.render('supply/onerec', {onerec: result[0] });
    }
    });
    });

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function(req, res, next) {
    res.render('supply/addrec');
    });


    // ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {
    let insertquery = "INSERT INTO supplierinformation ( Supplier_ID, CompanyName, ContactName, City, Country, PhoneNumber) VALUES(?, ?, ?, ?, ?, ?)";
    
    db.query(insertquery,[req.body.Supplier_ID, req.body.CompanyName, req.body.ContactName, req.body.City, req.body.Country, req.body.Phonenumber],(err, result) => {
                    if (err) {
                                    console.log(err);
                                    res.render('error');
                            } else {
                            res.redirect('/supply');
                                    }
                    });
            });

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
    let query = "SELECT Supplier_ID, CompanyName, ContactName, City, Country, PhoneNumber FROM supplierinformation WHERE Supplier_ID = " + req.params.recordid;
    // execute query
            db.query(query, (err, result) => {
                    if (err) {
                    console.log(err);
                     res.render('error');
                    } else {
            res.render('supply/editrec', {onerec: result[0] });
                    }
            });
    });


// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
    let updatequery = "UPDATE supplierinformation SET Supplier_ID = ?, CompanyName = ?,  ContactName= ?,City = ?, Country = ?, Phonenumber= ? WHERE Supplier_ID = " + req.body.Supplier_ID;
    
    db.query(updatequery,[req.body.Supplier_ID, req.body.CompanyName, req.body.ContactName, req.body.City, req.body.Country, req.body.Phonenumber ],(err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.redirect('/supply');
    }
});
});


// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
    let query = "DELETE FROM supplierinformation WHERE Supplier_ID = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.redirect('/supply');
    }
    });
    });

    
module.exports = router;
