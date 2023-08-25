// src/index.js v0.0.2-4
/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

var m = require("mithril")
var vMain        = require('./views/vMain')
var vLogin       = require('./views/vLogin')
var vPatientList = require('./views/vPatientList')
var vPatientAdd  = require('./views/vPatientAdd')

var base = document.getElementById('base')
m.route(base, '/main', {
    '/main'         : vMain,
    '/login'        : vLogin,
    '/patientList'  : vPatientList,
    '/patientAdd'   : vPatientAdd,
})


