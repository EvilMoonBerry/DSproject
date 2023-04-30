var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const Event = require("../models/Event")

//Render views
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/addevent', (req, res, next) => {
  res.render('addevent');
});

router.get('/deleteevent', (req, res, next) => {
  res.render('deleteevent');
});

//Show all the events in database
router.get('/calendar', (req, res, next) => {
  Event.find({}).then((events) =>{
    res.render("events", {events});
  }
  ).catch((err)=>{
    return next(err);
  } )});



// Add event to calendar database
router.post('/addevent/', function(req, res, next){
  Event.findOne({username: req.body.username}).then((user) => {
    if(user){
      return res.status(403).json({message: "this user alredy has calendar event :("});
    } else {
          Event.create({
            username: req.body.username,
            event: req.body.event,
            date: req.body.date,
            disc: req.body.disc,
          }).then(()=>{
            res.json( {text: "ok"})
            
          }).catch((err, ok) => {
            if(err) throw err ;
          });
}})
    .catch((err)=>{
    console.log(err);
    throw err
})
});


//Delete event from database
router.post('/deleteevent/', function(req, res, next){
  console.log(req.body.username)
  console.log(req.body.todos)
  Event.findOne({username: req.body.username}).then((user) => {
    if(!user){
      return res.status(403).json({message: "This user does not exist :("});
    } else {
          Event.deleteOne({
            username: req.body.username,
          }).then(()=>{
            res.json( {text: "ok"})
            
          }).catch((err, ok) => {
            if(err) throw err ;
          });
}})
    .catch((err)=>{
    console.log(err);
    throw err
})
});


module.exports = router;

