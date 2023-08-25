# API v0.0.2-1

## Contents<a id="toc"></a>
[
1. Patients
2. Visits
]

## Details

----
<a id="1"></a>
## 1. Patients
__ Patients

    GET /patients
        - Fetch list of all patients, partial attributes

    POST /patients
        - Adds/Creates a new patient

    GET /patient/:hn
        - Fetch all attributes of patient :hn

    POST /patient/:hn
        - Updates records of patient :hn

..

__ GET /patients

Fetch list of all patients, partial attributes

..
__   Request Data Structure:

    NONE

..
__   Response Data Structure:

    OK Response:
    [
        ok,
        [ Patients ]
    ]

    NOK Response:
    [
        nok,
        null,
        [ Errors ],
    ]

..

__ POST /patients

Task: Adds/Creates a new patient

..
__   Request:
    {
        patient: PatientObject
    }

..
__   Response:

    OK Response:
    [
        ok,
        { patient: PatientObject }
    ]
    # PatientObject has value for .hn

    NOK Response
    [
        nok
        { patient: PatientObject },
        [ Errors ]
    ]

..
__   Validation:

    [
        patient.firstName
            - non-null, non-empty

        patient.lastname
            - non-null, non-empty

        patient.dob
            - non-null, non-empty
            - format: YYYY-MM-DD (Common Era)
            - value: Must be less than or equal to today
            - value: age > 150 years => invalid

        patient.gender
            - non-null, non-empty
    ]

Possible Errors:

    1. User Error
        - Invalid request e.g. mandatory fields are invalid
    2. Server Errors:
        - DB error e.g. insert error, etc
        - Other unexpected errors

Blackbox View:

    - on success:
        - Return full patient object with HN

    - on failure: Return request object and error message

Whitebox View:

    - on success:
        - Patient is added to SQLite table

    - on failure:
        - List of causes of failure and ways to fix, if any

Design the request and response:

    - Should have a component for authentication
    - Should have a component for data

..

----
<a id="2"></a>
## 2. Visits
__ Visits

    GET /visits/:hn
        - Fetch list of visits of :hn, partial attributes

    POST /visits/:hn
        - Adds/Creates a new visit for patient :hn

    GET /visit/:hn/:visitNum
        - Fetch all attributes of visit :visitNum of patient :hn

    POST /visit/:hn/:visitNum
        - Updates attributes of visit :visitNum of patient :hn

..

