const { Router } = require('express');
const Comment = require('../models/Comment');
module.exports = Router()
  .post('/', (req, res, next) => {
    Comment
      .create(req.body)
      .then(comment => res.send(comment))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Comment
      .findById(req.params.id)
      .populate('blogId')
      .then(comment => res.send(comment))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    Comment
      .findByIdAndUpdate(req.params.id, { text: req.body.text }, { new: true })
      .then(comment => res.send(comment))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Comment
      .findByIdAndDelete(req.params.id)
      .then(comment => res.send(comment))
      .catch(next);
  });
