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

  function normalize(qualifier, command, filters) {
    var defaults = {
      arguments: [],
      command: 'shows',
      dateRange: [],
      qualifier: {qualifier: 'all', arguments: []},
      sort: 'asc'
    }
    return extend(defaults, qualifier, command, filters);
  }
%}


%%

searchExpression
  : qualifierExpression? commandExpression filters? EOF {return normalize($1, $2, $3)}
  ;

commandExpression
  : COMMAND argument* -> {command: $1, arguments: $2}
  ;

qualifierExpression
  : QUALIFIER argument? -> {qualifier: {qualifier: $1, arguments: (null != $2 ? [$2] : [])}}
  ;

filters
  : filter         -> $1
  | filters filter -> extend({}, $1, $2)
  ;

filter
  : dateRange -> $1
  | sort      -> $1
  ;

dateIdentifier: IN | BETWEEN;
dateRange
  : dateIdentifier argument argument? -> {dateRange: [$2, $3]}
  ;

sort
  : SORT argument -> {sort: $2}
  ;

argument
  : STRING     -> $1
  | IDENTIFIER -> $1
  ;
