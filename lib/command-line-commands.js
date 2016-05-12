'use strict'
const arrayify = require('array-back')
const option = require('command-line-args/lib/option')

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
