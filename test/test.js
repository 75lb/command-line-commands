'use strict'
var test = require('tape')
var commandLineCommands = require('../')

test('first', function (t) {
  const commands = [
    {
      name: 'eat',
      definitions: [ { name: 'food' } ]
    },
    {
      name: 'sleep',
      definitions: [ { name: 'hours' } ]
    }
  ]
  const cli = commandLineCommands(commands)
  let options = cli.parse([ 'eat', '--food', 'peas' ])
  t.deepEqual(options, { eat: { food: 'peas' } })
  options = cli.parse([ 'sleep', '--hours', '2' ])
  t.deepEqual(options, { sleep: { hours: '2' } })
  t.end()
})
