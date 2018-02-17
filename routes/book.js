var express = require('express'),
    mongoose = require('mongoose'),
    Book  = require('../models/Book.js')
var router  = express.Router();


// Get all them books
router.get('/', function(req,res,next){
  Book.find()
    .then(function(books){
      res.json(books)
    })
    .catch(function(err){
      res.send(err)
    })
});

// Add a book
router.post('/', function(req, res, next){
  Book.create(req.body)
  .then(function(newBook){
    res.status(201).json(newBook)
  })
  .catch(function(err){
    res.send(err);
  })
})
// Get a single book
router.get('/:bookId', function(req, res, next){
  Book.findById(req.params.bookId)
  .then(function(foundBook){
    res.json(foundBook)
  })
  .catch(function(err){
    res.send(err);
  })
})
// Update a book
router.put('/:bookId', function(req, res, next){
  Book.findOneAndUpdate({_id: req.params.bookId}, req.body, {new: true})
  .then(function(book){
    res.json(book)
  })
  .catch(function(err){
    res.send(err);
  })
})
// Remove a book
router.delete('/:bookId', function(req, res, next){
  Book.remove({_id: req.params.bookId})
  .then(function(){
    res.json({message: "Deleted"})
  })
  .catch(function(err){
    res.send(err);
  })
})


module.exports = router;
