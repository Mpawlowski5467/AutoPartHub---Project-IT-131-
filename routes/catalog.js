var express = require('express');
var router = express.Router();
// ==================================================
// Route to list all products on the catalog
// ==================================================
router.get('/', function(req, res, next) {
let query = "SELECT Product_ID, Supplier_ID, Productname , ItemSold , RetailPrice , Packaging , IsDiscontinued FROM ProductInfo";
// execute query
db.query(query, (err, result) => {
if (err) {
res.redirect('/');
}
res.render('catalog', {allrecs: result });
});
});


// ==================================================
// Route to add an item to the cart
// ==================================================
router.post('/add', function(req, res, next) {
    if (typeof req.session.cart !== 'undefined' && req.session.cart ) {
        if (req.session.cart.includes(req.body.Product_ID))
            {
            // Item Exists in Basket - Increase Quantity
            var n = req.session.cart.indexOf(req.body.Product_ID);
            req.session.qty[n] = parseInt(req.session.qty[n]) + parseInt(req.body.qty);
            }
        else
            {
            // Item Being Added First Time
            req.session.cart.push(req.body.Product_ID);
            req.session.qty.push(req.body.qty);
            }
    } else {
        var cart = [];
        cart.push(req.body.Product_ID);
        req.session.cart = cart;
        var qty = [];
        qty.push(req.body.qty);
        req.session.qty = qty;
    }
    res.redirect('/catalog/cart');
});

// ==================================================
// Route to show shopping cart
// ==================================================
router.get('/cart', function(req, res, next) {
    if (!Array.isArray(req.session.cart) || !req.session.cart.length){
    res.render('cart', {cartitems: 0 });
    } else {

        
    let query = "SELECT Product_ID, Supplier_ID, Productname , ItemSold , RetailPrice , Packaging , IsDiscontinued FROM ProductInfo WHERE Product_ID IN (" + req.session.cart + ") order by find_in_set(Product_ID, '" + req.session.cart + "');";
    // execute query
    db.query(query, (err, result) => {
        if (err) {
            console.log(err);
            res.render('error');
        } else{
            res.render('cart', {cartitems: result, qtys: req.session.qty });
        }
    });
    }
 });

module.exports = router;