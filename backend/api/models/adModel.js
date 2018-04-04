'use strict';
var mongoose = require('mongoose');
var Model = mongoose.Schema;


var AdModel = new Model({
  title: {
    type: String,
    required: 'Title missing'
  },
  text: {
    type: String,
  },
  foundOn: {
    type: Date,
    default: Date.now
  },
  price: {
    type: Number,
    required: 'Price missing'
  },
  isReported: {
    type: Boolean,
    default: false
  },
  Url: {
    type: String,
    required: 'URL missing'
  },
  imageUrl: {
    type: String,
    required: 'Image URL missing'
  },
  searchId: {
    type: String,
      required: 'Search ID missing'
  },
  originalId: {
    type: String,
    required: 'Original ID missing'
  }
});



module.exports = mongoose.model('Ads', AdModel);