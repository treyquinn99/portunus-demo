// This file handles all api routes dealing with professional organizations. It utilizes the mongoose schema for User
// created in the models folder.

const express = require('express');
const router = express.Router();
const Organization = require('../../models/Organization');

router.get('/:id', (req, res) => {
  const orgName = req.query.myparam1;
  Organization.findOne({"orgName": orgName}).then(org => {
    res.json(org);
    })
    .catch(err => console.log(err));
})

router.get('/', function(req, res) {
  Organization.find({}, function(err, orgs) {
    let orgMap = {};

    orgs.forEach(function(org) {
      orgMap[org._id] = org;
    });
    
    res.send(orgMap);  
  });
})

module.exports = router;