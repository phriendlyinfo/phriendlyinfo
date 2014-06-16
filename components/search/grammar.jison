%start searchExpression

%ebnf

%{
  var slice = [].slice
    , hasOwn = {}.hasOwnProperty
    , config = requireRoot('core/config').search
    , DateUtils = requireRoot('core/lib/utils/date')
    , canonicalDate$ = DateUtils.canonicalDate
    , incDate$ = DateUtils.increment
    , parseDate$ = DateUtils.parse;

  const DEFAULT_SIZE = config.DEFAULT_SIZE;
  const EARLIEST_DATE = config.EARLIEST_DATE;

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

  function normalize(qualifier, filters) {
    var defaults = {
      dateRange: {from: EARLIEST_DATE, to: canonicalDate$()},
      qualifier: {qualifier: 'all', arguments: [DEFAULT_SIZE]},
      sort: 'asc'
    }
    return extend(defaults, qualifier, filters);
  }

  function resolveDate(date, options) {
    date = parseDate$(date);
    date = incDate$(date, options || {});
    return canonicalDate$(date);
  }

  var digits = /^\d+$/;
  function buildQualifier(qualifier, n) {
    qualifier = {qualifier: qualifier, arguments: [DEFAULT_SIZE]};
    var args = qualifier.arguments;
    if (null != n && digits.exec(n))
      qualifier.arguments[0] = +n;
    else if ('all' !== qualifier.qualifier)
      qualifier.arguments[0] = 1;
    if (args[0] > DEFAULT_SIZE) args[0] = DEFAULT_SIZE;
    return qualifier;
  }
%}


%%

searchExpression
  : qualifierExpression? COMMAND filters? EOF {return normalize($1, $3)}
  ;

qualifierExpression
  : QUALIFIER argument? -> {qualifier: buildQualifier($1, $2)};
  ;

filters
  : filter         -> $1
  | filters filter -> extend({}, $1, $2)
  ;

filter
  : dateRange     -> $1
  | AT argument   -> {at: $2}
  | SORT argument -> {sort: $2}
  ;

dateRange
  : ON DATE           -> {dateRange: {from: resolveDate($2), to: resolveDate($2)}}
  | IN DATE           -> {dateRange: {from: resolveDate($2), to: resolveDate($2, {year: 1})}}
  | BETWEEN DATE DATE -> {dateRange: {from: resolveDate($2), to: resolveDate($3)}}
  ;

argument
  : STRING     -> $1
  | IDENTIFIER -> $1
  ;
