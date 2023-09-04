// src/models/mPatientList.js v0.0.2-2
/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

var m = require("mithril")

var mPatientList = {}

// Data
mPatientList.data = []
mPatientList.loadStatus = null      // One of: null | isLoading | loaded

// Methods
mPatientList.add = patient => {
    // Return a promise that either:
    //   resolves to a patient, successfully added to the server, or
    //   rejects with an error

    return m.request({
        method: 'POST',
        url   : '/patients',
        body  : { patient: patient },
    })

}
mPatientList.load = () => {
    // Return a promise that either:
    //   resolves to a list of patients, or
    //   rejects with an error

    return m.request({
        method: 'GET',
        url   : '/patients'
    })
    .then(res => {
        // res is a simply a list: [ reqStatus, reqData ]

        // reqStatus is One of: ok|nok
        const reqStatus = res[0]

        // reqData is a list of patient attribute values
        //   [ patientAttrValues_01, patientAttrValues_02, ... ]
        // patientAttrValues is a list of patient attribute values
        //   [ 1001,                    // hn
        //     'First Name 1001',       // firstName
        //     ...
        //   ]
        const reqData = res[1]

        // If status is ok, convert each record into an object
        if (reqStatus === 'ok') {

            // Sequence of fields in the patient data.
            // This sequence should be the same sequence as that in the
            // backend else there will be problems.
            const fields = [
                'hn'        , 'firstName'   , 'lastName',
                'dob'       , 'gender'      ,
                'disease'   , 'allergy'     , 'bloodGroup'
            ]

            // Create patientList from reqData
            const patientList = reqData.map(patientAttr => {
                var patientObj = {}

                // Add key and values to patientObj
                fields.map((key,idx) => {
                    patientObj[key] = patientAttr[idx]
                })
                return patientObj
            })

            mPatientList.data = patientList
            return mPatientList.data

        } else {
            // TODO: Case request succeeded but reqStatus is not ok
            return Promise.reject(mPatientList.data)
        }
    })
    .catch(err=> {
        // TODO: Case request did not complete successfully
        return Promise.reject(err)
    })
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
            dob                 : "2001-12-31",
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
            'dob'       , 'gender'      ,
            'disease'   , 'allergy'     , 'bloodGroup'
        ]

        // Skeleton struct for a partial patient record
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
