#!/usr/bin/env node
'use strict'
const commandLineCommands = require('../')
const commandLineArgs = require('command-line-args')
const clc = commandLineCommands([
  { name: null },
  { name: 'help' }
])
const command = clc.parse()
// console.log(command)

const cli = {
  default: commandLineArgs({
    definitions: [
      { name: 'version', alias: 'v', type: Boolean, description: 'Print the version number.' }
    ],
    usage: {
      title: 'git',
      synopsis: 'git <options> <command>'
    }
  }),
  help: commandLineArgs({
    definitions: [
      { name: 'topic', type: String, description: 'the topic to display help on', defaultOption: true }
    ],
    usage: {
      title: 'git help',
      synopsis: '$ git help <options>'
    }
  }),
  commit: commandLineArgs({
    definitions: [
      { name: 'message', type: String, description: 'Commit message.' }
    ],
    usage: {
      title: 'git commit',
      description: 'Commit some work.',
      synopsis: '$ git commit <options> [--message] <message>'
    }
  })
}

let options

switch (command) {
  case null:
    options = cli.default.parse(process.argv)
    if (options.version) {
      console.log('version 90')
    } else {
      console.log(cli.default.getUsage())
    }
    break

  case 'help':
    options = cli.help.parse(process.argv)
    if (options.topic) {
      console.log(cli[options.topic].getUsage())
    }
    break

  case 'commit':
    options = cli.commit.parse(process.argv)
    if (options.message) {
      console.log('commit: ' + options.message)
    }
}
