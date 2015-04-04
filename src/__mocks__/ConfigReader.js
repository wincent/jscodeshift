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

/**
 * We mock the ConfigReader in the test environment in order to isolate us from
 * `/etc/jscodeshiftrc` and `~/.jscodeshiftrc` which may exist on the local
 * system.
 */
class ConfigReader {
  static getConfigPaths() {
    return [];
  }

  read() {
    return {};
  }
}

module.exports = ConfigReader;
