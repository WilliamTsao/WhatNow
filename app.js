//app.js

const express = require('express');
const app = express();


const port = process.env.PORT || 3000;
// Use __dirname to construct absolute paths for:
// 1. express-static
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// 2. hbs views
// hbs setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
const hbs = require('hbs');
const HandlebarsIntl = require('handlebars-intl');
HandlebarsIntl.registerWith(hbs);

hbs.registerHelper('ifIn', function(list, currentUser, options) {
	if(list.includes(currentUser)){
		return options.fn(this);
	}
});

//body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

//session handling
const session = require('express-session');
const sessionOptions = {
	secret: 'secret cookie thang',
	saveUninitialized: false, 
	resave: false, 
};
app.use(session(sessionOptions));

//db setup
require('./db');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = mongoose.model('User');
const Question = mongoose.model('Question');
const Suggestion = mongoose.model('Suggestion');




app.get('/', (req,res)=>{
	// Require Login/Signup
	if(!req.session.hasOwnProperty('username')){
		res.redirect('/register');
	}
	else{
		// If category is selected, display only that category
		if(req.query.category){
			getByCategory(req, res);
		}

		// Else Display all ordered by time
		else{
			const findAllQs = new Promise(function(fulfill, reject) {
				Question.find((err, result)=>{
					if(!err){
						// order by time
						result = result.reverse('createdAt');				
						result.forEach((ele)=>{
							// find all the suggestions for each question
							Suggestion.find({question:ele._id}, (err, sugs)=>{
								if(sugs.length != 0){
									ele.suggestions = sugs.sort(function(a, b) {return b.likes - a.likes; });
								}
							});
							// find profile picture for each question
							User.findOne({username: ele.user.name}, (err, poster)=>{
								ele.user.pic = poster.pic;
							});
						});
						fulfill(result);
					}else{
						console.log(err);
						res.send(err);
					}
					reject(err);
				});
			});
		
			findAllQs.then((result)=>{
				if(req.session.hasOwnProperty('username')){
					User.findOne({username: req.session.username}, (err, u) => {
						if(!err) {
							let top = result.slice(0);
							top = top.sort(function(a, b) {return b.suggestions.length - a.suggestions.length;}).slice(0, 3);
							const yours = result.filter(function(ele) {
								return ele.user.name === req.session.username;
							});
							res.render('index', {user: u, question: result, top:top, yours:yours});
						}
						else console.log(err);
					});
				}else{
					res.redirect('/register');	
				}
			}, console.log);
		}
	}		
});

app.post('/', (req,res)=>{
	if(req.session.hasOwnProperty('username')){
		new Question({
			text: req.body.verb + " " + req.body.text,
			category: req.body.category,
			user: {name: req.session.username, pic: ""},
			suggestions: [],
			createdAt: new Date()
		}).save();

		res.redirect('/');
		
	}else{
		res.redirect('/register');
	}
});

app.post('/like', (req, res)=>{
	Suggestion.findOneAndUpdate(
		{_id: req.body.id},
		{$inc: {likes: 1}, $push: {likers: req.session.username}},
		{new: true},
		function(err, doc){
			if(err){
				console.log("Something wrong when updating data!");
			}
		}
	);
	res.send();
});

app.post('/unlike', (req, res)=>{
	Suggestion.findOneAndUpdate(
		{_id: req.body.id},
		{$inc: {likes: -1}, $pull: {likers: req.session.username}},
		{new: true},
		function(err, doc){
			if(err){
				console.log("Something wrong when updating data!");
			}
		}
	);
	res.send();
});

