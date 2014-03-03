var canonicalDate = requireRoot('core/lib/utils/date').canonicalDate
  , originalDateConstructor = global.Date;

exports.stubDate = function(date){
  global.Date = function(){
    if (!arguments.length)
      return copy(date);

    if (arguments[0].toString().length !== 4)
      return new originalDateConstructor(arguments[0]);

    return new originalDateConstructor(
      arguments[0],
      arguments[1] || 0,
      arguments[2] || 1,
      arguments[3] || 1,
      arguments[4] || 1,
      arguments[5] || 1,
      arguments[6] || 1
    );
  }

  Date.now = function(){
    return originalDateConstructor.parse(canonicalDate(date));
  }
}

exports.unstubDate = function(){
  global.Date = originalDateConstructor;
};

function copy(date){
  return new originalDateConstructor(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  );
}
