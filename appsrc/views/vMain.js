// src/views/vMain.js v0.0.2-1
/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/*

vMain - Main page that handles setup and routing to other pages.

At the momment, it simply redirects to vPatientList.

 */


var m = require("mithril")
var Env = {
    ClinicNum: 42
}

var vMain = {}
vMain.view = () => {
    return m.route.set('/patientList')
}

module.exports = vMain

