// src/models/mDateOfBirth.js v0.0.2-1
/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

var mLang = require('../models/mLanguage')

var mDateOfBirth = {}

// Date
mDateOfBirth.date = null

// Methods
mDateOfBirth.fromString = YYYYMMDD => {
    mDateOfBirth.string = YYYYMMDD
    mDateOfBirth.date   = new Date(YYYYMMDD)
    return mDateOfBirth
}
mDateOfBirth.age = lang => {
    const dt1 = mDateOfBirth.date
    const now = new Date()
    const msSinceEpoch = new Date(now - dt1)
    const msPerYear = 365 * 24 * 60 * 60 * 1000
    const years = msSinceEpoch / msPerYear
    const yearsInt = Math.floor(years)
    const daysInt  = Math.floor((years - yearsInt) * 365)

    var S = mLang.useLang(lang)
    return yearsInt+S('shortYear') +' '+ daysInt+S('shortDay')
}
mDateOfBirth.toString = lang => {
    const locale = lang+'-'+lang.toUpperCase()
    const dt1 = mDateOfBirth.date
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return dt1.toLocaleDateString(locale, options)
}

module.exports = mDateOfBirth
