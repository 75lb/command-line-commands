'use strict'
const commandLineCommands = require('../')
const commandLineArgs = require('command-line-args')

const { command, argv } = commandLineCommands.parse([ 'help', 'run' ])
const optionDefinitions = {
  run: [
    { name: 'why', type: String }
  ]
}

const cli = commandLineArgs(optionDefinitions[command])
const options = cli.parse(argv)

switch (command) {
  case 'help':
    console.log("I can't help you.")
    break
  case 'run':
    console.log(`${options.why}: this is not a good reason.`)
    break
}
