'use strict'
const arrayify = require('array-back')
const option = require('command-line-args/es5/option')

/**
 * @module command-line-commands
 */
exports.parse = parse

/**
 * @alias module:command-line-commands
 * @param {string[]} - A list of valid commands. May include `null`.
 * @param [argv] {string[]} - A argv array.
 * @returns {{ command: string, argv: string[] }}
 * @throws `INVALID_COMMAND`
 */
function parse (commands, argv) {
  if (!commands || (Array.isArray(commands) && !commands.length)) {
    throw new Error('Please supply one or more commands')
  }
  if (argv) {
    argv = arrayify(argv)
  } else {
    /* if no argv supplied, assume we are parsing process.argv. */
    /* never modify the global process.argv directly. */
    argv = process.argv.slice(0)
    argv.splice(0, 2)
  }

  const command = (option.isOption(argv[0]) || !argv.length) ? null : argv.shift()

  if (commands.indexOf(command) === -1) {
    const err = new Error('Command not recognised: ' + command)
    err.command = command
    err.name = 'INVALID_COMMAND'
    throw err
  }

  return { command: command, argv: argv }
}
