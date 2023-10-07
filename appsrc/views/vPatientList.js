// appsrc/views/vPatientList.js v0.0.3-6
/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

var m = require("mithril")
var mPatientList = require("../models/mPatientList")
var mDateOfBirth = require("../models/mDateOfBirth")
var mLang = require('../models/mLanguage')
var Env = { ClinicNum: 42, lang: 'th' }
var S = mLang.useLang(Env.lang)

var vPatientList = {}
var vd = {}     // view-data container
var vv = {}     // view-view container
var va = {}     // view-actions container

// Data
vd.list = []
vd.search = ''
vd.delete = { "hn": -1, "state": "INIT" }

// Methods
vPatientList.oninit = () => {
    mPatientList.load()
    .then(patientList => {
        vd.list = patientList
        vd.list.map(p => {
            const dateOfBirth = mDateOfBirth.fromString(p.dob)
            p.age = dateOfBirth.age(Env.lang)
            p.dobStr = dateOfBirth.toString(Env.lang)
        })
        m.redraw()
    })
    .catch(err => {
    })
}
vPatientList.view = () => {

    return m('div.ma3',[

        // Header
        vv.header(),

        // Search
        vv.search(),

        // Patient List
        mPatientList.isLoading() ?
            m('div.mv3.black-80.ttu.tracked', 'Loading. Please wait ...') :
        mPatientList.length() === 0 ?
            m('div.mv3.black-80.ttu.tracked', 'No patients found.') :
            m('div.list.mt2', vPatientList.map(vv.patient)),
    ])
}


