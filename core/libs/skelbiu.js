

// library for parsing ads from skelbiu.lt
const parseBodyToAds = function (body, searchId) {
  // next page logic
  var start_pos;
  var stop_pos;
  let template;
  let next_page_link = '';
  // find next page link
  template = '<strong class="pagination_selected">';
  start_pos = body.indexOf(template);
  if (start_pos > 0) {
    template = '<a class="pagination_link" href="';
    start_pos = body.indexOf(template, start_pos);
    if (start_pos > 0) {
      stop_pos = body.indexOf('">', start_pos + template.length);
      next_page_link = `https://skelbiu.lt${body.substring(start_pos + template.length, stop_pos)}`;
      next_page_link = next_page_link.replace(/amp;/g, '');
    }
  }
  // body of ads
  start_pos = body.indexOf('<li class="simpleAds"');
  stop_pos = body.indexOf('</ul>', start_pos);
  body = body.substring(start_pos - 1, stop_pos);
  //--------------------------
  const adList = [];
  var start_pos = body.indexOf('Ads" id="ads');
  var stop_pos = body.indexOf('</li>', start_pos + 1);
  let next_start = body.indexOf('Ads" id="ads', stop_pos);
  let ad = body.substring(start_pos, stop_pos + 5);
  let index = 0;
  adList.push(getProperties(ad, searchId));
  while (next_start != -1) {
    const next_stop = body.indexOf('</li>', next_start + 1);
    ad = body.substring(next_start, next_stop + 5);
    next_start = body.indexOf('Ads" id="ads', next_stop);
    index++;
    adList.push(getProperties(ad, searchId));
  }
  return { nextPage: next_page_link, adList };
};
var getProperties = function (ad, searchId) {
  let start_pos;
  let stop_pos;
  let template;
  // find link
  template = '<a href="';
  start_pos = ad.indexOf(template);
  stop_pos = ad.indexOf('"', start_pos + template.length);
  let link = ad.substring(start_pos + template.length, stop_pos);
  if (link[0] == '/') { link = `https://skelbiu.lt${link}`; }
  // find title
  template = '<h3>';
  start_pos = ad.indexOf(template);
  template = '>';
  start_pos = ad.indexOf(template, start_pos + 5);
  stop_pos = ad.indexOf('</a>', start_pos + template.length);
  const title = ad.substring(start_pos + template.length, stop_pos);
  // find image
  template = 'class="adsImage"  /><img src="';
  start_pos = ad.indexOf(template);
  stop_pos = ad.indexOf('"', start_pos + template.length);
  const image = ad.substring(start_pos + template.length, stop_pos);
  // find when inserted
  template = '<div class="adsDate">';
  start_pos = ad.indexOf(template);
  stop_pos = ad.indexOf('</div>', start_pos);
  const time = ad.substring(start_pos + template.length, stop_pos);
  // find if promoted
  const promoted = false;


  return {
    url: link,
    title,
    imageUrl: image,
    // text: ad,
    time: parseTimeToMinutes(time),
    searchId,
    promoted,
  };
};

function parseTimeToMinutes(time) {
  if (time.indexOf('mažiau') > 0) { return 0; }
  if (time.indexOf('min.') > 1 && time.length <= 'prieš 10 min.'.length + 1) {
    const timeObj = time.split(' ');
    const timeNumber = timeObj[1] == '' ? timeObj[2] : timeObj[1];
    return timeNumber * 1;
  }
  return 999;
}

module.exports = {
  getAdList(pageBody, searchId) {
    return parseBodyToAds(pageBody, searchId);
  },
  template: 'skelbiu.lt',
};
