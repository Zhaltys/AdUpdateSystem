
module.exports = function (app) {
  let ad = require('../controllers/adController'),
    userHandlers = require('../controllers/userController');

    // Ad routes
  app.route('/Ads')
    .get(userHandlers.loginRequired, ad.list_all_ads)
    .post(userHandlers.loginRequired, ad.create_ad);

  app.route('/MyAds')
    .get(userHandlers.loginRequired, ad.list_user_ads);


  app.route('/MyAds/:adId')
    .get(userHandlers.loginRequired, ad.list_user_ads)
    .put(userHandlers.loginRequired, ad.update_ad)
    .delete(userHandlers.loginRequired, ad.delete_ad);

  app.route('/Ads/:searchId')
    .get(userHandlers.loginRequired, ad.list_search_ads);

  app.route('/auth/register')
    .post(userHandlers.register);
  app.route('/auth/login')
    .post(userHandlers.sign_in);
};
