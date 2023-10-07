// appsrc/models/mDebug.js v0.0.3-3
/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

var Env = 'DEV'

var init = function (tt) {

    // Add each module to debug
    [ 'mPatientList',
      'vPatientList', 'vPatientAdd', 'vPatientEdit'
    ].map(mod => {
        var dir
        if (mod[0] === 'm') { dir = 'models' }
        if (mod[0] === 'v') { dir = 'views' }

        // Load the module using require
        tt[mod] = require("../"+dir+"/"+mod)
    })

}

// Initialize when
// 1. DEV or TEST environment
// 2. Has not been initialized
if (Env.match(/DEV|TEST/) && !window.tt) {
    window.tt = window.tt || {}
    init(window.tt)
}

