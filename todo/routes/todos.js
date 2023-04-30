var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
const ToDo = require("../models/ToDo")

// render views
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/addtodo', (req, res, next) => {
  res.render('addtodo');
});

router.get('/deletetodo', (req, res, next) => {
  res.render('deletetodo');
});

//list todos in database
router.get('/home', (req, res, next) => {
  ToDo.find({}).then((todos) =>{
    res.render("todos", {todos});
  }
  ).catch((err)=>{
    return next(err);
  } )});



// Add todo to database
router.post('/addtodo/', function(req, res, next){
  ToDo.findOne({username: req.body.username}).then((user) => {
    if(user){
      return res.status(403).json({message: "this user alredy has todos :("});
    } else {
          ToDo.create({ //crate new todo 
            username: req.body.username,
            todos: req.body.todos,
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

// Delete todo from database
router.post('/deletetodo/', function(req, res, next){
  console.log(req.body.username)
  console.log(req.body.todos)
  ToDo.findOne({username: req.body.username}).then((user) => {
    if(!user){
      return res.status(403).json({message: "This user does not exist :("});
    } else {
          ToDo.deleteOne({
            username: req.body.username,
            todos: req.body.todos,
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

