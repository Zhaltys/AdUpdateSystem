var express = require('express');
var core = require('./core');
var app = express();

var skelbimas;

var paspausdinti = function (adList){
  skelbimas = adList[0].text + "\n\n\n\n\nLink: "+ adList[0].link;
}

const url =
  "https://autogidas.lt/skelbimai/automobiliai/?f_1=Volvo&f_model_14=C70&f_50=atnaujinimo_laika_asc";
core.getSite(url, paspausdinti);

app.get('/', (req, res) => res.send(skelbimas));


app.listen(3000, () => console.log("Started on: ", 3000));