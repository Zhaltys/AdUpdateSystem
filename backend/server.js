const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const Ad = require('./api/models/adModel'); // created models loading here
const User = require('./api/models/userModel');
const Search = require('./api/models/searchModel');
const bodyParser = require('body-parser');
const jsonwebtoken = require('jsonwebtoken');
const cors = require('cors');
const helpers = require('./helperFunctions');
const appConstants = require('../appConfig');

// mailing
helpers.sendMail(appConstants.adminMail, 'started', '<h1>App Started<h1>');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/AdUpdateSystemPrototypeDB');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'LukasSearchPrototype', (err, decode) => {
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


const adRoutes = require('./api/routes/adRoutes');
// importing route
adRoutes(app); // register the route

const userRoutes = require('./api/routes/userRoutes');

userRoutes(app);

const searchRoutes = require('./api/routes/searchRoutes');

searchRoutes(app);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
  console.log(req.body);
});

app.listen(port);


console.log(`API server started on: ${port}`);
