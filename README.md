[![view on npm](http://img.shields.io/npm/v/command-line-commands.svg)](https://www.npmjs.org/package/command-line-commands)
[![npm module downloads](http://img.shields.io/npm/dt/command-line-commands.svg)](https://www.npmjs.org/package/command-line-commands)
[![Build Status](https://travis-ci.org/75lb/command-line-commands.svg?branch=master)](https://travis-ci.org/75lb/command-line-commands)
[![Dependency Status](https://david-dm.org/75lb/command-line-commands.svg)](https://david-dm.org/75lb/command-line-commands)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

# command-line-commands
Add a git-like command interface to your app.

This lightweight module is intended to compliment, not extend your existing option-parsing solution. Given a list of valid command strings, `.parse()` will either throw (invalid command) or return two pieces of information: the supplied command and any remaining command-line args.

## Synopsis

Create a list of valid commands (`null` represents "no command"). Supply it to `.parse()`, receiving back an object with two properties: `command` (the supplied command) and `argv` (the remainder of the command line args):
```js
const commandLineCommands = require('command-line-commands')

const validCommands = [ null, 'clean', 'update', 'install' ]
const { command, argv } = commandLineCommands.parse(validCommands)

console.log('command: %s', command)
console.log('argv:    %s', JSON.stringify(argv))
```

Assuming the above script is installed as `example`:
```
$ example
command: null
argv:    []

$ example --verbose
command: null
argv:    ["--verbose"]

$ example --version
command: null
argv:    ["--version"]

$ example install --save something
command: install
argv:    ["--save","something"]

$ example remove
/Users/lloydb/Documents/75lb/command-line-commands/lib/command-line-commands.js:39
    throw err
    ^

INVALID_COMMAND: Invalid command: remove
    at Object.parse (/Users/lloydb/Documents/75lb/command-line-commands/lib/command-line-commands.js:36:17)
    etc..
```

From here, you are free to make a decision based on the command and remaining args supplied.

## Usage Examples

- [Simple](https://github.com/75lb/command-line-commands/blob/next/example/simple.js): A basic example showing usage alongside [command-line-args](https://github.com/75lb/command-line-args).
- [Advanced](https://github.com/75lb/command-line-commands/blob/next/example/advanced/git.js): A more complete example, based on git. 

# API Reference
<a name="exp_module_command-line-commands--parse"></a>

### parse(commands, [argv]) ⇒ <code>Object</code> ⏏
**Kind**: Exported function  
**Throws**:

- `INVALID_COMMAND`


| Param | Type | Description |
| --- | --- | --- |
| commands | <code>Array.&lt;string&gt;</code> | A list of valid commands. May include `null`. |
| [argv] | <code>Array.&lt;string&gt;</code> | A argv array. |


* * *

&copy; 2015-16 Lloyd Brookes \<75pound@gmail.com\>. Documented by [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown).
