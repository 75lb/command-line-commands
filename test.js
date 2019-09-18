const Tom = require('test-runner').Tom
const commandLineCommands = require('./')
const a = require('assert')

const tom = module.exports = new Tom('test')

tom.test('simple', function () {
  const commands = [ 'eat', 'sleep' ]

  let clc = commandLineCommands(commands, [ 'eat', '--food', 'peas' ])
  a.strictEqual(clc.command, 'eat')
  a.deepEqual(clc.argv, [ '--food', 'peas' ])

  clc = commandLineCommands(commands, [ 'sleep', '--hours', '2' ])
  a.strictEqual(clc.command, 'sleep')
  a.deepEqual(clc.argv, [ '--hours', '2' ])
})

tom.test('no commands defined', function () {
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

tom.test('no command specified', function () {
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

tom.test('invalid command', function () {
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

tom.test('parse process.argv', function () {
  const commands = [ null ]
  const clc = commandLineCommands(commands)
  a.strictEqual(clc.command, null)
  a.deepEqual(clc.argv, [ '--files', 'test.js' ])
})

tom.test('different types of option as the first arg', function () {
  const commands = [ null ]

  let clc = commandLineCommands(commands, [ '--one' ])
  a.strictEqual(clc.command, null)
  a.deepEqual(clc.argv, [ '--one' ])

  clc = commandLineCommands(commands, [ '--one=two' ])
  a.strictEqual(clc.command, null)
  a.deepEqual(clc.argv, [ '--one=two' ])

  clc = commandLineCommands(commands, [ '-o' ])
  a.strictEqual(clc.command, null)
  a.deepEqual(clc.argv, [ '-o' ])

  clc = commandLineCommands(commands, [ '-of' ])
  a.strictEqual(clc.command, null)
  a.deepEqual(clc.argv, [ '-of' ])
})
