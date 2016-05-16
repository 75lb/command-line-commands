'use strict'
const commandLineCommands = require('../')
const commandLineArgs = require('command-line-args')

const validCommands = [ 'help', 'run' ]
const { command, argv } = commandLineCommands.parse(validCommands)

const commandOptionsMap = {
  run: [
    { name: 'why', type: String }
  ]
}

const cli = commandLineArgs(commandOptionsMap[command])
const options = cli.parse(argv)

switch (command) {
  case 'help':
    console.log("I can't help you.")
    break
  case 'run':
    if (options.why) {
      console.log(`${options.why}: this is not a good reason.`)
    } else {
      console.log('please specify a reason --why')
    }
    break
}
