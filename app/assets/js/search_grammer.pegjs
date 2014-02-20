{
  var slice = [].slice
    , hasOwn = {}.hasOwnProperty;

  function has(obj, key){
    return hasOwn.call(obj, key);
  }

  function extend(first){
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

commandKeywords
  = $("shows" / "song" / "venue")

filterKeywords
  = $("in" / "sort")

reserved
  = commandKeywords
  / filterKeywords

searchExpression
  = ce:commandExpr fe:filterExprs? {return extend(ce, fe)}

commandExpr
  = cm:commandMatch arg:argumentMatch? {return extend(cm, arg)}

commandMatch
  = match:$(_ commandKeywords _) {return {command: match.trim()}}

filterExprs
  = fes:filterExpr+ {return {filters: fes}}

filterExpr
  = fm:filterMatch arg:argumentMatch {return extend(fm, arg)}

filterMatch
  = match:$(_ filterKeywords _) {return {filter: match.trim()}}

argumentMatch
  = !reserved match:$(word) _ {return {argument: match}}
  / match:stringLiteral _ {return {argument: match}}

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
