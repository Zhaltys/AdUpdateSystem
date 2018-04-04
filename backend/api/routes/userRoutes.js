'use strict';
module.exports = function(app) {
    var user = require('../controllers/userController');

    // user routes
    app.route('/Users')
        .get(user.list_all_users)
        .post(user.create_user);


    app.route('/Users/:userId')
        .get(user.get_user)
        .put(user.update_user)
        .delete(user.delete_user);
};