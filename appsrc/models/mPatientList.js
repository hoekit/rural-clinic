// src/models/mPatientList.js v0.0.2-1
/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

var mPatientList = {}

// Data
mPatientList.data = []
mPatientList.loadStatus = null      // One of: null | isLoading | loaded

// Methods
mPatientList.load = () => {
    // Return a promise that either:
    //   resolves to a list of patients, or
    //   rejects with an error

    mPatientList.data = mPatientList._mock('patientsInPart')
    return Promise.resolve(mPatientList.data)
}
mPatientList._mock = key => {
    // List of Patients with full set of attributes
    var patientsInFull = [
        {
            hn                  : 1001,
            firstName           : "First Name 1001",
            lastName            : "Last Name 1001",
            dob                 : "2000-01-01",
            age                 : "23y 249d",
            gender              : "ชาย",
            race                : "Thai",
            nationality         : "Thai",
            id                  : "1234567890ABC",
            addrNum             : "100",
            addrMoo             : "2",
            addrTambon          : "Tambon 1001",
            addrAmphur          : "Amphur 1001",
            addrProvince        : "Province 1001",
            addrPostcode        : "00000",
            phoneNum            : "0123456789",
            kinName             : "Kin Name 1001",
            kinRelation         : "Kin Relation 1001",
            kinPhoneNum         : "0123456789",
            disease             : "-",
            allergy             : "-",
            bloodGroup          : null,

            extra1              : null,
            extra2              : null,
            extra3              : null,
            extra4              : null,
            extra5              : null,
        },
        {
            hn                  : 1002,
            firstName           : "First Name 1002",
            lastName            : "Last Name 1002",
            dob                 : "2000-01-01",
            age                 : "23y 249d",
            gender              : "หญิง",
            race                : "Thai",
            nationality         : "Thai",
            id                  : "1234567890ABC",
            addrNum             : "100",
            addrMoo             : "2",
            addrTambon          : "Tambon 1002",
            addrAmphur          : "Amphur 1002",
            addrProvince        : "Province 1002",
            addrPostcode        : "00000",
            phoneNum            : "0123456789",
            kinName             : "Kin Name 1002",
            kinRelation         : "Kin Relation 1002",
            kinPhoneNum         : "0123456789",
            disease             : "-",
            allergy             : "-",
            bloodGroup          : null,

            extra1              : null,
            extra2              : null,
            extra3              : null,
            extra4              : null,
            extra5              : null,
        }
    ]

    // List of Patients with partial attributes
    var patientsInPart = patientsInFull.map(aFullPatient => {

        // List of attributes in partial patient object
        var partialFields = [
            'hn'        , 'firstName'   , 'lastName',
            'age'       , 'gender'      ,
            'disease'   , 'allergy'     , 'bloodGroup'
        ]

        var aPartialPatient = {}

        // Copy values of each field from 
        partialFields.map(pf => {
            aPartialPatient[pf] = aFullPatient[pf]
        })

        return aPartialPatient
    })

    return {
        patientsInFull : patientsInFull,
        patientsInPart : patientsInPart
    }[key]
}
mPatientList.isLoading = () => mPatientList.loadStatus === 'isLoading'
mPatientList.length = () => mPatientList.data.length


document._ = document._ || {}
document._.mPatientList = mPatientList

module.exports = mPatientList
