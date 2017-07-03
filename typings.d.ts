declare function commandLineCommands(commands: (string | null)[], argv: string[]): { command: string | null, argv: string[] };

export = commandLineCommands;
