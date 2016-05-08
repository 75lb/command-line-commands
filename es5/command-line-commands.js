'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var commandLineArgs = require('command-line-args');
var arrayify = require('array-back');
var ansi = require('ansi-escape-sequences');
var t = require('typical');
var columnLayout = require('column-layout');
var os = require('os');
var objectGet = require('object-get');

module.exports = factory;

var CommandLineCommands = function () {
  function CommandLineCommands(commands) {
    _classCallCheck(this, CommandLineCommands);

    this.commands = commands;
  }

  _createClass(CommandLineCommands, [{
    key: 'parse',
    value: function parse(argv) {
      if (argv) {
        argv = arrayify(argv);
      } else {
        argv = process.argv;
        argv.splice(0, 2);
      }
      var commandName = argv.shift();
      commandName = commandName || null;

      return commandName;
    }
  }, {
    key: 'getUsage',
    value: function getUsage(templateData, commandName) {
      var output = '';
      if (commandName) {
        var commandDefinition = this.commands.find(function (c) {
          return c.name === commandName;
        });
        if (commandDefinition) {
          var cli = commandLineArgs(commandDefinition.definitions);
          output = cli.getUsage(templateData);
        }
      } else {
        var titleSection = new Section(templateData.title, templateData.description);
        var commands = Commands.create(this.commands);
        var commandSection = new Section('Command list', commands.toString());
        output = titleSection + '\n' + commandSection;
      }

      return output;
    }
  }]);

  return CommandLineCommands;
}();

function factory(commands) {
  return new CommandLineCommands(commands);
}

var Lines = function () {
  function Lines() {
    _classCallCheck(this, Lines);

    this.list = [];
  }

  _createClass(Lines, [{
    key: 'add',
    value: function add(content) {
      var _this = this;

      arrayify(content).forEach(function (line) {
        return _this.list.push(ansi.format(line));
      });
    }
  }, {
    key: 'emptyLine',
    value: function emptyLine() {
      this.list.push('');
    }
  }]);

  return Lines;
}();

var Section = function () {
  function Section(title, content, skipIndent) {
    _classCallCheck(this, Section);

    this.title = title;
    this.content = content;
    this.skipIndent = skipIndent;
  }

  _createClass(Section, [{
    key: 'toString',
    value: function toString() {
      var lines = new Lines();
      var content = this.content;
      var skipIndent = this.skipIndent;

      if (this.title) {
        lines.add(ansi.format(this.title, ['underline', 'bold']));
        lines.emptyLine();
      }

      if (!content) {
        return lines.list.join(os.EOL);
      } else {
        if (t.isString(content)) {
          lines.add(indentArray(content.split(/\r?\n/)));
        } else if (Array.isArray(content) && content.every(t.isString)) {
          lines.add(skipIndent ? content : indentArray(content));
        } else if (Array.isArray(content) && content.every(t.isPlainObject)) {
          lines.add(columnLayout.lines(content, {
            padding: { left: '  ', right: ' ' }
          }));
        } else if (t.isPlainObject(content)) {
          if (!content.options || !content.data) {
            throw new Error('must have an "options" or "data" property\n' + JSON.stringify(content));
          }
          Object.assign({ padding: { left: '  ', right: ' ' } }, content.options);
          lines.add(columnLayout.lines(content.data.map(function (row) {
            return formatRow(row);
          }), content.options));
        } else {
          var message = 'invalid input - \'content\' must be a string, array of strings, or array of plain objects:\n\n' + JSON.stringify(content);
          throw new Error(message);
        }

        lines.emptyLine();
        return lines.list.join(os.EOL);
      }
    }
  }]);

  return Section;
}();

function indentString(string) {
  return '  ' + string;
}
function indentArray(array) {
  return array.map(indentString);
}
function formatRow(row) {
  for (var key in row) {
    row[key] = ansi.format(row[key]);
  }
  return row;
}

var Commands = function () {
  function Commands(commands) {
    _classCallCheck(this, Commands);

    this.list = commands;
  }

  _createClass(Commands, [{
    key: 'toString',
    value: function toString() {
      var list = this.list.map(function (command) {
        return {
          name: command.name,
          description: objectGet(command, 'usage.description')
        };
      });
      return columnLayout(list);
    }
  }], [{
    key: 'create',
    value: function create(commands) {
      return new this(commands);
    }
  }]);

  return Commands;
}();