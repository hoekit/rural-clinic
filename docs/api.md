# API v0.0.3-3

## Contents<a id="toc"></a>
[
1. Patients
2. Visits
3. Template for POST requests
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

__ GET /patient/:hn

Task: Fetch all attributes of patient :hn

..
__   Request

    NONE

..
__   Response

    OK Response:
    [
        ok,
        { patient: PatientObject }
    ]

    NOK Response
    [
        ok,
        { id: patient.HN }
        [ Errors ]
    ]

..

__ POST /patient/:hn

Task: Updates records of patient :hn

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

__ DELETE /patient/:hn

Task: Deletes the record of patient :hn

..
__   Request:

    NONE

..
__   Response:

    OK Response:
    [
        ok,
        { hn: hn }
    ]

    NOK Response
    [
        nok
        { hn: hn },
        [ Errors ]
    ]

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

----
<a id="3"></a>
## 3. Template for POST requests
__ On JS Frontend

    mPatientList.add(vd.patient)
    .then(patient => {
        console.log(patient)
    })
    .catch(err => {
        // TODO
        console.log('va.add()',err)
    })

..
__ On Mojo Backend

post '/patients' => sub {
    my $c = shift;
    my $data = peek 3, decode_json($c->req->body);

    # Initialize response data
    my $res = { patient => $data };             # Response container
    my $errors = [];                            # Error container

    # Guards

    # Do action - Send nok response on error

    # Start with NotImplemented error
    push @$errors, 'NotImplemented';

    # Send nok response
    return $c->render(json => [
        'nok',
        $res,
        $errors
    ]) if $#$errors > -1;

    # Send ok response
    return $c->render(json => [
        'ok',
        $res,
    ]);

};

..

