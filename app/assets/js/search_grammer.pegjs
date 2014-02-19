start
  = commands

COMMANDS
  = $("shows" / "song" / "venue")

commands
  = s:$(COMMANDS) {return {command: s}}
