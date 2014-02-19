start
  = command

COMMANDS
  = $("shows" / "song" / "venue")

command
  = s:$(COMMANDS) {return {command: s}}
