'use strict';
var mongoose = require('mongoose'),
bcrypt = require('bcrypt');
var Model = mongoose.Schema;

var UserModel = new Model({
    email: {
        type: String,
        required: 'Email missing'
    },
    passwordHash: {
        type: String,
        required: 'Password missing'
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
});

UserModel.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.passwordHash);
};

module.exports = mongoose.model('Users', UserModel);