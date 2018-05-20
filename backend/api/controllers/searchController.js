const mongoose = require('mongoose');

const Search = mongoose.model('Searches');
const AdController = require('./adController');
const helperFunctions = require('../../helperFunctions');

exports.list_all_searches = function (req, res) {
  Search.find({}, (err, object) => {
    if (err) {
      res.send(err);
    }
    res.json(object);
  });
};

exports.list_user_searches = function (req, res) {
  Search.find({ userId: req.user.ID }, (err, object) => {
    if (err) {
      res.send(err);
    }
    res.json(object);
  });
};

exports.create_search = function (req, res) {
  req.body.userId = req.user.ID;
  const newSearch = new Search(req.body);
  newSearch.save((err, object) => {
    if (err) {
      res.send(err);
    }
    helperFunctions.updateCore();
    res.json(object);
  });
};


exports.get_search = function (req, res) {
  Search.findById(req.params.searchId, (err, object) => {
    if (err) { res.send(err); }
    if (object == null) {
      res.sendStatus(404);
    }
    else res.json(object);
  });
};


exports.update_search = function (req, res) {
  Search.findOneAndUpdate(
    { _id: req.params.searchId, userId: req.user.ID },
    req.body, { new: true }, (err, object) => {
      if (err) {
        res.send(err);
      }
      res.json(object);
    }
  );
};


exports.delete_search = function (req, res) {
  Search.remove({
    _id: req.params.searchId,
    userId: req.user.ID,
  }, (err) => {
    if (err) { 
      res.send(err);
    }
    helperFunctions.updateCore();
    var adMessage = AdController.delete_search_ads(req.params.searchId);
    res.json({
      message: `${'Search successfully deleted\n'}${adMessage}` 
    });
  });
};
