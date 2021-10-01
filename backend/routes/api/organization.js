// This file handles all api routes dealing with users. It utilizes the mongoose schema for User
// created in the models folder.

const express = require('express');
const router = express.Router();
const Organization = require('../../models/Organization');
const {validateLogin, validateNewAccount} = require('../../validation.js');

router.get('/:id', (req, res) => {
  const orgName = req.query.myparam1;
  User.findOne({"orgName": orgName}).then(user => {
    res.json(user);
    })
    .catch(err => console.log(err));
})

module.exports = router;