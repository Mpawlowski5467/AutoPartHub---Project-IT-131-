var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');


// ==================================================
// Route Enable Registration
// ==================================================
router.get('/register', function(req, res, next) {
	res.render('customer/addrec');
});

router.get('/login', function(req, res, next) {
	res.render('customer/login', {message: "Please Login"});
});

// ==================================================
// Route Check Login Credentials
// ==================================================
router.post('/login', function(req, res, next) {
    let query = "select ID, FirstName, LastName, Password from customers WHERE Username = '" + req.body.Username + "'"; 
    // execute query
    db.query(query, (err, result) => {
          if (err) {res.render('error');} 
          else {
              if(result[0])
                  {
                  // Username was correct. Check if password is correct
                  bcrypt.compare(req.body.Password, result[0].Password, function(err, result1) {
                      if(result1) {
                          // Password is correct. Set session variables for user.
                          var custid = result[0].ID;
                          req.session.ID = custid;
                          var custname = result[0].FirstName + " "+ result[0].LastName;
                          req.session.custname = custname;
                          res.redirect('/');
                      } else {
                          // password do not match
                          res.render('customer/login', {message: "Wrong Password"});
                      }
                  });
                  }
              else {
                res.render('customer/login', {message: "Wrong Username"});
            }
          } 
       });
  });

// ==================================================
// Route Check Login Credentials
// URL: http://localhost:3002/customer/logout
// ==================================================
router.get('/logout', function(req, res, next) {
	req.session.ID = 0;
	req.session.custname = "";
   	req.session.cart=[];
        req.session.qty=[];
	res.redirect('/');
});






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
        let insertquery = "INSERT INTO customers ( FirstName, LastName, Address1, Address2, City, State, Zip, Country, Email, PhoneNumber, Username, Password) VALUES( ?, ?, ?, ?, ?, ?,?,?,?,?,?,?)";
        

        bcrypt.genSalt(10, (err, salt) => {
		bcrypt.hash(req.body.Password, salt, (err, hash) => {
                        
                        db.query(insertquery,[req.body.FirstName, req.body.LastName, req.body.Address1, req.body.Address2, req.body.City, req.body.State, req.body.Zip, req.body.Country, req.body.Email, req.body.PhoneNumber, req.body.Username, hash],(err, result) => {
                                if (err) {
                                        console.log(err);
                                        res.render('error');
                                } else {
                                res.redirect('/customer');
                                }
                        });
                });
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
        
        db.query(updatequery,[   req.body.FirstName, req.body.LastName, req.body.Address1, req.body.Address2, req.body.City, req.body.State, req.body.Zip, req.body.Country, req.body.Email, req.body.PhoneNumber, req.body.Username, req.body.Password ],(err, result) => {if (err) {
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
