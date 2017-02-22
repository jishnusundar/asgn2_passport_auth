var express = require('express');
var router = express.Router();




/* GET projects page. */
router.get('/projects', (req, res, next) => {
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