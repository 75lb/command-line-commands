'use strict'
const commandLineArgs = require('command-line-args')
const arrayify = require('array-back')

/**
 * @module command-line-commands
 */
module.exports = factory

class CommandLineCommands {
  constructor (commands) {
    this.commands = commands
  }

  parse (argv) {
    if (argv) {
      argv = arrayify(argv)
    } else {
      /* if no argv supplied, assume we are parsing process.argv */
      argv = process.argv.slice(0)
      argv.splice(0, 2)
    }
    const commandName = argv.shift()
    const output = {}

    const commandDefinition = this.commands.find(c => c.name === commandName)
    if (commandDefinition) {
      const cli = commandLineArgs(commandDefinition.definitions)
      output.name = commandName
      output.options = cli.parse(argv)
    }
    return output
  }
}

function factory (commands) {
  return new CommandLineCommands(commands)
}
