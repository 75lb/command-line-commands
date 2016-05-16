'use strict'
const commandLineCommands = require('../')
const commandLineArgs = require('command-line-args')

const validCommands = [ 'load', 'print' ]
const { command, argv } = commandLineCommands.parse(validCommands)

const optionDefinitions = {
  load: [
    { name: 'file', type: String }
  ],
  print: [
    { name: 'colour', type: Boolean }
  ]
}

const cli = commandLineArgs(optionDefinitions[command])

/* important: pass in the argv returned by `commandLineCommands.parse()` */
const options = cli.parse(argv)

switch (command) {
  case 'load':
    if (options.file) {
      console.log(`Loading: ${options.file}`)
    } else {
      console.log('please supply a filename')
    }
    break

  case 'print':
    console.log('Printing %s', options.colour ? 'in colour' : 'in B&W' )
    break
}
