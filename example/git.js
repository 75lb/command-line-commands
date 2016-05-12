#!/usr/bin/env node
'use strict'
const clc = require('../')
const commandLineArgs = require('command-line-args')
const argData = require('./git-args')

const { command, argv } = clc.parse([ null, 'help', 'commit' ])
const cli = commandLineArgs(argData.cli[command])
const options = cli.parse(argv)
const usage = cli.getUsage()

switch (command) {
  case null:
    if (options.version) {
      console.log('version 90')
    } else {
      console.log(usage)
    }
    break

  case 'help':
    if (options.topic) {
      console.log(commandLineArgs(argData.cli[options.topic]).getUsage())
    }
    break

  case 'commit':
    if (options.message) {
      console.log('commit: ' + options.message)
    } else {
      console.log(usage)
    }
    break
}
