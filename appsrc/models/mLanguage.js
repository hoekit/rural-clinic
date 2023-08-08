// src/models/mLanguage v0.0.2-1
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
    return {
        login       : 'Login',
        username    : 'Username',
        password    : 'Password',
        pleaseWait  : 'Please wait',
    }[key]
}

// TH strings
mLang.s.th = key => {
    var key2string = {
        login       : 'เข้าสู่ระบบ',
        username    : 'ชื่อผู้ใช้',
        password    : 'รหัสผ่าน',
        pleaseWait  : 'โปรดรอสักครู่',
    }
    return key2string[key]
}

module.exports = mLang

