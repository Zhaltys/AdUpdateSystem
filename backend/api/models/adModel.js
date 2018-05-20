
const mongoose = require('mongoose');

const Model = mongoose.Schema;


const AdModel = new Model({
  title: {
    type: String,
    required: 'Title missing',
  },
  foundOn: {
    type: Date,
    default: Date.now,
  },
  url: {
    type: String,
    required: 'URL missing',
  },
  imageUrl: {
    type: String,
    required: 'Image URL missing',
  },
  searchId: {
    type: String,
    required: 'Search ID missing',
  },
});


module.exports = mongoose.model('Ads', AdModel);
