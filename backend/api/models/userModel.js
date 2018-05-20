
let mongoose = require('mongoose'),
  bcrypt = require('bcrypt');

const Model = mongoose.Schema;

const UserModel = new Model({
  username: {
    type: String,
    required: 'Username missing',
  },
  email: {
    type: String,
    required: 'Email missing',
  },
  passwordHash: {
    type: String,
    required: 'Password missing',
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
});

UserModel.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

module.exports = mongoose.model('Users', UserModel);
