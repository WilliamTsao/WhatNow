const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');
mongoose.Promise = require('bluebird');

//schema goes here
const User = new mongoose.Schema({
	username: String,
	password: String,
	pic: String
});

const Question = new mongoose.Schema({
	text: String,
	category: String,
	user: {
		name: String,
		pic: String
	},
	suggestions: [],
	createdAt: Date
});

const Suggestion = new mongoose.Schema({
	text: String,
	user: {
		name: String,
		pic: String
	},
	likes: Number,
	likers: [String],
	question: mongoose.Schema.Types.ObjectId,
	createdAt: Date
});

//plugin
User.plugin(URLSlugs('_id'));
Question.plugin(URLSlugs('_id'));


//register
mongoose.model('User', User);
mongoose.model('Question', Question);
mongoose.model('Suggestion', Suggestion);

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/whatNow');

