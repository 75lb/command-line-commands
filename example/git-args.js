#!/usr/bin/env node
'use strict'
const commandList = [
  { name: 'help', summary: 'Display help information about Git.' },
  { name: 'commit', summary: 'Record changes to the repository.' }
]

const cli = {
  null: {
    definitions: [
      { name: 'version', alias: 'v', type: Boolean, description: 'Print the version number.' }
    ],
    usage: {
      sections: [
        {
          header: 'git',
          content: 'Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.'
        },
        {
          header: 'synopsis',
          content: 'git <options> <command>'
        },
        {
          header: 'Command List',
          content: commandList
        }
      ]
    }
  },
  help: {
    definitions: [
      { name: 'topic', type: String, description: 'the topic to display help on', defaultOption: true }
    ],
    usage: {
      title: 'git help',
      synopsis: '$ git help <options>'
    }
  },
  commit: {
    definitions: [
      { name: 'message', alias: 'm', type: String, description: 'Commit message.' }
    ],
    usage: {
      title: 'git commit',
      description: 'Commit some work.',
      synopsis: '$ git commit <options> [--message] <message>'
    }
  }
}

exports.commandList = commandList
exports.cli = cli
