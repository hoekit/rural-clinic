# Data Structures v0.0.2-1

## Contents<a id="toc"></a>
[
1. Patient
]

## Details

----
<a id="1"></a>
## 1. Patient
__ Patient (Partial)

    .hn
        - Type      : Integer
        - Value     : System generated. Starts from 1000; future proofing
        - Mandatory : Yes

    .firstName
        - Type      : String
        - Mandatory : Yes

    .lastName
        - Type      : String
        - Mandatory : Yes

    .dob
        - Type      : String
        - Format    : YYYY-MM-DD
        - Mandatory : Yes

        .dobStr*
            - Type      : String
            - Value     : Derived from dob

        .age*
            - Type      : String
            - Value     : Derived from dob

    .gender
        - Type      : String
        - Mandatory : Yes

    .disease
        - Type      : String
        - Mandatory : No

    .allergy
        - Type      : String
        - Mandatory : No

    .bloodGroup
        - Type      : String
        - Mandatory : No

    .phoneNum
        - Type      : String
        - Mandatory : No

..
__ Patient (Remaining)

    .race
        - Type      : String
        - Mandatory : No

    .nationality
        - Type      : String
        - Mandatory : No

    .idcard
        - Type      : String
        - Mandatory : No

    .addrNum
        - Type      : String
        - Mandatory : No

    .addrMoo
        - Type      : String
        - Mandatory : No

    .addrTambon
        - Type      : String
        - Mandatory : No

    .addrAmphur
        - Type      : String
        - Mandatory : No

    .addrProvince
        - Type      : String
        - Mandatory : No

    .addrPostcode
        - Type      : Integer
        - Mandatory : No

    .contactName
        - Type      : String
        - Mandatory : No

    .contactRelation
        - Type      : String
        - Mandatory : No

    .contactPhoneNum
        - Type      : String
        - Mandatory : No

..

