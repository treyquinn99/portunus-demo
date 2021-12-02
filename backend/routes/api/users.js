// This file handles all api routes dealing with users. It utilizes the mongoose schema for User 
// created in the models folder.

const express = require('express');
const bcrypt = require("bcryptjs");
const router = express.Router();
const User = require('../../models/User');
const {validateLogin, validateNewAccount} = require('../../validation.js');
const { findOneAndUpdate } = require('../../models/User');
const JobOpportunity = require('../../models/JobOpportunity');

/**  
 * @route POST api/users/register
 * @description tests users route
 * @access Public
*/
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
/**  
 * @route POST api/users/register
 * @description tests users credentials
 * @access Public
*/
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
/**  
 * @route GET api/users/:id
 * @description request the specified email from User table
 * @access Public
*/
router.get('/:id', (req, res) => {
  const email = req.query.myparam1;
  console.log('email = ' + email);
  User.findOne({"email": email}).then(user => {
    res.json(user);
    })
    .catch(err => console.log(err));
})

/**  
 * @route PATCH api/users/updateProfile
 * @description updates user profile according to user input on edit profile screen
 * @access Public
*/

router.patch('/updateProfile/', (req, res) => {
  let update = {}
  filter = {email: req.query.email}
  if (req.query.name) {
    update.name = req.query.name
  } 
  if (req.query.collegeYear) {
    update.collegeYear = req.query.collegeYear
  }
  if (req.query.major) {
    update.major = req.query.major
  }
  User.findOneAndUpdate(filter, update).then(user => {
    res.json(user)
  })
  .catch(err => res.json(err)) 
})

/**  
 * @route PATCH api/users/follow
 * @description adds followed opportunity to the array in User table for the current user.
 * @access Public
*/

router.patch('/follow/', (req, res) => {
  const filter = { email: req.query.myparam2 }
  console.log(filter)
  console.log(req.query.myparam1)
  JobOpportunity.findOne({"companyName": req.query.myparam1}, function (err, job) {
    if (!job) {
      console.log("followOps")
      const user = User.findOne(filter).then(user => {
        if (!Array.isArray(user.followedOps)) {
          const doc = User.findOneAndUpdate(filter, {followedOps: []}).then(user => {
            let newFollowedOps = user.followedOps
            if (!newFollowedOps.includes(req.query.myparam1)) {
              newFollowedOps.push(req.query.myparam1)
            }
            const update = { followedJobs: newFollowedJobs }
            const doc = User.findOneAndUpdate(filter, update).then(res.json(update))
          })
        } else {
          let newFollowedOps = user.followedOps
          if (!newFollowedOps.includes(req.query.myparam1)) {
            newFollowedOps.push(req.query.myparam1)
          }
          const update = { followedOps: newFollowedOps }
          const doc = User.findOneAndUpdate(filter, update).then(res.json(update))
          }
        })
        .catch(err => res.json(err))
    } else if (job) {
      console.log("followJob")
      const user = User.findOne(filter).then(user => {
        if (!Array.isArray(user.followedJobs)) {
          const doc = User.findOneAndUpdate(filter, {followedJobs: []}).then(user => {
            let newFollowedJobs = user.followedJobs
            if (!newFollowedJobs.includes(req.query.myparam1)) {
              newFollowedJobs.push(req.query.myparam1)
            }
            const update = { followedJobs: newFollowedJobs }
            const doc = User.findOneAndUpdate(filter, update).then(res.json(update))
          })
        } else {
          let newFollowedJobs = user.followedJobs
          if (!newFollowedJobs.includes(req.query.myparam1)) {
            newFollowedJobs.push(req.query.myparam1)
          }
          const update = { followedJobs: newFollowedJobs }
          const doc = User.findOneAndUpdate(filter, update).then(res.json(update))
          }
        })
      .catch(err => res.json(err))
    }
  })
})

module.exports = router;