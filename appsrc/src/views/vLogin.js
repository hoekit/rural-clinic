// src/views/vLogin.js v0.0.2-1
/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

var m = require("mithril")
var vw    = require('../views/vHelper')
var mUser = require('../models/mUser')
var Env = {
    ClinicNum: 42
}

var vLogin = {
    user: '',
    pass: '',
}

vLogin.setStatus = id => {
        return msg => {
            var node = document.getElementById(id);
            m.render(node, m('div.mt2.dark-blue.tl',msg))
        }
    }

vLogin.setStatus = vw.setById('vLogin_status')
vLogin.login = () => {
    vLogin.setStatus('Please wait ...')  // Feedback that request sent

    mUser.login(vLogin.user,vLogin.pass)
    .then(() => {
        vLogin.user = vLogin.pass = ""
        vLogin.setStatus(null)
        m.route.set('/main')
    })
    .catch(err => {
        vLogin.setStatus(err)
    })
}
vLogin.view = () => {
    return m('div.tc',
        m('form.dib.ma3',[
            m('h1','Clinic #' + Env.ClinicNum + ' Login'),
            m('label.db.mt2.f6.gray.tl','Username'),
            m("input[type=text].db.mt1.w-100", {
                oninput: e => {vLogin.user = e.target.value},
                value: vLogin.user
            }),
            m('label.db.mt2.f6.gray.tl','Password'),
            m('input[type=password].db.mt1.w-100', {
                oninput: e => {vLogin.pass = e.target.value},
                value: vLogin.pass
            }),

            // Status information
            m('div#vLogin_status'),

            // Login button
            m('div.mt3',[
                m('button[type=submit]', {onclick: vLogin.login}, 'Login'),
            ]),

            /* Not implemented
            m('div.mt3.f6.black-30', [
                m('a.link.black-30', {href:'#!/forgot'}, 'Forgot Password')
            ]),
            */
        ])
    )
}

module.exports = vLogin

