/*
 *  Copyright (c) 2015-present, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var ConfigReader = require('./ConfigReader');
var nomnom = require('nomnom');
var path = require('path');

class OptionParser {
  constructor(args) {
    this._args = args;
  }

  parse() {
    var options = nomnom()
      .script('jscodeshift')
      .options({
        path: {
          position: 0,
          help: 'Files to transform',
          list: true,
          metavar: 'FILE',
          required: true
        },
        transform: {
          abbr: 't',
          default: './transform.js',
          help: 'Path to the transform file',
          metavar: 'FILE'
        },
        config: {
          help: 'Path to a configuration file',
          metavar: 'FILE'
        },
        cpus: {
          abbr: 'c',
          help: '(all by default) Determines the number of processes started.'
        },
        verbosity: {
          abbr: 'v',
          choices: [0, 1, 2],
          default: 0,
          help: 'Show more information about the transform process'
        },
        dry: {
          abbr: 'd',
          flag: true,
          help: 'Dry run (no changes are made to files)'
        },
        print: {
          abbr: 'p',
          flag: true,
          help: 'Print output, useful for development'
        }
      })
      .parse(this._args);

    var reader = new ConfigReader(options.config);
    var defaultOptions = reader.read();
    for (var key in defaultOptions) {
      if (
        defaultOptions.hasOwnProperty(key) &&
        !options.hasOwnProperty(key)
      ) {
        options[key] = defaultOptions[key];
      }
    }

    options.transform = path.resolve(options.transform);

    return options;
  }
}

module.exports = OptionParser;
