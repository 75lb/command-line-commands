const commandLineCommands = require('../')

const validCommands = [ null, 'clean', 'update', 'install' ]
const { command, argv } = commandLineCommands.parse(validCommands)

console.log('command: %s', command)
console.log('argv:    %s', JSON.stringify(argv))
