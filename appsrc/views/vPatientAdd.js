// src/views/vPatientAdd.js v0.0.2-1
/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

var m     = require("mithril")
var mLang = require('../models/mLanguage')
// mLang.useLang('en')
var S     = mLang.S
var mPatientList = require("../models/mPatientList")

var vPatientAdd = {}
var vd = {}     // view-data container
var va = {}     // view-action container

// vPatient View
vd.patient = {}
vd.error   = {}
vPatientAdd.view = () => {

    // TODO: Remove mock
    /*
    if (vd.patient.firstName === undefined) {
        vd.patient = _mockPatient()
    }
    */

    // A single input element
    var elemInput = (field, width, attr) => {
        var border = vd.error[field] ? '.b--dark-red' : ''
        attr = attr ? attr : '[type=text]'
        attr = attr + '[id=add-'+field+']'
        return m('div.w-'+width,[
            m('label.w-100.mt2.f5.mid-gray.tl',S(field)),
            m("input"+attr+".w-100.mt1.mb2.ba"+border, {
                oninput: e => {vd.patient[field] = e.target.value},
                onfocusout: e => va._validate(field),
                value: vd.patient[field],
            }),
            vd.error[field] && m('div.w-100.mb2.dark-red.f5',S(vd.error[field])),
        ])
    }

    // A row of 0-5 input elements
    var rowInput = (e1,e2,e3,e4,e5) => {
        // e1 is an array e.g. ['dob',33], use spread operator ...e1
        return m('div.flex.mb1', [
            // elemInput.apply(this,e1),
            e1 ? elemInput(...e1) : null,,
            e2 ? elemInput(...e2) : null,
            e3 ? elemInput(...e3) : null,
            e4 ? elemInput(...e4) : null,
            e5 ? elemInput(...e5) : null,
        ])
    }

    return m('div.mt3.mb3', [

        // Header
        m('div.flex.mt2.mb2.pa0',[
            m('img.mt-auto.mw2-5.h-fit', {
                src:'/img/page-back.png',
                onclick: va.back
            }),
            m('div.center.f2.tracked.tc','Patient Add'),
        ]),

        // Form
        m('form.mt3', [
            rowInput(
                ['firstName',35],
                ['lastName',35],
                ['gender',10],
                ['dob',20],
            ),
            rowInput(
                ['race',20],
                ['nationality',20],
                ['idcard',30],
                ['phoneNum',20],
                ['bloodGroup',15],
            ),
            rowInput(
                ['disease',50],
                ['allergy',50],
            ),
            rowInput(
                ['addrNum',10],
                ['addrMoo',10],
                ['addrTambon',20],
                ['addrAmphur',30],
                ['addrProvince',30]
            ),
            rowInput(
                ['contactName',40],
                ['contactRelation',30],
                ['contactPhoneNum',30]
            ),

            m('div.red.f6', vd.formError),
            m('div.blue.f6', vd.formInfo),

            m('button[type=submit].w-100.mt2.pa2',
                {onclick:va.add},
                S('submit')
            ),
        ]),
    ])
}

