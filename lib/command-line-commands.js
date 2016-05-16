'use strict'
const arrayify = require('array-back')
const option = require('command-line-args/es5/option')

/**
 * @module command-line-commands
 */
exports.parse = parse

/**
 * Parses the `argv` value supplied (or `process.argv` by default), extracting and returning the `command` and remainder of `argv`. The command will be the first arg supplied. You may then pass `argv` into your arg-parser to get the options.
 *
 * @alias module:command-line-commands
 * @param {string|string[]} - One or more command strings, one of which the user must supply. Include `null` to represent "no command", effectively making commands optional.
 * @param [argv] {string[]} - An argv array, defaults to the global `process.argv` if not supplied.
 * @returns {{ command: string, argv: string[] }}
 * @throws `INVALID_COMMAND` - user supplied a command not specified in `commands`.
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

  /* the command is the first arg, unless it's an option (e.g. --help) */
  const command = (option.isOption(argv[0]) || !argv.length) ? null : argv.shift()

  if (arrayify(commands).indexOf(command) === -1) {
    const err = new Error('Command not recognised: ' + command)
    err.command = command
    err.name = 'INVALID_COMMAND'
    throw err
  }

  return { command: command, argv: argv }
}
