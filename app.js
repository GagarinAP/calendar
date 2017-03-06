var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var JSON = require('./front/json/todo.json');
var mongoose = require('mongoose');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//MongoBD Database
///////////////////////////////////////////////
mongoose.connect('mongodb://localhost/Orders');

var OrdersSchema = new mongoose.Schema({
  name: String,
  street: String,
  city: String,
  state: String,
  zip: String,
  country: String,
  giftwrap: Boolean,
  products: Array,
});

var Orders = mongoose.model('Orders', OrdersSchema);

mongoose.connect('mongodb://localhost/Products');

var ProductsSchema = new mongoose.Schema({
  name: String,
  description: String,
  category: String,
  price: Number,
});

var Products = mongoose.model('Products', ProductsSchema);


app.get('/allproducts', function(req,res){		
	Products.find(function (err, products) {
	    if (err) {
	    	console.log(err);
	    }
	    res.json(products);
	});
});

app.post('/allproducts', function(req,res){
	console.log(req.body);		
	Products.create(req.body, function (err, product) {
	    if (err) {
	    	console.log(err);
	    }
	    res.json(product);
	});
});

app.post('/orders', function(req,res){	
	console.log(req.body);
	Orders.create(req.body, function (err, item) {
	    if (err) return next(err);
	    res.json(item);
	});
});

app.listen(3000, function(){
	console.log('Server run in 3000 port!');
});