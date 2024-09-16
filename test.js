import commandLineCommands from 'command-line-commands'
import { strict as a } from 'assert'

const [test, only, skip] = [new Map(), new Map(), new Map()]

/* Tests which parse process.argv expect this array */
process.argv = ['node', 'script', '--files', 'test.js']

test.set('simple', function () {
  const commands = [ 'eat', 'sleep' ]

  let clc = commandLineCommands(commands, [ 'eat', '--food', 'peas' ])
  a.equal(clc.command, 'eat')
  a.deepEqual(clc.argv, [ '--food', 'peas' ])

  clc = commandLineCommands(commands, [ 'sleep', '--hours', '2' ])
  a.equal(clc.command, 'sleep')
  a.deepEqual(clc.argv, [ '--hours', '2' ])
})

test.set('no commands defined', function () {
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

test.set('no command specified', function () {
  let clc
  let commands = [ ]

  /* throws if null not specified */
  a.throws(function () {
    clc = commandLineCommands(commands, [ ])
  })

  /* null specified */
  commands = [ null ]
  clc = commandLineCommands(commands, [ ])
  a.equal(clc.command, null)
  a.deepEqual(clc.argv, [ ])

  clc = commandLineCommands(commands, [ '--flag' ])
  a.equal(clc.command, null)
  a.deepEqual(clc.argv, [ '--flag' ])
})

test.set('invalid command', function () {
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

test.set('parse process.argv', function () {
  const commands = [ null ]
  const clc = commandLineCommands(commands)
  a.equal(clc.command, null)
  a.deepEqual(clc.argv, [ '--files', 'test.js' ])
})

test.set('different types of option as the first arg', function () {
  const commands = [ null ]

  let clc = commandLineCommands(commands, [ '--one' ])
  a.equal(clc.command, null)
  a.deepEqual(clc.argv, [ '--one' ])

  clc = commandLineCommands(commands, [ '--one=two' ])
  a.equal(clc.command, null)
  a.deepEqual(clc.argv, [ '--one=two' ])

  clc = commandLineCommands(commands, [ '-o' ])
  a.equal(clc.command, null)
  a.deepEqual(clc.argv, [ '-o' ])

  clc = commandLineCommands(commands, [ '-of' ])
  a.equal(clc.command, null)
  a.deepEqual(clc.argv, [ '-of' ])
})

export { test, only, skip }
