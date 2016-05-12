'use strict';

var arrayify = require('array-back');
var option = require('command-line-args/es5/option');

exports.parse = parse;

function parse(commands, argv) {
  if (!commands || Array.isArray(commands) && !commands.length) {
    var err = new Error('Please supply one or more commands');
    err.name = 'NO_COMMANDS';
    throw err;
  }
  if (argv) {
    argv = arrayify(argv);
  } else {
    argv = process.argv.slice(0);
    argv.splice(0, 2);
  }

  var command = option.isOption(argv[0]) || !argv.length ? null : argv.shift();

  if (commands.indexOf(command) === -1) {
    throw new Error('Invalid command');
  }

  return { command: command, argv: argv };
}