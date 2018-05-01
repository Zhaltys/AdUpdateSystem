'use strict';
var mongoose = require('mongoose');
var Model = mongoose.Schema;


var SearchModel = new Model({
  title: {
    type: String,
    required: 'Title missing'
  },
  url: {
    type: String,
    required: 'URL missing'
  },
  userId: {
    type: String,
      required: 'User ID missing'
  }
});



module.exports = mongoose.model('Searches', SearchModel);