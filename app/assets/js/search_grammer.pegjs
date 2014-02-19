{
  var slice = [].slice
    , hasOwn = {}.hasOwnProperty;

  function has(obj, key){
    return hasOwn.call(obj, key);
  }

  function merge(first){
    var i, ref, prop
      , rest = slice.call(arguments, 1)
      , len = rest.length;

    for(i = 0; i < len; i++){
      ref = rest[i];
      for(prop in ref)
        has(ref, prop) && (first[prop] = ref[prop]);
    }

    return first;
  }
}


start
  = searchExpression

searchExpression
  = cm:commandMatch arg:argumentMatch? {return merge(cm, arg)}

commands
  = $("shows" / "song" / "venue")

commandMatch
  = match:$(_ commands _) {return {command: match.trim()}}

argumentMatch
  = match:$(word) {return {argument: match}}
  / match:stringLiteral {return {argument: match}}

stringLiteral
  = match:$(quote [^'"]+ quote) {return match.match(/^['"](.+)['"]$/)[1]}

quote
  = $("'" / '"')

word
  = [a-zA-Z0-9_]+

__ = $(whitespace+)
_  = __?

whitespace
  = [\u0009\u000B\u000C\u0020\u00A0\uFEFF\u1680\u180E\u2000-\u200A\u202F\u205F\u3000]
  / "\n"
