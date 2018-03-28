var express = require('express');
var core = require('./core');



const url =
  "https://autogidas.lt/skelbimai/automobiliai/?f_1=Volvo&f_model_14=C70&f_50=atnaujinimo_laika_asc";

core.getSite(url, "C70");    

var app = express();
 
 
app.listen(3000);