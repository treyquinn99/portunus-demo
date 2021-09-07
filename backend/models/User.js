const mongoose = require('mongoose');

// Defines the schema for our users. All attributes that we want them to have should go here.

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	password: {
		type: String, 
		required: true
	},
	email: {
		type: String,
		required: true
	},
	collegeYear: {
		type: Number,
		required: true,
	},
	major: {
		type: String,
		required: true
	}
});

module.exports = User = mongoose.model('User', UserSchema);