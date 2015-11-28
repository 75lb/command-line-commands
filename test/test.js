'use strict'
var test = require('tape')
var commandLineCommands = require('../')

test('parse: simple', function (t) {
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
  let command = cli.parse([ 'eat', '--food', 'peas' ])
  t.deepEqual(command, {
    name: 'eat',
    options: { food: 'peas' }
  })
  command = cli.parse([ 'sleep', '--hours', '2' ])
  t.deepEqual(command, {
    name: 'sleep',
    options: { hours: '2' }
  })
  t.end()
})

test('parse: no definitions', function (t) {
  const commands = [ { name: 'eat' } ]
  const cli = commandLineCommands(commands)
  let command = cli.parse([ 'eat' ])
  t.deepEqual(command, {
    name: 'eat',
    options: { }
  })
  t.end()
})

test('parse: no definitions, but options passed', function (t) {
  const commands = [ { name: 'eat' } ]
  const cli = commandLineCommands(commands)
  t.throws(() => {
    let command = cli.parse([ 'eat', '--food', 'peas' ])
  })
  t.end()
})
