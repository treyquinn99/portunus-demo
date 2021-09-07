// This file handles all api routes dealing with users. It utilizes the mongoose schema for User 
// created in the models folder.

const express = require('express');
const router = express.Router();
const User = require('../../models/User');


// @route POST api/users/register
// @description tests users route
// @access Public
router.post('/register', (req, res) => {
  User.create(req.body)
    .then(user => res.json({ msg: 'User added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this user'}));
});




module.exports = router;