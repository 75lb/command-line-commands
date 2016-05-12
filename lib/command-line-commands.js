'use strict'
const commandLineArgs = require('command-line-args')
const arrayify = require('array-back')
const ansi = require('ansi-escape-sequences')
const t = require('typical')
const columnLayout = require('column-layout')
const os = require('os')
const objectGet = require('object-get')
const option = require('command-line-args/lib/option')

/**
 * Add a git-like command interface to your app. Wraps [command-line-args](https://github.com/75lb/command-line-args).
 *
 * @module command-line-commands
 */
module.exports = factory

/**
 * @class
 * @typicalname cli
 * @alias module:command-line-commands
 * @param commands {array}
 */
class CommandLineCommands {
  constructor (commands) {
    this.commands = commands
  }

  /**
   * @param [argv] {array}
   * @returns {{ name: string, options: object }}
   */
  parse (argv) {
    if (argv) {
      argv = arrayify(argv)
    } else {
      /* if no argv supplied, assume we are parsing process.argv */
      argv = process.argv.slice(0)
      argv.splice(0, 2)
    }

    return {
      command: (option.isOption(argv[0]) || !argv.length) ? null : argv.shift(),
      argv: argv
    }
  }

  /**
   * Generates a usage guide for the specified command. Please see [command-line-usage](https://github.com/75lb/command-line-usage) for full instructions of how to use.
   *
   * @param [commandName] {string} - the command to load the command line option definitions from
   * @param [options] {object} - the options to pass to [command-line-usage](https://github.com/75lb/command-line-usage)
   * @returns {string}
   */
  getUsage (templateData, commandName) {
    var output = ''
    if (commandName) {
      const commandDefinition = this.commands.find(c => c.name === commandName)
      if (commandDefinition) {
        const cli = commandLineArgs(commandDefinition.definitions)
        output = cli.getUsage(templateData)
      }
    } else {
      const titleSection = new Section(templateData.title, templateData.description)
      const commands = Commands.create(this.commands)
      const commandSection = new Section('Command list', commands.toString())
      output = `${titleSection}\n${commandSection}`
    }

    return output
  }

  getCommandList () {
    const commands = Commands.create(this.commands)
    const commandSection = new Section('Command list', commands.toString())
    return commandSection.toString()
  }
}

function factory (commands) {
  return new CommandLineCommands(commands)
}

class Lines {
  constructor () {
    this.list = []
  }
  add (content) {
    arrayify(content).forEach(line => this.list.push(ansi.format(line)))
  }

  emptyLine () {
    this.list.push('')
  }
}

class Section {
  constructor (title, content, skipIndent) {
    this.title = title
    this.content = content
    this.skipIndent = skipIndent
  }

  toString () {
    const lines = new Lines()
    const content = this.content
    const skipIndent = this.skipIndent

    if (this.title) {
      lines.add(ansi.format(this.title, [ 'underline', 'bold' ]))
      lines.emptyLine()
    }

    if (!content) {
      return lines.list.join(os.EOL)
    } else {
      if (t.isString(content)) {
        lines.add(indentArray(content.split(/\r?\n/)))
      } else if (Array.isArray(content) && content.every(t.isString)) {
        lines.add(skipIndent ? content : indentArray(content))
      } else if (Array.isArray(content) && content.every(t.isPlainObject)) {
        lines.add(columnLayout.lines(content, {
          padding: { left: '  ', right: ' ' }
        }))
      } else if (t.isPlainObject(content)) {
        if (!content.options || !content.data) {
          throw new Error('must have an "options" or "data" property\n' + JSON.stringify(content))
        }
        Object.assign(
          { padding: { left: '  ', right: ' ' } },
          content.options
        )
        lines.add(columnLayout.lines(
          content.data.map(row => formatRow(row)),
          content.options
        ))
      } else {
        const message = `invalid input - 'content' must be a string, array of strings, or array of plain objects:\n\n${JSON.stringify(content)}`
        throw new Error(message)
      }

      lines.emptyLine()
      return lines.list.join(os.EOL)
    }
  }
}

function indentString (string) {
  return '  ' + string
}
function indentArray (array) {
  return array.map(indentString)
}
function formatRow (row) {
  for (const key in row) {
    row[key] = ansi.format(row[key])
  }
  return row
}

class Commands {
  constructor (commands) {
    this.list = commands
  }
  static create (commands) {
    return new this(commands)
  }
  toString () {
    const list = this.list.map(command => {
      return {
        name: command.name,
        description: objectGet(command, 'usage.description')
      }
    })
    return columnLayout(list)
  }
}
