start
  = command

COMMANDS
  = $("shows" / "song" / "venue")

command
  = match:$(_ COMMANDS _) {return {command: match.trim()}}

__ = $(whitespace+)
_  = __?

whitespace
  = [\u0009\u000B\u000C\u0020\u00A0\uFEFF\u1680\u180E\u2000-\u200A\u202F\u205F\u3000]
  / "\n"
