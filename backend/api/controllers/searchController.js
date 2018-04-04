'use strict';


var mongoose = require('mongoose'),
    Search = mongoose.model('Searches');

exports.list_all_searches = function(req, res) {
    Search.find({}, function(err, object) {
        if (err)
            res.send(err);
        res.json(object);
    });
};

exports.list_user_searches = function(req, res){
    Search.find({ 'userId' : req.user.ID}, function(err, object) {
        if (err)
            res.send(err);
        res.json(object);
    });
};


exports.create_search = function(req, res) {
    req.body.userId = req.user.ID;
    var newSearch = new Search(req.body);
    newSearch.save(function(err, object) {
        if (err)
            res.send(err);
        res.json(object);
    });
};


exports.get_search = function(req, res) {
    Search.findById(req.params.searchId, function(err, object) {
        if (err)
            res.send(err);
        if (object==null)
            res.sendStatus(404);
        else res.json(object);
    });
};


exports.update_search = function(req, res) {
    Search.findOneAndUpdate({_id: req.params.searchId, userId: req.user.ID}, req.body, {new: true}, function(err, object) {
        if (err)
            res.send(err);
        res.json(object);
    });
};


exports.delete_search = function(req, res) {
    Search.remove({
        _id: req.params.searchId,
        'userId': req.user.ID
    }, function(err, object) {
        if (err)
            res.send(err);
        res.json({ message: 'Search successfully deleted' });
    });
};