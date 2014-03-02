var isCanonicalDate = requireRoot('core/lib/utils/date').isCanonicalDate
  , isString = require('underscore').isString
  , originalDateConstructor = global.Date;

exports.stubDate = function(y, m, d, h, mm, s, ms){
  global.Date = function(){
    if (isString(y) && isCanonicalDate(y))
      return new originalDateConstructor(y);
    var date = new originalDateConstructor();
    date.setUTCFullYear(y);
    date.setUTCMonth(m);
    date.setUTCDate(d);
    date.setUTCHours(h, mm, s, ss);
    return date;
  }
  Date.now = function(){
    return isString(y) && isCanonicalDate(y)
      ? originalDateConstructor.parse(y)
      : originalDateConstructor.UTC(y, m, d, h, mm, s, ms);
  }
}

exports.unstubDate = function(){
  global.Date = originalDateConstructor;
};
