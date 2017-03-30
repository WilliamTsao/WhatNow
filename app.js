//app.js

const express = require('express');
const app = express();

// Use __dirname to construct absolute paths for:
// 1. express-static
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// 2. hbs views
// hbs setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));


require('./db');
const mongoose = require('mongoose');

app.get('/', (req,res)=>{

});

app.post('/', (req,res)=>{

	res.redirect('/');
});

app.get('/search', (req,res)=>{
	//query string s = "searched word"
});



app.listen(3000);