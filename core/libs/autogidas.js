

// library for parsing ads from autogidas.lt
var parseBodyToAds = function (body, searchId){
    // next page logic
    var start_pos;
    var stop_pos;
    var template;
    var next_page_link = "";
    // find link
    template = "<div class=\"next-page-block\">";
    start_pos = body.indexOf(template);
    if (start_pos > 0) {
        template = "<a href=\"";
        start_pos = body.indexOf(template, start_pos);
        stop_pos = body.indexOf("\">", start_pos + template.length);
        next_page_link = "https://autogidas.lt" + body.substring(start_pos + template.length, stop_pos);
        next_page_link = next_page_link.replace(/amp;/g, "");
    }
    //--------------------------
    var adList = [];
    var start_pos = body.indexOf("<a href=\"/skelbimas/");
    var stop_pos = body.indexOf("</a>", start_pos+1);
    var next_start = body.indexOf("<a href=\"/skelbimas/", stop_pos+1);
    var ad  = body.substring(start_pos, stop_pos+4);
    var index = 0;
    adList.push(getProperties(ad, searchId));
    while (next_start != -1)
    {
        var next_stop = body.indexOf("</a>", next_start+1);
        ad = body.substring(next_start, next_stop+4);
        next_start = body.indexOf("<a href=\"/skelbimas/", next_stop+1);
        index++;
        adList.push(getProperties(ad, searchId));
    }
    return {nextPage: next_page_link, adList: adList};
}
var getProperties = function (ad, searchId){
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
    // find when inserted
    template = "<div class=\"inserted-before ";
    start_pos = ad.indexOf(template);
    start_pos = ad.indexOf("\">", start_pos);
    stop_pos = ad.indexOf("</div>", start_pos);
    var time = ad.substring(start_pos + 2, stop_pos);
    // find if promoted
    template = "<div class=\"up\"";
    var promoted = ad.indexOf(template) > -1;


    return {
        url: link,
        title: title,
        imageUrl: image,
        //text: ad,
        time: parseTimeToMinutes(time),
        searchId: searchId,
        promoted: promoted
    }
}

function parseTimeToMinutes(time)
{
    var timeObj = time.split(" ");
    const timeCases = 
    {
        'm.' : 60*24*365,
        'd.': 60*24,
        'mėn.' : 60*24*30,
        'val.' : 60,
        'min.' : 1
    }
    return timeObj[1] * timeCases[timeObj[2]];
}

module.exports = {
    getAdList: function (pageBody, searchId)
    {
        return parseBodyToAds(pageBody, searchId);
    },
    template: 'autogidas.lt'
}