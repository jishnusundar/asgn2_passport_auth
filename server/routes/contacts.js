//modules for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//define the user models
let UserModel = require('../models/users')
let User = UserModel.User;

//define the contacts model
let contact = require('../models/contacts');

//function to check if the user is authenticated
function requireAuth(req,res,next) {
  //check if the user is logged index
  if(!req.isAuthenticated()) {
    return res.redirect('/login');
  }
    next();
}

/* GET contacts List page. READ */
router.get('/',(req, res, next) => {
  // find all contacts in the  collection
   contact.find( (err, contacts) => {
    if (err) {
      return console.error(err);
    }
    else {
   
        res.render('contacts/index', {
        title: 'Business Contacts',
        contacts: contacts,
        displayName : req.user ? req.user.displayName : ''
      });
    }
  }).sort({name:1});

});

module.exports = router;