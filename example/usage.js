#!/usr/bin/env node
'use strict'
const commandLineCommands = require('../')

const commands = [
  {
    name: 'eat',
    commandLineArgs: {
      usage: {
        title: 'kangeroo eat',
        description: 'commands related to eating'
      },
      definitions: [
        { name: 'food', type: String, description: 'name of food' },
        { name: 'quantity', type: Number, description: 'quantity in kg' }
      ]
    }
  },
  {
    name: 'sleep',
    commandLineArgs: {
      usage: {
        title: 'kangeroo sleep',
        description: 'commands related to sleeping'
      },
      definitions: [
        { name: 'hours', type: Number, description: 'Number of hours sleep' }
      ]
    }
  }
]

const usageData = {
  title: 'kangeroo',
  description: 'An example application demonstrating usage guides'
}

const cli = commandLineCommands(commands)

console.log(cli.parse())

console.log(cli.getUsage(usageData))
