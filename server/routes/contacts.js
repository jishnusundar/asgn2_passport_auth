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

//  GET the Contact Details page in order to add a new Contact
router.get('/add', (req, res, next) => {
  res.render('contacts/details', {
    title: "Add a new Contact",
    contacts:'',
  displayName : req.user ? req.user.displayName : ''
  });
});

// POST process the Contact Details page and create a new Contact - CREATE
router.post('/add', (req, res, next) => {

    let newContact = contact({
      "name": req.body.name,
      "number": req.body.number,
      "email": req.body.email
    });

    contact.create(newContact, (err, contact) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        res.redirect('/contacts');
      }
    });
});


// GET the Contact Details page in order to edit a Contact
router.get('/:id',(req, res, next) => {

    try {
      // get a reference to the id from the url
      let id = mongoose.Types.ObjectId.createFromHexString(req.params.id);

        // find one contact by its id
      contact.findById(id, (err, contacts) => {
        if(err) {
          console.log(err);
          res.end(error);
        } else {
          // show the contact details view
          res.render('contacts/details', {
              title: 'Contact Details',
              contacts: contacts,
  displayName : req.user ? req.user.displayName : ''
          });
        }
      });

    } catch (err) {
      console.log(err);
      res.redirect('/errors/404');
    }
});

// POST - process the information passed from the details form and update the document
router.post('/:id',(req, res, next) => {
  // get a reference to the id from the url
    let id = req.params.id;

     let updatedContact = contact({
       "_id": id,
      "name": req.body.name,
      "number": req.body.number,
      "email": req.body.email
    });

    contact.update({_id: id}, updatedContact, (err) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        // refresh the Contacts List
        res.redirect('/contacts');
      }
    });

});

// GET - process the delete by Contact id
router.get('/delete/:id',(req, res, next) => {
  // get a reference to the id from the url
    let id = req.params.id;

    contact.remove({_id: id}, (err) => {
      if(err) {
        console.log(err);
        res.end(err);
      } else {
        // refresh the contacts list
        res.redirect('/contacts');
      }
    });
});


module.exports = router;