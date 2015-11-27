'use strict'
const commandLineArgs = require('command-line-args')

/**
 * @module command-line-commands
 */
module.exports = factory

class CommandLineCommands {
  constructor (commands) {
    this.commands = commands
  }

  parse() {
    const argv = process.argv.slice(2)
    const commandName = argv.shift()

    const commandDefinition = this.commands.find(c => c.name === commandName)
    if (commandDefinition) {
      const cli = commandLineArgs(commandDefinition.definitions)
      return cli.parse(argv)
    }
  }
}

function factory (commands) {
  return new CommandLineCommands(commands)
}
