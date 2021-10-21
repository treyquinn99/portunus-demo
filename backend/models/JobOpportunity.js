const mongoose = require('mongoose');

// Defines the schema for our Job Opportunities.
// All attributes that we want them to have should go here.

const JobOpportunitySchema = new mongoose.Schema({
	companyName: {
		type: String,
		required: true
	},
	companyDescription: {
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

module.exports = JobOpportunity = mongoose.model('JobOpportunity', JobOpportunitySchema);