// vPatient View Actions
va.back = () => m.route.set('/patientList')
va.add = () => {

    // Validate one more time
    va._validate('firstName')
    va._validate('lastName')
    va._validate('gender')
    va._validate('dob')

    // Display errors effects
    m.redraw()

    // Guard: There should be no errors
    if (Object.keys(vd.error).length > 0) return

    // Clone vd.patient
    var patient = Object.assign({}, vd.patient)

    // Convert dob to Common Era date if current language is TH
    if (mLang.lang === 'th') {
        const re = /(\d\d\d\d)(-\d\d-\d\d)/
        var bornYearCe = parseInt(patient.dob.match(re)[1]) - 543
        patient.dob = bornYearCe + patient.dob.match(re)[2]
    }

    mPatientList.add(patient)
    .then(res => {

        if (res[0] === 'nok') {         // Show error message
            vd.formError = res[2][0]
            vd.formInfo  = null

        } else if (res[0] === 'ok') {   // Handle 'ok' case
            vd.formError = null
            vd.formInfo  = [
                'Patient Added: ', vd.patient.firstName, vd.patient.lastName
            ].join(' ')

            document.getElementById("add-firstName").focus();
            vd.patient   = {}
            // Clear Info after 2 seconds
            window.setTimeout(() => { vd.formInfo = null },2)

        } else {                        // Die. Should not reach here
            vd.formError = 'Unexpected error. Please inform administrator.'
            vd.formInfo  = null

        }

    })
    .catch(err => {
        // console.log('va.add()',err)
        vd.formError = err
        vd.formInfo  = null
    })
}
va._validate = field => {
    // Trim if field value exists
    vd.patient[field] = vd.patient[field]
                      ? vd.patient[field].trim()
                      : vd.patient[field]

    // Validate selected fields
    field === 'firstName' && va._validateFirstName(vd.patient[field])
    field === 'lastName'  && va._validateLastName(vd.patient[field])
    field === 'gender'    && va._validateGender(vd.patient[field])
    field === 'dob'       && va._validateDob(vd.patient[field])
}
va._validateFirstName = val => {
    if (!val) {
        vd.error['firstName'] = 'e2101'
    } else {
        delete vd.error['firstName']
    }
}
va._validateLastName = val => {
    if (!val) {
        vd.error['lastName'] = 'e2102'
    } else {
        delete vd.error['lastName']
    }
}
va._validateGender = val => {
    if (!val) {
        vd.error['gender'] = 'e2103'
    } else {
        delete vd.error['gender']
    }
}
va._validateDob = val => {

    if (!val) {
        vd.error['dob'] = 'e2104'

    } else if ( !_dobFormatValid(val) ) {
        vd.error['dob'] = 'e2105'

    } else if ( !_dobMonthValid(val) ) {
        vd.error['dob'] = 'e2106'

    } else if ( !_dobDayValid(val) ) {
        vd.error['dob'] = 'e2107'

    } else if ( !_dobDateValid(val) ) {
        vd.error['dob'] = 'e2108'

    } else if ( _dobNotBorn(val, mLang.lang) ) {
        vd.error['dob'] = 'e2109'

    } else if ( _dobTooOld(val, mLang.lang) ) {
        vd.error['dob'] = 'e2110'

    } else {
        delete vd.error['dob']
    }

    vd.error['dob'] && console.log('error:dob',vd.error['dob'],S(vd.error['dob']))
}

var _dobFormatValid = dob => {
    // Return true if matches YYYY-MM-DD
    const re = /\d\d\d\d-\d\d-\d\d/
    // console.log(dob,re.test(dob))
    return re.test(dob)
}
var _dobMonthValid = dob => {
    // Return true if month is valid
    const re = /\d\d\d\d-(\d\d)-\d\d/
    var month = parseInt(dob.match(re)[1])
    return (month > 0) && (month < 13)
}
var _dobDateValid = dob => {
    // Return true if dob is a valid date
    // - valueOf() invalid date is NaN
    return Number.isNaN( new Date(dob).valueOf() ) === false
}
var _dobDayValid = dob => {
    // Return true if day value is valid
    const re = /\d\d\d\d-\d\d-(\d\d)/
    var day = parseInt(dob.match(re)[1])
    return (day > 0) && (day < 31)
}
var _dobNotBorn = (dob,lang) => {
    // Return true if date is Buddhist Era
    // Thai Buddhist Era dates have years = Common Era + 543
    const re = /(\d\d\d\d)-\d\d-\d\d/
    var extraBuddhistEraYears = lang === 'th' ? 543 : 0
    var bornYearCe = parseInt(dob.match(re)[1]) - extraBuddhistEraYears
    var thisYearCe = new Date().getFullYear()

    var age = thisYearCe - bornYearCe
    // console.log(bornYearCe,thisYearCe,age)
    return age < 0
}
var _dobTooOld = (dob,lang) => {
    // Return true if date is Buddhist Era
    // Thai Buddhist Era dates have years = Common Era + 543
    const re = /(\d\d\d\d)-\d\d-\d\d/
    var extraBuddhistEraYears = lang === 'th' ? 543 : 0
    var bornYearCe = parseInt(dob.match(re)[1]) - extraBuddhistEraYears
    var thisYearCe = new Date().getFullYear()

    var age = thisYearCe - bornYearCe
    // console.log(bornYearCe,thisYearCe,age)
    return age > 130
}
var _mockPatient = () => {
    return {
        firstName   : 'First',
        lastName    : 'Last',
        gender      : 'M',
        dob         : '2561-01-01',
    }
}

vPatientAdd.vd = vd
vPatientAdd.va = va

module.exports = vPatientAdd

