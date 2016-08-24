'use strict'
var TestRunner = require('test-runner')
var commandLineCommands = require('../')
var a = require('core-assert')

var runner = new TestRunner()

runner.test('parse: simple', function () {
  var commands = [ 'eat', 'sleep' ]

  var clc = commandLineCommands(commands, [ 'eat', '--food', 'peas' ])
  a.deepEqual(clc.command, 'eat')
  a.deepEqual(clc.argv, [ '--food', 'peas' ])

  clc = commandLineCommands(commands, [ 'sleep', '--hours', '2' ])
  a.deepEqual(clc.command, 'sleep')
  a.deepEqual(clc.argv, [ '--hours', '2' ])
})

runner.test('parse: no commands defined', function () {
  a.throws(function () {
    commandLineCommands([], [ 'eat' ])
  })
  a.throws(function () {
    commandLineCommands(undefined, [ 'eat' ])
  })
  a.throws(function () {
    commandLineCommands([])
  })
  a.throws(function () {
    commandLineCommands([], [ 'eat' ])
  })
  a.throws(function () {
    commandLineCommands()
  })
})

runner.skip('parse: no definitions, but options passed', function () {
  var commands = [ { name: 'eat' } ]
  var cli = commandLineCommands(commands)
  a.throws(function () {
    cli.parse([ 'eat', '--food', 'peas' ])
  })
})

runner.test('parse: no command specified')

runner.skip('parse: unknown command', function () {
  var commands = [ { name: 'eat' } ]
  var cli = commandLineCommands(commands)
  var command = cli.parse([ 'sleep' ])
  a.deepEqual(command, {
    error: 'Unknown command',
    command: 'sleep'
  })
})
