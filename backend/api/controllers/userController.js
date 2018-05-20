

let mongoose = require('mongoose'),
  User = mongoose.model('Users'),
  bcrypt = require('bcrypt'),
  jwt = require('jsonwebtoken');

exports.list_all_users = function (req, res) {
  User.find({}, (err, object) => {
    if (err) { res.send(err); }
    res.json(object);
  });
};


exports.register = function (req, res) {
  User.find({ username: req.body.username }, (err, user) => {
    if (err) {
      return res.status(500).send({
        message: err,
      });
    }

    if (user.length > 0) {
      return res.status(409).send({
        message: 'User with this username already exists',
      });
    }

    const newUser = new User(req.body);
    newUser.passwordHash = bcrypt.hashSync(req.body.password, 10);
    newUser.save((err, user) => {
      if (err) {
        return res.status(400).send({
          message: err,
        });
      }
      user.passwordHash = undefined;
      return res.json(user);
    });
  });
};

exports.sign_in = function (req, res) {
  User.findOne({
    username: req.body.username,
  }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.status(401).json({ message: 'Authentication failed. User not found.' });
    } else if (user) {
      if (!user.comparePassword(req.body.password)) {
        res.status(401).json({ message: 'Authentication failed. Wrong password.' });
      } else {
        return res.json({
          token: jwt.sign(
            { ID: user._id, username: user.username },
            'LukasSearchPrototype',
            { expiresIn: 60 * 60 }
          ),
          user: { username: user.username, email: user.email, _id: user._id },
        });
      }
    }
  });
};

exports.loginRequired = function (req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
};


exports.create_user = function (req, res) {
  const new_user = new User(req.body);
  new_user.save((err, object) => {
    if (err) { res.send(err); }
    res.json(object);
  });
};


exports.get_user = function (req, res) {
  User.findById(req.params.userId, (err, object) => {
    if (err) { res.send(err); }
    if (object == null) { res.sendStatus(404); } else { res.json(object); }
  });
};

exports.update_user = function (req, res) {
  User.findOne({ username: req.body.username }, (err, object) => {
    if (err) { res.send(err); }
    if (object != null && object._id != req.body._id) {
      res.status(409).json({ message: 'User with this username already exists!' });
      return;
    }

    User.findOne({ email: req.body.email }, (err, object) => {
      if (err) { res.send(err); }
      if (object != null && object._id != req.body._id) {
        res.status(409).json({ message: 'User with this email already exists!' });
        return;
      }

      User.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, object) => {
        if (err) { res.send(err); }
        res.json({
          message: 'User updated!',
          user: {
            _id: object._id,
            username: object.username,
            email: object.email,
          },
        });
      });
    });
  });
};


exports.delete_user = function (req, res) {
  User.remove({
    _id: req.params.userId,
  }, (err, object) => {
    if (err) { res.send(err); }
    res.json({ message: 'User successfully deleted' });
  });
};
