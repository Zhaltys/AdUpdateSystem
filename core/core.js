// library, that connects requests, parsers and callbacks
const request = require("request");
var fs = require('fs');
const parsers = require('./libs/allParsers');


module.exports = {
    getSite: function (url, searchId, callBackFunction) {
        request.get(url, (error, response, body) => {
            for (var parser in parsers) {
                if (url.indexOf(parsers[parser].template) > -1)
                {
                    callBackFunction( parsers[parser].getAdList(body, searchId) );
                }
            }
        });
    }    
}
