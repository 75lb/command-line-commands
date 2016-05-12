'use strict'
const arrayify = require('array-back')
const option = require('command-line-args/es5/option')

/**
 * Add a git-like command interface to your app.
 *
 * @module command-line-commands
 */
exports.parse = parse

/**
 * @alias module:command-line-commands
 * @param [argv] {array}
 * @returns {{ command: string, argv: string[] }}
 */
function parse (commands, argv) {
  if (!commands || (Array.isArray(commands) && !commands.length)) {
    const err = new Error('Please supply one or more commands')
    err.name = 'NO_COMMANDS'
    throw err
  }
  if (argv) {
    argv = arrayify(argv)
  } else {
    /* if no argv supplied, assume we are parsing process.argv */
    argv = process.argv.slice(0)
    argv.splice(0, 2)
  }

  const command = (option.isOption(argv[0]) || !argv.length) ? null : argv.shift()

  if (commands.indexOf(command) === -1) {
    throw new Error('Invalid command')
  }

  return { command: command, argv: argv }
}
