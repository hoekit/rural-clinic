// appsrc/models/mLanguage v0.0.3-6
/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

var mLang = {}
mLang.s = {}            // Container for language
mLang.lang = 'th'       // Default language

// Function that returns language specific string
mLang.S = key => mLang.s[mLang.lang](key)

// Specify which language to use. Return mLang.S
mLang.useLang = lang => {
    mLang.lang = lang
    return mLang.S
}

// EN strings
mLang.s.en = key => {
    var res = {
        age         : 'Age',
        allergy     : 'Med/Food Allergy',
        bloodGroup  : 'Blood Type',
        dateOfBirth : 'Date Of Birth',
        disease     : 'Disease',
        gender      : 'Gender',
        hn          : 'HN',
        login       : 'Login',
        password    : 'Password',
        pleaseWait  : 'Please wait',
        search      : 'Search by name and hn',
        shortYear   : 'y',
        shortDay    : 'd',
        username    : 'Username',

        firstName   : 'First Name',
        lastName    : 'Last Name',
        dob         : 'Date Of Birth',
        idcard      : 'ID Card',
        phoneNum    : 'Phone Number',
        race        : 'Race',
        nationality : 'Nationality',
        addrNum     : 'No.',
        addrMoo     : 'Moo',
        addrStreet  : 'Street',
        addrTambon  : 'Tambon',
        addrAmphur  : 'Amphur',
        addrProvince: 'Province',
        addrPostcode: 'Postcode',
        contactName : 'Contact Name',
        contactRelation : 'Contact Relation',
        contactPhoneNum : 'Phone Number',

        submit      : 'Submit',

        // Dialog messages
        dlgDeleteRec: 'This record will be deleted!',
        dlgDeleteRecSure: 'Are you sure?',
        dlgCancel: 'Cancel',
        dlgConfirm: 'Confirm',
        dlgRetry: 'Retry',
        dlgReqSent: 'Request sent.',
        dlgWaitResp: 'Waiting for server response.',
        dlgDeletePatientOk: 'Patient Delete Success!',
        dlgDeletePatientNok: 'Patient Delete Failed!',
        dlgTryAgain: 'Please try again.',
        dlgOk: 'OK',

        // Error messages
        e2101       : 'First Name cannot be empty',
        e2102       : 'Last Name cannot be empty',
        e2103       : 'Gender cannot be empty',
        e2104       : 'DOB cannot be empty',
        e2105       : 'YYYY-MM-DD',
        e2106       : 'Month is invalid',
        e2107       : 'Day is invalid',
        e2108       : 'Date is invalid',
        e2109       : 'Not born yet!',
        e2110       : 'Over 200 years old!',
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
        search      : 'ค้นหาตามชื่อและHN',
        shortYear   : 'ป',
        shortDay    : 'ว',
        username    : 'ชื่อผู้ใช้',

        firstName   : 'ชื่อ',
        lastName    : 'สกุล',
        dob         : 'วันเกิด',
        idcard      : 'บัตรประชาชน',
        phoneNum    : 'เบอร์โทรศัพท์',
        race        : 'เชื้อชาติ',
        nationality : 'สัญชาติ',
        addrNum     : 'บ้านเลขที่',
        addrMoo     : 'หมู่',
        addrStreet  : 'ถนน',
        addrTambon  : 'ตำบล',
        addrAmphur  : 'อำเภอ',
        addrProvince: 'จังหวัด',
        addrPostcode: 'รหัสไปรษณีย์',

        contactName : 'ผู้ที่ติดต่อได้',
        contactRelation : 'ระบุสัมพันธ์ภาพ',
        contactPhoneNum : 'เบอร์โทรผู้ที่ติดต่อได้',

        submit      : 'บันทึก',

        // Dialog messages
        dlgDeleteRec: 'รายการนี้จะถูกลบ!',
        dlgDeleteRecSure: 'คุณแน่ใจไหม',
        dlgCancel: 'ยกเลิก',
        dlgConfirm: 'ยืนยัน',
        dlgRetry: 'ลองอีกครั้ง',
        dlgReqSent: 'ส่งคำสั่งไปแล้ว',
        dlgWaitResp: 'กำลังรอการตอบกลับจากเซิร์ฟเวอร์',
        dlgDeletePatientOk: 'รายการนี้ถูกลบสำเร็จ',
        dlgDeletePatientNok: 'รายการนี้ไม่ถูกลบ',
        dlgTryAgain: 'กรุณาลองอีกครั้ง',
        dlgOk: 'ตกลง',



        // Error messages
        e2101       : 'ชื่อ ต้องมีค่า',
        e2102       : 'สกุล ต้องมีค่า',
        e2103       : 'ต้องมีค่า',
        e2104       : 'ต้องมีค่า',
        e2105       : 'ปปปป-ดด-วว',
        e2106       : 'เดือนไม่ถูกต้อง',
        e2107       : 'วันไม่ถูกต้อง',
        e2108       : 'ไม่มีวันดังกล่าว',
        e2109       : 'ยังไม่เกิด',
        e2110       : 'อายุเกิน200ปี',
    }
    return res[key] || key
}

module.exports = mLang

