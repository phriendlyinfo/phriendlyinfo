%start searchExpression

%ebnf

%{
  var slice = [].slice
    , hasOwn = {}.hasOwnProperty;

  function extend(first){
    var i, ref, prop
      , rest = slice.call(arguments, 1)
      , len = rest.length;

    for(i = 0; i < len; i++){
      ref = rest[i];
      for(prop in ref)
        hasOwn.call(ref, prop) && (first[prop] = ref[prop]);
    }

    return first;
  }
%}


%%

searchExpression
  : qualifierExpression? commandExpression filterExpression* EOF {return extend({}, $1, $2, {filters: $3})}
  ;

commandExpression
  : COMMAND arguments* -> {command: $1, arguments: $2}
  ;

qualifierExpression
  : QUALIFIER arguments* -> {qualifier: {qualifier: $1, arguments: $2}}
  ;

filterExpression
  : FILTER arguments* -> {filter: $1, arguments: $2}
  ;

arguments
  : STRING     -> $1
  | IDENTIFIER -> $1
  ;
