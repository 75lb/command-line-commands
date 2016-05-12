#!/usr/bin/env node
'use strict'
const commandLineCommands = require('../')
const commandLineArgs = require('command-line-args')
const clc = commandLineCommands([
  { name: 'help' }
])
const { command, argv } = clc.parse()
// console.log(command)

const cli = {
  null: commandLineArgs({
    definitions: [
      { name: 'version', alias: 'v', type: Boolean, description: 'Print the version number.' }
    ],
    usage: {
      title: 'git',
      description: 'Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.',
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
      { name: 'message', alias: 'm', type: String, description: 'Commit message.' }
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
    options = cli.null.parse(argv)
    if (options.version) {
      console.log('version 90')
    } else {
      console.log(cli.null.getUsage())
      console.log(clc.getCommandList())
    }
    break

  case 'help':
    options = cli.help.parse(argv)
    if (options.topic) {
      console.log(cli[options.topic].getUsage())
    }
    break

  case 'commit':
    options = cli.commit.parse(argv)
    if (options.message) {
      console.log('commit: ' + options.message)
    } else {
      console.log(cli.commit.getUsage())
    }
    break
}
