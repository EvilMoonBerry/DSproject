
// How to use Jsonwebtoken/authorization learned from Advanced Web Applications course

var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const {body, validationResult } = require("express-validator");
const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const validateToken = require("../auth/validateToken.js")
const multer = require("multer")
const storage = multer.memoryStorage();
const upload = multer({storage})
// Rendering views

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.get('/register', (req, res, next) => {
  res.render('register');
});


// Showing all users in database
router.get('/list', validateToken,(req, res, next) => {
  User.find({}).then((users) =>{
    res.render("users", {users});
  }
  ).catch((err)=>{
    return next(err);
  } )});



//Regustering a new user to the database
router.post('/register', 
  body("username").isLength({min: 3}).trim().escape(),
  body("password").isLength({min: 5}),
  (req, res, next) => {
    const errors = validationResult(req); // Validating user
    if(!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }
    User.findOne({username: req.body.username}).then((user) => {
      if(user){
        return res.status(403).json({username: "Username already in use."}); // If username is in use already send error
      } else {
        bcrypt.genSalt(10, (err, salt) => { //hash the password
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if(err) throw err;
            User.create({ // creating a new user and addidng it to the database
              username: req.body.username,
              password: hash
            }).then(()=>{
              return res.redirect("/users/login")
            }).catch((err, ok) => {
              if(err) throw err ;
            });
          });
        });
      }
    }).catch((err)=>{ //if error catch error
      console.log(err);
      throw err
  });
});


//Login in as a user
router.post('/login', 
  upload.none(),
  body("username").trim().escape(),
  body("password").escape(),
  (req, res, next) => {
    User.findOne({username: req.body.username}).then((user) =>{
    if(!user) {
      return res.status(403).json({message: "Login failed :("}); //User does not exist and login fails
    } else {
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => { // If paswords match the log in
        if(err) throw err;
        if(isMatch) {
          const jwtPayload = {
            id: user._id,
            username: user.username
          }
          jwt.sign(
            jwtPayload,
            process.env.SECRET,
            {
              expiresIn: 120 //log in token expires in 120 seconds
            },
            (err, token) => {
              res.json({success: true, token});
              return res.redirect("/users/home")
            }
          );
        }
      })
    }

    }).catch((err, ok) => {
      if(err) throw err ;})

});


module.exports = router;
