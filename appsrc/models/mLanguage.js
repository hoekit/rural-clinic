// src/models/mLanguage v0.0.2-3
/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

var mLang = {}
mLang.s = {}            // Container for language

// Return the language specific function e.g. mLang.s.en for English
mLang.useLang = lang => mLang.s[lang]

// EN strings
mLang.s.en = key => {
    var res = {
        age         : 'Age',
        allergy     : 'Med/Food Allergy',
        bloodGroup  : 'Blood Group',
        dateOfBirth : 'Date Of Birth',
        disease     : 'Disease',
        gender      : 'Gender',
        hn          : 'HN',
        login       : 'Login',
        password    : 'Password',
        pleaseWait  : 'Please wait',
        search      : 'Search',
        shortYear   : 'y',
        shortDay    : 'd',
        username    : 'Username',
    }
    return res[key] || key
}

// TH strings
mLang.s.th = key => {
    var res = {
        age         : 'อายุ',
        allergy     : 'ประวัติแพ้ยา/อาหาร',
        bloodGroup  : 'หมู่เลือด',
        dateOfBirth : 'วันเกิด',
        disease     : 'โรคประจำตัว',
        gender      : 'เพศ',
        hn          : 'HN',
        login       : 'เข้าสู่ระบบ',
        password    : 'รหัสผ่าน',
        pleaseWait  : 'โปรดรอสักครู่',
        search      : 'ค้นหา',
        shortYear   : 'ป',
        shortDay    : 'ว',
        username    : 'ชื่อผู้ใช้',
    }
    return res[key] || key
}

module.exports = mLang