app.get('/search', (req,res)=>{
	const findAllQs = new Promise(function(fulfill, reject) {
		Question.find((err, result)=>{
			if(!err){
				// order by time
				result = result.reverse('createdAt');				
				result.forEach((ele)=>{
					// find all the suggestions for each question
					Suggestion.find({question:ele._id}, (err, sugs)=>{
						if(sugs.length != 0){
							ele.suggestions = sugs.sort(function(a, b) {return b.likes - a.likes; });
						}
					});
					// find profile picture for each question
					User.findOne({username: ele.user.name}, (err, poster)=>{
						ele.user.pic = poster.pic;
					});
				});
				fulfill(result);
			}else{
				console.log(err);
				res.send(err);
			}
			reject(err);
		});
	});
	findAllQs.then((result)=>{
		if(req.session.hasOwnProperty('username')){
			User.findOne({username: req.session.username}, (err, u) => {
				if(!err) {
					let top = result.slice(0);
					top = top.sort(function(a, b) {return b.suggestions.length - a.suggestions.length;}).slice(0, 3);
					const yours = result.filter(function(ele) {
						return ele.user.name === req.session.username;
					});
					res.render('index', {user: u, question: result.filter((ele)=>{return ele.text.toLowerCase().includes(req.query.s.toLowerCase())}), top:top, yours:yours});
				}
				else console.log(err);
			});
		}else{
			res.redirect('/register');	
		}
	}, console.log);
});

app.get('/post/:slug', (req, res)=>{
	// Require Login/Signup
	if(!req.session.hasOwnProperty('username')){
		res.redirect('/register');
	}
	else{
		// If category is selected, display only that category
		if(req.query.category){
			getByCategory(req, res);
		}

		// Else Display all ordered by time
		else{
			const findAllQs = new Promise(function(fulfill, reject) {
				Question.find((err, result)=>{
					if(!err){
						// order by time
						result = result.reverse('createdAt');				
						result.forEach((ele)=>{
							// find all the suggestions for each question
							Suggestion.find({question:ele._id}, (err, sugs)=>{
								if(sugs.length != 0){
									ele.suggestions = sugs.sort(function(a, b) {return b.likes - a.likes; });
								}
							});
							// find profile picture for each question
							User.findOne({username: ele.user.name}, (err, poster)=>{
								ele.user.pic = poster.pic;
							});
						});
						fulfill(result);
					}else{
						console.log(err);
						res.send(err);
					}
					reject(err);
				});
			});
		
			findAllQs.then((result)=>{
				if(req.session.hasOwnProperty('username')){
					User.findOne({username: req.session.username}, (err, u) => {
						if(!err) {
							let top = result.slice(0);
							top = top.sort(function(a, b) {return b.suggestions.length - a.suggestions.length;}).slice(0, 3);
							const yours = result.filter(function(ele) {
								return ele.user.name === req.session.username;
							});
							res.render('index', {user: u, question: result.filter((ele)=>{return ele.slug === req.params.slug}), top:top, yours:yours});
						}
						else console.log(err);
					});
				}else{
					res.redirect('/register');	
				}
			}, console.log);
		}
	}		
});

app.post('/comment', (req,res)=>{
	if(req.session.hasOwnProperty('username')){
		User.findOne({username: req.session.username}, (err, user)=>{
			new Suggestion({
				text: req.body.text,
				user: {name: user.username, pic: user.pic},		
				likes: 0,
				likers: [],
				question: req.body.q,
				createdAt: new Date()
			}).save((err, newSuggestion)=>{
				res.send({username: newSuggestion.user.name, pic: newSuggestion.user.pic, text: newSuggestion.text, id: newSuggestion.id, status: 200});
			});	
		});

		
	}else{
		res.send({status: 300, location: '/register'});
	}
	
});

/*
app.get('/me', (req,res)=>{
	if(!req.session.hasOwnProperty('username')){
		res.redirect('/register');
	}else{
		User.findOne({username: req.session.username}, (err, u) => {
			if(!err) {
				res.render('user', {user: u});
			}
			else console.log(err);
		});
	}
});

*/
// Auth stuff
app.get('/register', (req, res)=>{
	res.render('register');
});

