var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Ad = require('./api/models/adModel'), //created model loading here
    User = require ('./api/models/userModel'),
    Search = require('./api/models/searchModel'),
    bodyParser = require('body-parser'),
    jsonwebtoken = require('jsonwebtoken'),
    cors = require('cors');
var helpers = require('./helperFunctions');
const appConstants = require('../appConfig');

// mailing
helpers.sendMail(appConstants.adminMail, "started", "<h1>App Started<h1>");

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/DDOSPrototype');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
      jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'LukasSearchPrototype', function(err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      });
    } else if (req.headers && req.headers.admin && req.headers.admin == 'admin') {
      req.user = 'admin';
      next();
    } else {
      req.user = undefined;
      next();
    }
  });

 
var adRoutes = require('./api/routes/adRoutes'); //importing route
adRoutes(app); //register the route
 
var userRoutes = require('./api/routes/userRoutes');
userRoutes(app);

var searchRoutes = require('./api/routes/searchRoutes');
searchRoutes(app);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
    console.log(req.body);
  })

app.listen(port);


console.log('API server started on: ' + port);
