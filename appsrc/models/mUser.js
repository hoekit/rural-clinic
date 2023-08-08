// src/models/mUser.js v0.0.1-1
/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

var mUser = {}
mUser.login = (user,pass) => {
    // Checks if credentials are correct. Returns a Promise.

    // Mock success
    return Promise.resolve()

    // Mock failure
    return Promise.reject('Login Failed.')
}

module.exports = mUser
