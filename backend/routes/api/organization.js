// This file handles all api routes dealing with users. It utilizes the mongoose schema for User
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

module.exports = router;