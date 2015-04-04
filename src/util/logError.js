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

var clc = require('cli-color');

function logError(message) {
  var args = Array.prototype.slice.apply(arguments);
  args[0] = clc.whiteBright.bgRed('ERROR') + ' ' + message
  console.log.apply(console, args);
}

module.exports = logError;
