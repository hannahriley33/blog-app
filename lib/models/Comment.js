const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  blogId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
    required: true
  },
  author: {
    type: String,
    required:true
  },
  content: {
    type: String,
    required: true
  }

});

schema.statics.topAuthors = function() {
  return this
    .aggregate([
      {
        '$group': {
          '_id': '$handle', 
          'count': {
            '$sum': 1
          }
        }
      }
    ]);
};

module.exports = mongoose.model('Comment', schema);
