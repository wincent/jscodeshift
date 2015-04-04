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

var Process = require('./Process');
var fs = require('fs');
var logError = require('./util/logError');
var path = require('path');

class ConfigReader {
  static getConfigPaths() {
    var isWindows = Process.platform === 'win32';
    var paths = [
      [Process.cwd(), '.jscodeshiftrc'],
      [Process.env[isWindows ? 'USERPROFILE' : 'HOME'], '.jscodeshiftrc'],
      [isWindows ? Process.env['ALLUSERSPROFILE'] : '/etc/jscodeshiftrc'],
    ];
    return paths.map(resolvable => path.resolve.apply(path, resolvable));
  }

  constructor(configPath) {
    this._configPath = configPath;
  }

  read() {
    var configPath = this._configPath;

    if (!configPath) {
      var candidatePaths = ConfigReader.getConfigPaths();
      for (var i = 0; i < candidatePaths.length; i++) {
        var candidate = candidatePaths[i];
        if (fs.existsSync(candidate)) {
          configPath = candidate;
          break;
        }
      }
    }

    if (configPath) {
      var config = path.resolve(configPath);
      if (!fs.existsSync(config)) {
        logError('Config file "%s" does not exist', config);
        Process.exit(1);
      }
      try {
        return JSON.parse(fs.readFileSync(config));
      } catch(error) {
        logError('Failed to parse config file "%s": %s', config, error);
        Process.exit(1);
      }
    }
  }
}

module.exports = ConfigReader;
