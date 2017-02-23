//modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

//define the user model
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

/** ------------------------------- Routing for login -------------------------------*/


/* GET /Login - render the login view*/
router.get('/login',(req, res, next) => {
  // check to see  if the user is not already logged index
  if(!req.user) {
    // render the login page
    res.render('auth/login', {
      title: 'Login',
      //games: '',
      messages: req.flash('loginMessage'),
      //displayName: req.user ? req.user.displayName : ''
    });
    return;
  } else {
    return res.redirect('/'); // redirect to the contacts list
  }
});

/** ------------------------------- Routing for registration -------------------------------*/

// GET /register - render the register page
router.get('/register',(req,res,next) => {
//check if the user is not already logged in 
if(!req.user) {
  //render the registration page
  res.render('auth/register', {
    title: 'Register',
  //games: '',
  messages: req.flash('registerMessage'),
  //displayName : req.user ? req.user.displayName : ''
});
}
});

/** ------------------------------- Routing for the 5 main pages -------------------------------*/

/* GET projects page. */
router.get('/projects', requireAuth,(req, res, next) => {
  res.render('projects', { title: 'Projects'});
});

/* GET services page. */
router.get('/services', (req, res, next) => {
  res.render('services', { title: 'Services' });
});

/* GET about page. */
router.get('/about', (req, res, next) => {
  res.render('about', { title: 'Who am I?' });
});

/* GET contact page. */
router.get('/contact', (req, res, next) => {
  res.render('contact', { title: 'Reach Me' });
});

/* GET home page. */
router.get('/', (req, res, next) => {
  let currentDate = new Date();
  res.render('home', { 
    title: 'Hi there!'  , mainContent: 'My name is Jishnu and i\'ve been studying Software Engineering Technology for the last 2 years @ Centennial College. This website is my simple portfolio where most of my accomplishments and interests are posted. Check in to see!'
  });
});



module.exports = router;