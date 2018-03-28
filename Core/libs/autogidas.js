// library for parsing ads from autogidas.lt
var parseBodyToAds = function (body){
    var adList = [];           
    var start_pos = body.indexOf("<a href=\"/skelbimas/");
    var stop_pos = body.indexOf("</a>", start_pos+1);
    var next_start = body.indexOf("<a href=\"/skelbimas/", stop_pos+1);
    var ad  = body.substring(start_pos, stop_pos+4);
    var index = 0;
    adList.push(getProperties(ad));
    while (next_start != -1)
    {
        var next_stop = body.indexOf("</a>", next_start+1);
        ad = body.substring(next_start, next_stop+4);
        next_start = body.indexOf("<a href=\"/skelbimas/", next_stop+1);
        index++;
        adList.push(getProperties(ad));
    }
    return adList;
}
var getProperties = function (ad){
    var start_pos;
    var stop_pos;
    var template;
    // find link
    template = "itemprop=\"url\" content=\"";
    start_pos = ad.indexOf(template);
    stop_pos = ad.indexOf("\"", start_pos + template.length);
    var link = ad.substring(start_pos + template.length, stop_pos);
    // find title
    template = "itemprop=\"name\" content=\"";
    start_pos = ad.indexOf(template);
    stop_pos = ad.indexOf("\"", start_pos + template.length);
    var title = ad.substring(start_pos + template.length, stop_pos);
    // find image
    template = "itemprop=\"image\" content=\"";
    start_pos = ad.indexOf(template);
    stop_pos = ad.indexOf("\"", start_pos + template.length);
    var image = ad.substring(start_pos + template.length, stop_pos);

    return {
        link: link,
        title: title,
        image: image,
        text: ad
    }
}


module.exports = {
    getAdList: function (pageBody)
    {
        return parseBodyToAds(pageBody);
    },
    template: 'autogidas.lt'
}