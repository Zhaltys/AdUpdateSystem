'use strict';
module.exports = function(app) {
    var search = require('../controllers/searchController'),
    userHandlers = require('../controllers/userController');

    // Search routes
    app.route('/Searches')
        .get(userHandlers.loginRequired, search.list_all_searches)
    
    app.route('/MySearches')
        .get(userHandlers.loginRequired, search.list_user_searches)
        .post(userHandlers.loginRequired, search.create_search);

    app.route('/MySearches/:searchId')
        .get(userHandlers.loginRequired, search.list_user_searches)
        .put(userHandlers.loginRequired, search.update_search)
        .delete(userHandlers.loginRequired, search.delete_search);

    app.route('/Searches/:searchId')
        .get(search.get_search)        
    
    app.route('/auth/register')
        .post(userHandlers.register);
    app.route('/auth/login')
        .post(userHandlers.sign_in);
};