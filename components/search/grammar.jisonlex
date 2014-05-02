%lex
command       "shows"|"show"|"songs"|"song"|"venues"|"venue"
qualifier     "all"|"first"|"last"
filter        "in"|"between"|"sort"

%%

\s+                   /* skip */
{command}             return 'COMMAND'
{qualifier}           return 'QUALIFIER'
{filter}              return 'FILTER'
[a-zA-Z0-9_-]+        return 'IDENTIFIER'
\"[^\"]*\"|\'[^\']*\' yytext = yytext.substr(1,yyleng-2); return 'STRING';
<<EOF>>               return 'EOF'
