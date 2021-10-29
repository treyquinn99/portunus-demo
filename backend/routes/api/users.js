// This file handles all api routes dealing with users. It utilizes the mongoose schema for User 
// created in the models folder.

const express = require('express');
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require('../../models/User');
const {validateLogin, validateNewAccount} = require('../../validation.js');

// @route POST api/users/register
// @description tests users route
// @access Public
router.post('/register', (req, res) => {
// call helper function to see if account info is valid 
  console.log(req.body);
  const {errors, isValid} = validateNewAccount(req.body);
  
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // if the inputs are valid, check to make sure the user doesn't already exist.
  // else, add it to the database
  User.findOne({email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({email: "Email already exists"});
    } else {
      // salt the password before adding it to the database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) {
            throw err;
          }
          // add the user to the database with the hashed password
          User.create({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            collegeYear: req.body.collegeYear,
            major: req.body.major
          })
          .then(user => res.json({ msg: 'User added successfully' }))
          .catch(err => res.status(400).json({ error: err}));
        });
      });
    }
  });
});

router.post('/login', (req, res) => {
  // call helper function to see if login info is valid
  const { errors, isValid } = validateLogin(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // check if user exists
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ userNotFound: "User does not exist with this email address"});
    }
    // check if passwords match
    bcrypt.compare(password, user.password).then(match => {
      if (match) {
        return res.json({name: user.name, collegeYear: user.collegeYear, major: user.major});
      } else {
        return res.status(400).json({invalidPassword: "Incorrect Password"});
      }
    })
  });
}) 

router.get('/:id', (req, res) => {
  const email = req.query.myparam1;
  console.log('email = ' + email);
  User.findOne({"email": email}).then(user => {
    res.json(user);
    })
    .catch(err => console.log(err));
})

module.exports = router;