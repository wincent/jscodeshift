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

jest
  // .dontMock('../ConfigReader')
  .dontMock('path')
  .setMock('../Process', {
    cwd() { return 'cwd'; },
    env: { home: 'home' },
    exit() {},
  });

describe('ConfigReader', () => {
  var ConfigReader;
  var Process;

  beforeEach(() => {
    jest.resetModuleRegistry();
    ConfigReader = require('../ConfigReader');
  });

  describe('getConfigPaths()', () => {
    it('includes "$PWD/.jscodeshiftrc"', () => {
      // console.log(ConfigReader.getConfigPaths());
    });
  });
});
