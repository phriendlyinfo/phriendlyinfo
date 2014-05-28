%lex
command           "shows"|"show"
qualifier         "all"|"first"|"last"
filter            "in"|"between"|"on"|"sort"
date              \d{4}"-"\d{2}"-"\d{2}|\d{4}

%%

\s+                         /* skip */
{command}                   return 'COMMAND'
{qualifier}                 return 'QUALIFIER'
{filter}                    return yytext.toUpperCase();
{date}                      return 'DATE'
[a-zA-Z0-9_-]+              return 'IDENTIFIER'
\"[^\"]*\"|\'[^\']*\'       yytext = yytext.substr(1,yyleng-2); return 'STRING';
<<EOF>>                     return 'EOF'
