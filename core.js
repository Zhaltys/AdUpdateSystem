const request = require("request");
var fs = require('fs');

function printAd(ad, filename) {
    fs.writeFile("files/" + filename + ".html", ad, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("File" + filename + " saved!");
    }); 
}

module.exports = {
    getSite: function (url, filename) {
        request.get(url, (error, response, body) => {
            var visiSkelbimai = "";           
            var start_pos = body.indexOf("<a href=\"/skelbimas/");
            var stop_pos = body.indexOf("</a>", start_pos+1);
            var next_start = body.indexOf("<a href=\"/skelbimas/", stop_pos+1);
            var skelbimas  = body.substring(start_pos, stop_pos+4);
            var index = 0;
            printAd(skelbimas, filename + index);
            while (next_start != -1)
            {
                var next_stop = body.indexOf("</a>", next_start+1);
                skelbimas = body.substring(next_start, next_stop+4);
                next_start = body.indexOf("<a href=\"/skelbimas/", next_stop+1);
                index++;
                printAd(skelbimas, filename + index);
            }
        });
    }    
}
