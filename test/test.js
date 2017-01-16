'use strict'
const TestRunner = require('test-runner')
const commandLineCommands = require('../')
const a = require('assert')

const runner = new TestRunner()

runner.test('simple', function () {
  const commands = [ 'eat', 'sleep' ]

  let clc = commandLineCommands(commands, [ 'eat', '--food', 'peas' ])
  a.strictEqual(clc.command, 'eat')
  a.deepEqual(clc.argv, [ '--food', 'peas' ])

  clc = commandLineCommands(commands, [ 'sleep', '--hours', '2' ])
  a.strictEqual(clc.command, 'sleep')
  a.deepEqual(clc.argv, [ '--hours', '2' ])
})

runner.test('no commands defined', function () {
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

runner.test('no command specified', function () {
  let clc
  let commands = [ ]

  /* throws if null not specified */
  a.throws(function () {
    clc = commandLineCommands(commands, [ ])
  })

  /* null specified */
  commands = [ null ]
  clc = commandLineCommands(commands, [ ])
  a.strictEqual(clc.command, null)
  a.deepEqual(clc.argv, [ ])

  clc = commandLineCommands(commands, [ '--flag' ])
  a.strictEqual(clc.command, null)
  a.deepEqual(clc.argv, [ '--flag' ])
})

runner.test('invalid command', function () {
  const commands = [ 'eat', 'sleep' ]
  let clc

  a.throws(
    function () {
      clc = commandLineCommands(commands, [ 'cheese', '--food', 'peas' ])
    },
    function (err) {
      return err.name === 'INVALID_COMMAND' && err.command === 'cheese'
    }
  )
})

runner.test('parse process.argv', function () {
  const commands = [ null ]
  const clc = commandLineCommands(commands)
  a.strictEqual(clc.command, null)
  a.deepEqual(clc.argv, [ '--files', 'test/test.js' ])
})
