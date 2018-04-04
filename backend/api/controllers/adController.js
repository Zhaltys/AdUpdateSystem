'use strict';


var mongoose = require('mongoose'),
    Ad = mongoose.model('Ads');

exports.list_all_ads = function(req, res) {
    Ad.find({}, function(err, object) {
        if (err)
            res.send(err);
        res.json(object);
    });
};

exports.list_user_ads = function(req, res){
    console.log(req.user);
    Ad.find({ 'userId' : req.user.ID}, function(err, object) {
        if (err)
            res.send(err);
        res.json(object);
    });
};


exports.create_ad = function(req, res) {
    req.body.user_ID = req.user.ID;
    var new_ad = new Ad(req.body);
    new_ad.save(function(err, object) {
        if (err)
            res.send(err);
        res.json(object);
    });
};


exports.get_ad = function(req, res) {
    Ad.findById(req.params.adId, function(err, object) {
        if (err)
            res.send(err);
        if (object==null)
            res.sendStatus(404);
        else res.json(object);
    });
};


exports.update_ad = function(req, res) {
    Ad.findOneAndUpdate({_id: req.params.adId, user_ID: req.user.ID}, req.body, {new: true}, function(err, object) {
        if (err)
            res.send(err);
        res.json(object);
    });
};


exports.delete_ad = function(req, res) {
    console.log(req.user.ID);
    Ad.remove({
        _id: req.params.adId,
        'user_ID': req.user.ID
    }, function(err, object) {
        if (err)
            res.send(err);
        res.json({ message: 'Ad successfully deleted' });
    });
};