// src/views/vPatientList.js v0.0.2-1
/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

var m = require("mithril")
var mPatientList = require("../models/mPatientList")
var mLang = require('../models/mLanguage')
var Env = { ClinicNum: 42 }
var S = mLang.useLang('th')

var vPatientList = {}

// Data
vPatientList.data = []
vPatientList.search = ''
vPatientList.isLoading = false

// Methods
vPatientList.oninit = () => {
    mPatientList.load()
    .then(patientList => {
        vPatientList.data = patientList
        m.redraw()
    })
    .catch(err => {
    })
}
vPatientList.view = () => {

    // Renders a single patient
    var patient_view = patient => {

        var keyVal = (key,value,width) => {
            // Default width to 50% unless defined
            width = width || 50
            return m('div.w-'+width,[
                m('span.black-50',S(key)+': '),
                m('span',value || '??'),
            ])
        }

        return m('li.mb2.pa2.ba.br3.b--black-20.tracked.f5', [
            m('div.mb2.ttu.b',patient.firstName+' '+patient.lastName),
            m('div.flex.mt2.mb2',[
                keyVal('age',patient.age),
                keyVal('gender',patient.gender)
            ]),
            m('div.flex.mt2.mb2',[
                keyVal('bloodGroup',patient.bloodGroup)
            ]),
            m('div.flex.mt2.mb0',[
                keyVal('hn',patient.hn),
                m('img.db.ml-auto.w-1em.pa1.f4', {
                    src:'/img/patient-edit.png',
                    onclick: () => console.log('Edit Patient')
                }),
                m('img.db.w-1em.pa1.f4', {
                    src:'/img/patient-delete.png',
                    onclick: () => console.log('Delete Patient')
                }),
            ]),
        ])
    }

    return m('div.ma3',[

        // Header
        m('h1.tc','Patient List'),

        // Search
        m('input[type=text][autofocus].mt1.w-100', {
            placeholder:S('search'),
            oninput: e => {vPatientList.search = e.target.value},
            value: vPatientList.search
        }),

        // Patient List
        mPatientList.isLoading() ?
            m('div.mv3.black-80.ttu.tracked', 'Loading. Please wait ...') :
        mPatientList.length() === 0 ?
            m('div.mv3.black-80.ttu.tracked', 'No patients found.') :
            m('div.list.mt2', vPatientList.map(patient_view)),
    ])
}

// Convenience functions to make vPatientList appear like a list
vPatientList.map = func => vPatientList.data.map(func)

module.exports = vPatientList