app.post('/register', (req,res)=>{
	if(req.body.username.length === 0){
		//validate username length
		res.render('register', {err: 'Username cannot be empty'});
	}
	else if(req.body.password.length < 8){
		//validate password length
		res.render('register', {err: 'Password too short: At least 8 characters long'});
	}else{
		User.findOne({username: req.body.username}, (err, result) => {
			if(err){
				console.log(err);
				res.send('Error! Check server!');
			}
			else if(result){
				//validate username uniqueness
				res.render('register', {err: 'Username already taken / User already exists'});
			}
			else{
				//ok to register
				bcrypt.hash(req.body.password, 10, function(err, hash) {
					if(err){
						console.log(err);
						res.send(err);
					}else{
						new User({
							username: req.body.username,
							password: hash,
							point: 0,
							pic: "default_avatar.png",
							questions: [],
							suggestions: []
						}).save().then((user)=>{
							req.session.regenerate((err) => {
								if (!err) {
									req.session.username = user.username; 
									res.redirect('/');
								}
								else{
									console.log(err); 
									res.send(err);
								}
							});
						});
					}
				});
			}
		});
	}
});

app.post('/login', (req,res)=>{
	if(req.body.username.length === 0){
		res.render('register', {err: 'Username cannot be empty'});
	}
	else if(req.body.password.length === 0){
		res.render('register', {err: 'Password cannot be empty'});
	}else{
		User.findOne({username: req.body.username}, (err, result) => {
			if(err){
				console.log(err);
				res.send('Error! Check server!');
			}
			else if(result){
				bcrypt.compare(req.body.password, result.password, (err, passwordMatch) => {
					// regenerate session if passwordMatch is true
					if(passwordMatch){
						//success
						req.session.regenerate((err) => {
							if (!err) {
								req.session.username = result.username; 
								res.redirect('/');
							}
							else{
								console.log('error'); 
								res.send('an error occurred, please see the server logs for more information');
							}
						});
					}
					else{
						//failed
						res.render('register', {err: 'Login failed, password not correct'});
					}
				});
			}
			else{
				//login failed, username not found
				res.render('register', {err: 'Login failed, username not found'});
			}
		});
	}
});

app.get('/logout', (req,res)=>{
	req.session.destroy((err)=>{
		if(!err){
			res.redirect('/');
		}else{
			console.log(err);
			res.send(err);
		}
	});
});
// End of Auth


function getByCategory(req, res){
	const findAllQs = new Promise(function(fulfill, reject) {
		Question.find({category: req.query.category}, (err, result)=>{
			if(!err){
				// order by time
				result = result.reverse('createdAt');				
				result.forEach((ele)=>{
					// find all the suggestions for each question
					Suggestion.find({question:ele._id}, (err, sugs)=>{
						if(sugs.length != 0){
							ele.suggestions = sugs.sort('likes');
						}
					});
					// find profile picture for each question
					User.findOne({username: ele.user.name}, (err, poster)=>{
						ele.user.pic = poster.pic;
					});
				});

				fulfill(result);
			}else{
				console.log(err);
				res.send(err);
			}

			reject(err);
		});
	});

	findAllQs.then((result)=>{
		if(req.session.hasOwnProperty('username')){
			User.findOne({username: req.session.username}, (err, u) => {
				const colors = {'relationship': '#FF4136', 'travel': '#31bc40', 'food': '#B10DC9', 'sports': '#FF851B', 'technology': '#39CCCC', 'career': '#F012BE'};
				if(!err) {
					let top = result.slice(0);
					top = top.sort(function(a, b) {return b.suggestions.length - a.suggestions.length;}).slice(0, 3);
					const yours = result.filter(function(ele) {
						return ele.user.name === req.session.username;
					});
					res.render('index', {user: u, question: result, color: colors[req.query.category], top:top, yours:yours});
				}
				else console.log(err);
			});
		}else{
			res.redirect('/register');	
		}
	}, console.log);

}

app.listen(port);