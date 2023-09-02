# Tables v0.0.2-1

## Contents<a id="toc"></a>
[
1. Patients
]

## Details

----
<a id="1"></a>
## 1. Patients
__ File: Patient.db
..
__ CREATE TABLE

-- Patient: 22 Columns
CREATE TABLE Patient (
    hn              INT             NOT NULL,
    firstName       CHAR(64)        NOT NULL,
    lastName        CHAR(64)        NOT NULL,
    dob             CHAR(10)        NOT NULL,
    gender          CHAR(16)        NOT NULL,

    disease         TEXT,
    allergy         TEXT,
    bloodGroup      TEXT,
    phoneNum        TEXT,

    race            TEXT,
    nationality     TEXT,
    idcard          TEXT,

    addrNum         TEXT,
    addrMoo         TEXT,
    addrStreet      TEXT,
    addrTambon      TEXT,
    addrAmphur      TEXT,
    addrProvince    TEXT,
    addrPostcode    TEXT,

    contactName     TEXT,
    contactRelation TEXT,
    contactPhoneNum TEXT,

    PRIMARY KEY (hn)
);

..
__ INSERT

    INSERT INTO Patient VALUES (
        "",     -- hn              INT             NOT NULL,
        "",     -- firstName       CHAR(64)        NOT NULL,
        "",     -- lastName        CHAR(64)        NOT NULL,
        "",     -- dob             CHAR(10)        NOT NULL,
        "",     -- gender          CHAR(16)        NOT NULL,

        "",     -- disease         TEXT,
        "",     -- allergy         TEXT,
        "",     -- bloodGroup      TEXT,
        "",     -- phoneNum        TEXT,

        "",     -- race            TEXT,
        "",     -- nationality     TEXT,
        "",     -- idcard          TEXT,

        "",     -- addrNum         TEXT,
        "",     -- addrMoo         TEXT,
        "",     -- addrStreet      TEXT,
        "",     -- addrTambon      TEXT,
        "",     -- addrAmphur      TEXT,
        "",     -- addrProvince    TEXT,
        "",     -- addrPostcode    TEXT,

        "",     -- contactName     TEXT,
        "",     -- contactRelation TEXT,
        ""      -- contactPhoneNum TEXT
    );

..
__ INSERT via run_sql

    $sqlres = run_sql( $dbpatient, <<END
INSERT INTO Patient
SELECT COALESCE(Max(hn),0)+1, ?,
           ?, ?, ?, ?, ?,
           ?, ?, ?, ?, ?,
           ?, ?, ?, ?, ?,
           ?, ?, ?, ?, ?
  FROM Patient;
END
    ,
        $data->{patient}{firstName} || undef,
        $data->{patient}{lastName} || undef,
        $data->{patient}{gender} || undef,
        $data->{patient}{dob} || undef,
        '', '',
        '', '', '', '', '',
        '', '', '', '', '',
        '', '', '', '', '',
    );

..