// Sub Views and Dialogs
vv.header = () => {
    return m('div.flex.mt2.mb2.pa0',[
        m('div.center.f2.tracked.tc','Patient List'),
        m('img.mt-auto.mw2-5.h-fit', {
            src:'/img/patient-add.png',
            onclick: () => m.route.set('/patientAdd')
        })
    ])
}
vv.search = () => {

    return m('input[type=text][autofocus].mt1.pa2.w-100.ba.br3', {
        placeholder:S('search'),
        oninput: e => {vd.search = e.target.value},
        value: vd.search
    })
}
vv.patient = patient => {
    // Renders a single patient

    // Search Regex
    var search_re = new RegExp(vd.search, 'i')

    // Guard: Only display if item matches non-zero search term
    if ((vd.search !== '') &&
        (!search_re.test(patient.firstName+patient.lastName+patient.hn))) {
        return null
    }

    var keyVal = (key,value,width) => {
        // Default width to 50% unless defined
        width = width || 50
        return m('div.w-'+width,[
            m('span.black-50.f6.mb0',S(key)+': '),
            m('br'),
            m('span',value || '??'),
        ])
    }

    // State of patient
    var pstate = patient.hn != vd.delete.hn ? "INIT" : vd.delete.state

    // border style changes according to state
    var border = {
        "INIT"    : ".bw1.b--black-20",
        "STARTED" : ".bw2.b--dark-red",
        "PENDING" : ".bw2.b--dark-red",
        "DELETED" : ".bw2.b--black-40",
        "ERROR"   : ".bw1.b--black-20",
    }[pstate]

    // background style changes according to state
    var bg = {
        "INIT"    : ".bg-white",
        "STARTED" : ".bg-washed-red",
        "PENDING" : ".bg-light-gray",
        "DELETED" : ".bg-light-gray",
        "ERROR"   : ".bg-light-gray",
    }[pstate]

    // display style changes according to state
    var disp = {
        "INIT"    : ".db",
        "STARTED" : ".dn",
        "PENDING" : ".dn",
        "DELETED" : ".dn",
        "ERROR"   : ".db",
    }[pstate]

    return m('li.mb2.pa2.ba.br3'+border+bg+'.tracked.f5', [
        m('div.mb2.ttu.b',patient.firstName+' '+patient.lastName),
        m('div.flex.mt2.mb2',[
            keyVal('gender',patient.gender,25),
            keyVal('age',patient.age,25),
            keyVal('dateOfBirth',patient.dobStr,40),
        ]),
        m('div.flex.mt2.mb2',[
            keyVal('disease',patient.disease),
            keyVal('allergy',patient.allergy),
        ]),
        m('div.flex.mt2.mb0',[
            keyVal('bloodGroup',patient.bloodGroup,25),
            keyVal('hn',patient.hn,30),
            m('img'+disp+'.ml-auto.w-1-5em.pa1.f4', {
                src:'/img/patient-edit.png',
                onclick: () => m.route.set('/patientEdit/'+patient.hn)
            }),
            m('img'+disp+'.w-1-5em.pa1.f4', {
                src:'/img/patient-delete.png',
                onclick: () => va.delete(patient.hn)
            }),
        ]),
        pstate == "STARTED" && vv.dlgConfirmDelete(patient),
        pstate == "PENDING" && vv.dlgDeletePending(patient),
        pstate == "DELETED" && vv.dlgDeleteSuccess(patient),
        pstate == "ERROR"   && vv.dlgDeleteError(patient),
    ])
}
vv.dlgConfirmDelete = patient => {
    return m('div.bg-red.ma2',[
        m('div.pt2.ttu.tracked.tc.f5',
            S('dlgDeleteRec')),
        m('div.pt2.ttu.tracked.tc.f5',
            S('dlgDeleteRecSure')),
        m('div.flex.ma2.pb2', [
            m('div.w-50.tc',[
                m('button.pl3.pr3', {
                    onclick: () => va.deleteCancel()
                }, S('dlgCancel'))
            ]),
            m('div.w-50.tc',[
                m('button.pl3.pr3', {
                    onclick: () => va.deleteConfirm(patient)
                }, S('dlgConfirm')) ]),
        ]),
    ])
}
vv.dlgDeletePending = patient => {
    return m('div.bg-silver.ma2',[
        m('div.pt2.ttu.tracked.tc.f5',
            S('dlgReqSent')),
        m('div.pb2.ttu.tracked.tc.f5', [
            m('div.dib',S('dlgWaitResp')),
            m('div.dib.loader.ml2')
        ]),
    ])
}
vv.dlgDeleteSuccess = patient => {
    return m('div.bg-light-green.ma2',[
        m('div.pt2.pb2.ttu.tracked.tc.f5',
            S('dlgDeletePatientOk')),
        m('div.flex.ma2.pb2', [
            m('div.w-100.tc',[
                m('button.w-30', {
                    onclick: () => va.deleteDone()
                }, S('dlgOk'))
            ]),
        ]),

    ])
}
vv.dlgDeleteError = patient => {
    return m('div.bg-red.ma2',[
        m('div.pt2.ttu.tracked.tc.f5',
            S('dlgDeletePatientNok')),
        m('div.pt2.ttu.tracked.tc.f5', [
            m('div',S('dlgTryAgain')),
        ]),
        m('div.flex.ma2.pb2', [
            m('div.w-50.tc',[
                m('button', {
                    onclick: () => va.deleteCancel()
                }, S('dlgCancel'))
            ]),
            m('div.w-50.tc',[
                m('button', {
                    onclick: () => va.deleteConfirm(patient)
                }, S('dlgRetry'))
            ]),
        ]),
    ])
}


// View Actions
va.delete = hn => {
    // Action when user clicks on delete button on bottom right of
    // patient record
    vd.delete.hn = hn
    vd.delete.state = "STARTED"
}
va.deleteCancel = () => {
    // Action when user cancels a delete
    vd.delete.hn = -1
    vd.delete.state = "INIT"
}
va.deleteConfirm = patient => {
    console.log('Confirm Deletion: ' + patient.hn)
    vd.delete.state = "PENDING"

    mPatientList.deleteItem(patient.hn)
    .then(res => {
        vd.delete.state = "DELETED"
    })
    .catch(err => {
        vd.delete.state = "ERROR"
    })
}
va.deleteDone = patient => {
    vd.delete.hn = -1
    vd.delete.state = "INIT"
    vPatientList.oninit()
}


// Convenience functions to make vPatientList appear like a list
vPatientList.map = func => vd.list.map(func)


// Attach objects to view
vPatientList.va = va
vPatientList.vd = vd
vPatientList.vv = vv

module.exports = vPatientList
