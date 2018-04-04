var express = require('express');
var core = require('./core');
var app = express();
const request = require('request');

var skelbimas;

var paspausdinti = function (adList){
  skelbimas += "\n\n\n\n\n" + adList[0].text + "\n\n\n\n\nLink: "+ adList[0].link;
}

/*const url = "https://autogidas.lt/skelbimai/automobiliai/?f_1=Volvo&f_model_14=C70&f_50=atnaujinimo_laika_asc";
for (i = 0; i < 600; i++) {
  core.getSite(url, paspausdinti, i);
  if (i == 599)
    console.log("done requesting");
}*/

const url2 = "http://localhost:3000/searches";
function updateSearches() {
  request.get(
      {
        url: url2,
        headers: {
          'admin': 'admin',
        }
      }, (error, response, body) => 
      {
              console.log(JSON.parse(body)[0].title);
      }
  );
}



app.get('/', (req, res) => res.send(skelbimas));

app.get('/update', function(e){
    updateSearches();
    return "Hello";
});


app.listen(4000, () => console.log("Started on: ", 4000));