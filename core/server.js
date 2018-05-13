var express = require('express');
var core = require('./core');
var app = express();
const request = require('request');
const fetch = require('node-fetch');
const appConstants = require('../appConfig');

var searches = [];

var handleAds = function (adListObj){
  pushFindingsToDB(adListObj.adList);
  if (adListObj.nextPage.length > 0 && (adListObj.adList[adListObj.adList.length -1].promoted ||
     adListObj.adList[adListObj.adList.length -1].time <= appConstants.refreshTime))
  {    
    core.getSite(adListObj.nextPage, adListObj.adList[0].searchId, handleAds);
  }
}

const searchesGetUrl = "http://localhost:3000/searches";

function updateSearches() {
  request.get(
      {
        url: searchesGetUrl,
        headers: {
          'admin': 'admin',
        }
      }, (error, response, body) => 
      {
        searches = JSON.parse(body);
      }
  );
}

function pushFindingsToDB(adList) {
  const searchesPostUrl = "http://localhost:3000/Ads";
  var i;
  var reported = 0;
  for (var ad in adList)
  {
    if (adList[ad].time < appConstants.refreshTime) {
    {
      reported++;
      fetch('http://localhost:3000/Ads', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'admin': 'admin',
        },
        body: JSON.stringify(adList[ad]),
  
      })
        .then((data) => {
          //console.log('Request success: ', data);
        })
        .catch((error) => {
          console.log('Request failure: ', error);
        });
    }
    }
  }
  console.log("\n---- Page log ------");
  console.log("Ads found:    ", adList.length);  
  console.log("Ads reported: ", reported);
  console.log("--------------------\n")
}

function doSearch() {
  for (var search in searches)
  {
    var searchObj = searches[search];
    core.getSite(searchObj.url, searchObj._id, handleAds);
  }
}


app.get('/update', function(e){
    updateSearches();
    console.log("Updated search list!");
});


app.listen(4000, () => console.log("Started on: ", 4000, "\nRefresh time: ", appConstants.refreshTime, " minutes."));

updateSearches();

var testLoop = setInterval(() => {
  doSearch();
  console.log("Searches count: ", searches.length, "\n", new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''));
}, appConstants.refreshInterval*60*1000/2);
