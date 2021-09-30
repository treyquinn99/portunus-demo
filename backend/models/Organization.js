const mongoose = require('mongoose');

// Defines the schema for our professional Organizations.
// All attributes that we want them to have should go here.

const OrganizationSchema = new mongoose.Schema({
	orgName: {
		type: String,
		required: true
	},
	orgDescription: {
		type: String,
		required: true
	},
	jobTitle: {
		type: String,
		required: true
	},
	jobDescription: {
		type: String,
		required: true,
	}
});

module.exports = Organization = mongoose.model('Organization', OrganizationSchema);