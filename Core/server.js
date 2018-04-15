var express = require('express');
var core = require('./core');
var app = express();
const request = require('request');
const fetch = require('node-fetch');

var skelbimas;

var paspausdinti = function (adList){
  console.log(adList.adList[0]);
  pushFindingsToDB(adList.adList);
  if (adList.nextPage.length > 0)
  {
    core.getSite(adList.nextPage, paspausdinti);
  }
}

// testing
// 1 page link
const url = "https://autogidas.lt/skelbimai/automobiliai/?f_1=Volvo&f_model_14=C70&f_50=atnaujinimo_laika_asc";
// multiple page link
const url2 = "https://autogidas.lt/skelbimai/automobiliai/?f_1=Volvo&f_2=Dyzelinas";
// all ads in autogidas link
const url3 = "https://autogidas.lt/skelbimai/automobiliai/?f_1=&f_model_14=&f_215=&f_216=&f_41=&f_42=&f_3=&f_2=&f_376=";
core.getSite(url2, paspausdinti);

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
        console.log(JSON.parse(body)[0].title);
      }
  );
}

function pushFindingsToDB(adList) {
  const searchesPostUrl = "http://localhost:3000/Ads";
  var i;
  for (var ad in adList)
  {
    {
      fetch('http://localhost:3000/Ads', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'admin': 'admin',
        },
        body: JSON.stringify(adList[ad]),
  
      })
        .then((data) => {
          console.log('Request success: ', data);
        })
        .catch((error) => {
          console.log('Request failure: ', error);
        });
    }
    }
}



app.get('/', (req, res) => res.send(skelbimas));

app.get('/update', function(e){
    updateSearches();
    return "Hello";
});


app.listen(4000, () => console.log("Started on: ", 4000));