
const helpers = require('../../helperFunctions');

const mongoose = require('mongoose');

const Ad = mongoose.model('Ads');
const Search = mongoose.model('Searches');
const User = mongoose.model('Users');


exports.list_all_ads = function (req, res) {
  Ad.find({}, (err, object) => {
    if (err) { res.send(err); }
    res.json(object);
  });
};

exports.list_user_ads = function (req, res) {
  Ad.find({ userId: req.user.ID }, (err, object) => {
    if (err) { res.send(err); }
    res.json(object);
  });
};

exports.list_search_ads = function (req, res) {
  Ad.find({ searchId: req.params.searchId }, (err, object) => {
    if (err) { res.send(err); }
    res.json(object);
  });
};

exports.create_ad = function (req, res) {
  Ad.findOne({
    searchId: req.body.searchId, url: req.body.url,
  }, (err, ad) => {
    if (err) throw err;
    if (!ad) {
      req.body.user_ID = req.user.ID;
      const newAd = new Ad(req.body);
      newAd.save((err, ad) => {
        if (err) { res.send(err); }
        Search.findById(ad.searchId, (err, search) => {
          if (err) { res.send(err); }
          if (ad == null) { res.sendStatus(404); }
          User.findById(search.userId, (err, user) => {
            helpers.sendMail(
              user.email, `New ad on <- ${search.title} ->`,
              `<h2>New ad on <b>${search.title}</b></h2>` +
              `<h3>${ad.title}</h3>` +
              `<div><a href="${ad.url}">${ad.url}</a></div>` +
              `<div ><img style="max-width: 400px;" src="${ad.imageUrl}"></div>`
            );
            res.json(ad);
          });
        });
      });
    } else {
      res.status(401).json({ message: 'Ad exists' });
    }
  });
};

exports.get_ad = function (req, res) {
  Ad.findById(req.params.adId, (err, object) => {
    if (err) { res.send(err); }
    if (object == null) { res.sendStatus(404); } else res.json(object);
  });
};

exports.update_ad = function (req, res) {
  Ad.findOneAndUpdate({ _id: req.params.adId, user_ID: req.user.ID }, req.body, { new: true }, (err, object) => {
    if (err) { res.send(err); }
    res.json(object);
  });
};

exports.delete_ad = function (req, res) {
  Ad.remove({
    _id: req.params.adId,
    user_ID: req.user.ID,
  }, (err, object) => {
    if (err) { res.send(err); }
    res.json({ message: 'Ad successfully deleted' });
  });
};

exports.delete_search_ads = function (searchId) {
  Ad.remove({
    searchId,
  }, (err, object) => {
    if (err) { return (err); }
    return ({ message: 'Ads successfully deleted' });
  });
};
