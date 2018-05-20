// library, that connects requests, parsers and callbacks
const request = require('request');
const fs = require('fs');
const parsers = require('./libs/allParsers');


module.exports = {
  getSite(url, searchId, callBackFunction) {
    request.get(url, (error, response, body) => {
      for (const parser in parsers) {
        if (url.indexOf(parsers[parser].template) > -1) {
          callBackFunction(parsers[parser].getAdList(body, searchId));
        }
      }
    });
  },
};
