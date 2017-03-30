const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');
mongoose.Promise = require('bluebird');

//schema goes here
const User = new mongoose.Schema({
	username: String,
	hash: String,
	questions: [mongoose.Schema.Types.ObjectId],
	suggestions: [mongoose.Schema.Types.ObjectId],
	points: Number
});

const Question = new mongoose.Schema({
	text: String,
	user: mongoose.Schema.Types.ObjectId,
	suggestions: [mongoose.Schema.Types.ObjectId],
	createdAt: Date
});

const Suggestion = new mongoose.Schema({
	text: String,
	user: mongoose.Schema.Types.ObjectId,
	likes: Number,
	likers: [mongoose.Schema.Types.ObjectId],
	question: mongoose.Schema.Types.ObjectId,
	createdAt: Date
});

//plugin
User.plugin(URLSlugs('username'));
Question.plugin(URLSlugs('text'));


//register
mongoose.model('User', User);
mongoose.model('Question', Question);
mongoose.model('Suggestion', Suggestion);

mongoose.connect('mongodb://localhost/whatNow');

