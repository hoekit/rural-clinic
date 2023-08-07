// src/index.js v0.0.2-2
/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

var m = require("mithril")
var vLogin    = require('./views/vLogin')

var base = document.getElementById('base')
m.route(base, '/login', {
    '/login'    : vLogin,
})

