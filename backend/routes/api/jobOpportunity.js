// This file handles all api routes dealing with job opportunities. It utilizes the mongoose schema for User
// created in the models folder.

const express = require('express');
const router = express.Router();
const JobOpportunity = require('../../models/JobOpportunity');

/**
 * @route GET api/JobOpportunity/:id
 * @description request the specified job opportunity id from the JobOpportunity table
 * @access Public
 */
router.get('/:id', (req, res) => {
  const companyName = req.query.myparam1;
  JobOpportunity.findOne({"companyName": companyName}).then(company => {
    res.json(company);
    })
    .catch(err => console.log(err));
})
/**
 * @route GET api/JobOpportunity/
 * @description request job opportunity from the JobOpportunity table
 * @access Public
 */
router.get('/', function(req, res) {
  JobOpportunity.find({}, function(err, jobs) {
    let jobMap = {};

    jobs.forEach(function(job) {
      jobMap[job._id] = job;
    });
    
    res.send(jobMap);  
  });
})

module.exports = router;