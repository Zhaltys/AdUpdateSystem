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
    default: ""
  },
  foundOn: {
    type: Date,
    default: Date.now
  },
  price: {
    type: Number,
    default: -1
  },
  isReported: {
    type: Boolean,
    default: false
  },
  url: {
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
  }
});



module.exports = mongoose.model('Ads', AdModel);