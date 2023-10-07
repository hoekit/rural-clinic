# Clinic - Keeping patient records for a small clinic

## Contents<a id="toc"></a>
[
1. Context
2. Scenarios and Specifications
3. Data Design
4. System Design
5. Improvement Ideas
6. Create the skeleton
7. Setup a simple mithril app
8. What versions are in use?
9. Problem: Public seems over exposed
10. Problem: If laptop dies, project is gone
11. VERSION 0.0.1
12. Problem: Perl on Windows
13. Problem: Add a login page
14. Problem: Versioning the source files
15. Problem: Styling page elements
16. Problem: Starting at the login page
17. Problem: On startup, prompt is at username input
18. Problem: Need strings to be in another language
19. Problem: Directory structure is unnecessarily deep
20. Problem: Add the patient list page
21. Problem: Need to mockup list of patient data
22. Problem: How to generate incremental HN number
23. Problem: Mithril is not auto-redrawing
24. Problem: Align images to the right of space
25. Problem: Replace mock data in JS with mock data from Server
26. Design: The API
27. Problem: Confusion between DOB and age
28. Problem: Find difference between two dates
29. Problem: Display date in CE and BE formats
30. Problem: Restarting the project after a hiatus
31. Problem: Implement adding a new patient
32. Coding: Naming conventions
33. Design: Data Structures
34. Design: Frontend Page
35. Design: SQLite tables
36. Problem: How to layout page title with icons
37. Problem: How to remove inner shadow of text input
38. Problem: How to use regex to check date format?
39. Problem: How to extract year from YYYY-MM-DD
40. Problem: How to get current year
41. Problem: Building project on new machine
42. Problem: Speed up time to work on project
43. Problem: Make debugging structures easy
44. Problem: Implement search
45. VERSION 0.0.2
46. Problem: Implement Patient Edit
47. VERSION 0.0.3
48. Problem: Implement Patient Delete
]

## Details

----
<a id="1"></a>
## 1. Context
__ Context

- Hwan has opened a clinic and would like a program to keep patient
  records of patient visits.

..

----
<a id="2"></a>
## 2. Scenarios and Specifications
__ Scenarios

Existing patient walks in:

- Hwan types in the firstname in a search box and matching patient
  records are returned.

- Looking at the patient records, Hwan is able to see the following
  details of the previous visit:

    - Vital Statistics
    - Description of symptoms
    - Medication
    - Total charge

..
__ Specifications
..
__   Patient List

- Has a search box
    - Can search by patient name

- Has a list of patients
    - Each patient
        - Shows patient info: First Name, Last Name, Gender, Age
    - Can edit patient info
    - Can view patient visit history

- Can add a new patient

..
__   Patient Visit History

- Show patient info
- Show vital stats
- Show description
- Show medication + total charge

..
__ Constraints

- Runs on Windows

..

----
<a id="3"></a>
## 3. Data Design
__ Clinic

- Clinic Number                             ClinicNum
- Clinic Name                               ClinicName
- Clinic Address                            ClinicAddr

..
__ Patient

- Patient Number                            PatientNum          Integer
    - Auto-generated
    - Starts at 1000, future proofing

- First Name                                PatFirstName        String
- Last Name                                 PatLastName         String

- Date of Birth (DOB)                       PatDOB              Date
- Age (Calculated from DOB)                 PatAge              String

- Gender                                    PatGender           Enum
- Race
- Nationality
- ID Card Number

- Address Number
- Address Moo
- Address Tambon
- Address Amphur
- Address Province
- Address Postcode

- Phone Number

- Contact Name
- Contact Relation
- Contact Phone Number

- Congenital Disease
- Allergy (Food/Medicine)
- Blood Group

..
__ PatientVisit

- Patient Number                            PatientNum          Integer
- Visit Number                              VisitNum            Integer
- Visit Date                                VisitDate           Date
- Visit Vital Stats                         VisitVitalStats     JSON List
- Visit Description                         VisitDesc           Text
- Visit Medication List                     VisitMeds           JSON Obj
- Visit Bill Amount                         VisitBillAmt        Integer

..

----
<a id="4"></a>
## 4. System Design
__ System Design

- WebApp for UI
    - UI should be dual-language
- Mojolicious for Backend
- SQLite for Database
- Syncthing for Backup/Replication

..

----
<a id="5"></a>
## 5. Improvement Ideas
__ Create default values for selected fields

- Example fields and values:
    - Clinic Number: 42
    - Race: Thai
    - Nationality: Thai

..
__ Make it easy to enter previous data like GnuCash

- For selected fields like "Address Tambon", store a list of the ten
  most used strings and use that as the drop-down.
- Make the list configurable e.g.
    - "Address Tambon" stores the twenty (20) most common,
    - "Address Postcode" stores the ten (10) most common
- Or instead of the most common, store the last N-values used

..
__ Create static pages as fallback

- In a separate folder e.g. public/clinic

- Whenever a user is created, e.g. patient num 1000
    - Create folder:
        - public/clinic/pat1000
    - Create static file:
        - public/clinic/pat1000/patient.html

- When patient num 1000 makes the first visit:
    - Create a static file
        - public/clinic/pat1000/visit1.html

..

----
<a id="6"></a>
## 6. Create the skeleton
__ Able to start the server and access via the web page
..

----
<a id="7"></a>
## 7. Setup a simple mithril app
__ Tutorial

    # Refresher
    https://mithril.js.org/simple-application.html

..
__ Install NodeJS

- Installed v18.17.0 prebuilt Linux Binaries (x64)
    - LTS version as of 06 Aug 2023
    - Comes with npm 9.6.7

..
__ Install Mithril with Webpack

Steps: https://mithril.js.org/installation.html

Init directory as npm package:

    cd public
    npm init --yes

Install required packages:
    npm install mithril --save
        - adds 13 packages
    npm install webpack webpack-cli --save-dev
        - adds 117 packages 🤔

..
__ package.json and Webpack 5:

The installation page needs to be updated for Webpack 5

    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
      "start": "webpack ./src/index.js --mode=development --watch",
      "build": "webpack ./src/index.js --mode=production"
    },

By default, output file is placed into dist/main.js.

..

----
<a id="8"></a>
## 8. What versions are in use?
__ versions

- Nodejs: 18.17.0
    - npm: 9.6.7

- webpack: 5.88.2
- webpack-cli: 5.1.4

- mithril: 2.2.2

- tachyons: [4.12.0](https://raw.githubusercontent.com/tachyons-css/tachyons/master/css/tachyons.min.css)

..

----
<a id="9"></a>
## 9. Problem: Public seems over exposed
__ There's too much junk in public

Folders like node_modules and src shouldn't be in public. Ditto for
the package*.* files:

    drwxrwxr-x   2 hoekit hoekit  4096 Aug  6 14:33 css
    drwxrwxr-x   2 hoekit hoekit  4096 Aug  6 16:07 dist
    -rw-rw-r--   1 hoekit hoekit   458 Aug  6 16:04 index.html
    drwxrwxr-x 105 hoekit hoekit  4096 Aug  6 15:26 node_modules
    -rw-rw-r--   1 hoekit hoekit   492 Aug  6 16:08 package.json
    -rw-rw-r--   1 hoekit hoekit 54354 Aug  6 15:26 package-lock.json
    drwxrwxr-x   3 hoekit hoekit  4096 Aug  6 16:30 src

..
__ Solution:

Let's put all web app stuff in clinic/appsrc instead. This will separate
the source files and the final application.

Create the folder:

    mkdir clinic/appsrc
    cd clinic/appsrc

Move the npm package files over and rebuild:

    git mv ../public/package*.* .
    npm update

Move the src files over:

    git mv ../public/src .

Fix package.json to generate output in public/dist as before

..

----
<a id="10"></a>
## 10. Problem: If laptop dies, project is gone
__

The project currently lives on my laptop, if it dies, I may be able to
salvage it from the hdd - perhaps not if it went up in smoke.

And better than that, this is an open source project. So I'll just host
it on GitHub. May move it elsewhere later.

..

----
<a id="11"></a>
## 11. VERSION 0.0.1
__ Changes

This version all the major components setup. The front-end using
MithrilJS and webpack for bunding and the backend using Perl and
Mojolicious. With this setup, we'll just keep iterating, changing bits
and pieces here and there until we have what we need.

..

----
<a id="12"></a>
## 12. Problem: Perl on Windows
__ Perl on Windows is at v5.32.1

The version of perl on the development Linux machine is 5.34.0 while the
[latest version](https://www.perl.org/get.html) is at 5.38.0.

[Strawberry Perl](https://strawberryperl.com/) is the preferred version
of Perl on Windows is at v5.32.1.

To make sure that things will work on Windows, as in the dev machine,
Perl 5.32.1 will be installed in the dev machine.

Source for 5.32.1:

    https://www.cpan.org/src/5.0/perl-5.32.1.tar.gz

..

----
<a id="13"></a>
## 13. Problem: Add a login page
__ src/views/vLogin.js

This system probably don't need a login page as it's likely used only by
one person. But better to include it up front. We can always bypass it
later on.

All views are defined in folder src/views so this will be:

    src/views/vLogin.js

Everything is stored in an object called vLogin.

    vLogin.view
        - Returns a mithril m() object that's rendered.
        - View has input for username and password and a Login button.

    vLogin.login
        - Function to handle login
        - Calls mUser.login() which actually does the login
        - On success, go to the main page
        - On error, display the error

..
__ src/views/vHelper.js

Contains various helpers for views and elements e.g.

    vHelper.setById = nodeId => {
        // Returns a function that takes a msg and renders it at given node
        return msg => {
            var node = document.getElementById(nodeId);
            m.render(node, m('div.mt2.dark-blue.tl',msg))
        }
    }

..
__ src/models/mUser.js

This encapsulates the user object and at the moment has:

    mUser.login
        - Checks if user is authorized to login

..

----
<a id="14"></a>
## 14. Problem: Versioning the source files
__

The app has one version e.g. the version at the moment is v0.0.1. But an
app is actually made up of different files, which may change
independently. So how is it possible to track both?

One solution, used in this project is to use X.Y.Z-n scheme where the
X.Y.Z is the usual major, minor, patch of the app. The value of *n* is
at the file level, it is incremented on every commit; independently of
the app version. And the X.Y.Z value used is the next version of the
app - not the current value.

As an example. The current app/project version is 0.0.1 and the next
version is 0.0.2. Starting a new file now e.g. src/views/vLogin.js will
have a version v0.0.2-1.

..

----
<a id="15"></a>
## 15. Problem: Styling page elements
__

Using basic HTML elements is a little too plan. To spruce things up a
little, [Tachyons](https://tachyons.io/) is used for simple styling.

..

----
<a id="16"></a>
## 16. Problem: Starting at the login page
__

The MithrilJS way is to specify the first page in m.route():

    var base = document.getElementById('base')
    m.route(base, '/login', {
        '/login'    : vLogin,
    })

Element *base* is simply a div in index.html:

    <body>
      ...
      <div id="base"></div>
      ...
    </body>

And earlier, *vLogin* is the module exported by views/vLogin.js:

    var vLogin    = require('./views/vLogin')

The entire src/index.js file at the moment is:

    var m = require("mithril")
    var vLogin    = require('./views/vLogin')

    var base = document.getElementById('base')
    m.route(base, '/login', {
        '/login'    : vLogin,
    })

..

----
<a id="17"></a>
## 17. Problem: On startup, prompt is at username input
__

If the prompt is at the username input element, user can start typing
straight away.

The jargon for it is to automatically *focus* on the username input.

Solution is to set the autofocus attribute:

    https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autofocus

..

----
<a id="18"></a>
## 18. Problem: Need strings to be in another language
__

The UI needs to be in Thai e.g.:

    Login       เข้าสู่ระบบ
    Username    ชื่อผู้ใช้
    Password    รหัสผ่าน

The desired system is something where we can specify the language:

    var mLang = require('../models/mLanguage')

    var S = mLang.useLang('th')
    S('login')          // เข้าสู่ระบบ
    S('username')       // ชื่อผู้ใช้

    var S = mLang.useLang('en')         // Change to use English
    S('login')          // Login

..

----
<a id="19"></a>
## 19. Problem: Directory structure is unnecessarily deep
__

At the moment, source for the app is structured like so:

    appsrc/
      src/
        index.js
        models/
        views/

The src/ folder seems unnecessary. After all the parent directory is
already called 'appsrc/'. Getting rid of 'src/' seems cleaner:

    appsrc/
      index.js
      models/
      views/

Let's fix it:

    cd appsrc
    git mv src/index.js .
    git mv src/models .
    git mv src/views .

Need to update the package.json:

    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "webpack ./index.js --output-path ../public/dist --mode=development --watch",
        "build": "webpack ./index.js --output-path ../public/dist --mode=production"
    },


..

----
<a id="20"></a>
## 20. Problem: Add the patient list page
__

Patient List Specifications:

    - Has a simple header
        - Has button to add new patient
            - onclick, go to Add Patient page
            - https://www.iconarchive.com/search?q=iconoir+add
            - https://www.iconarchive.com/show/iconoir-icons-by-iconoir-team/add-user-icon.html
    - Has a search input
        - onload, focus on input
    - Has a list of patients

Each Patient is shown in a card as follows:
    - Show Patient details
    - Show delete button
        - onclick, Delete Patient from list
        - https://www.iconarchive.com/search?q=iconoir+delete
        - https://www.iconarchive.com/show/iconoir-icons-by-iconoir-team/delete-circle-icon.html
    - Show edit button
        - onclick, go to Edit Patient page
        - https://www.iconarchive.com/search?q=iconoir+edit
        - https://www.iconarchive.com/show/iconoir-icons-by-iconoir-team/page-edit-icon.html

Patient Details:
    - Patient name
    - Gender, Age
    - Congenital Disease
    - Allergy
    - Blood Group
    - Patient last visit date (maybe)
    - Anything else that may be useful

..

----
<a id="21"></a>
## 21. Problem: Need to mockup list of patient data
__ Patient List

A list of patient data is obviously a list of zero or more patient
objects.

Zero, one or N patients:

    []
    [ patient_1 ]
    [ patient_1, patient_2, patient_3, ..., patient_N ]

..
__ Patient Object:

    {
      hn*                   integer >= 1001
      firstName*            text
      lastName*             text
      dob                   text  (format:YYYYMMDD, value:Common Era)
      age*                  computed text
      gender*               text
      race                  text
      nationality           text
      id                    text
      addrNum               text
      addrMoo               text
      addrTambon            text
      addrAmphur            text
      addrProvince          text
      addrPostcode          text
      phoneNum              text
      kinName               text
      kinRelation           text
      kinPhoneNum           text
      disease*              text
      allergy*              text
      bloodGroup*           text
      extra1                text
      extra2                text
      extra3                text
      extra4                text
      extra5                text
    }

..
__ Patient Object Notes:

    - hn
        - used instead of patient number
        - starts from 1001. may use 000-999 for special cases
    - dob
        - Stored in CE (Common Era) format
        - Accepts CE year values when Env.language is EN
        - Accepts BE (Buddhist Era) year values when Env.language is TH
        - UI will show example values to disabiguate
    - addr*
        - expect one address for each patient

..
__ Storing Patient Object

For programming and debugging convenience, the patient object should be
displayed to include all the field names. However, for storage and
network transmission purposes, it's best not to store the field names.

Use mPatientList.js for to managing patient lists.

Use mPatient.js for managing patients.

    mPatient.fromList([...])
        - Creates a new patient object from a list of values
    mPatient.obj()
        - Returns the patient object as a simple JS object {...}
    mPatient.list()
        - Returns the patient object as a simple JS list [...]
    mPatient.miniView()
        - Renders a patient object showing minimal details
    mPatient.fullView()
        - Renders a patient object showing full details

..
__ Sample Patient List

[
    {
        hn                  : 1001,
        firstName           : "First Name 1001",
        lastName            : "Last Name 1001",
        dob                 : "2000-01-01",
        age                 : "23y 249d"
        gender              : "Male",
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
        disease*            : "-",
        allergy*            : "-",
        bloodGroup*         : null,

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
        age                 : "23y 249d"
        gender              : "Male",
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
        disease*            : "-",
        allergy*            : "-",
        bloodGroup*         : null,

        extra1              : null,
        extra2              : null,
        extra3              : null,
        extra4              : null,
        extra5              : null,
    }
]

..

----
<a id="22"></a>
## 22. Problem: How to generate incremental HN number
__ Usage

To get an incremental HN number, it should be as simple as:

    var mNext = require('../models/mNext')
    var nextHn = mNext.next('hn')

..
__ Implementation

Assume there exist an SQLite table called Next:

    CREATE TABLE Next(
        key     TEXT    PRIMARY KEY,
        value   TEXT
    );

With initial values:

    INSERT INTO Next VALUES ("hn", 1000);

The mNext.next(key) function can be implemented as an SQLite query:

    UPDATE Next
        SET value = (SELECT value+1 FROM Next WHERE key = "hn")
        WHERE key = "hn";

    SELECT * FROM Next;     -- Check after

..
__ In Perl

    use DBI;

    my $dbh = DBI->connect("dbi:SQLite:dbname=$dbfile","","");

    # Increment HN
    $dbh->do(q{
        UPDATE Next
            SET value = (SELECT value+1 FROM Next WHERE key = "hn")
            WHERE key = "hn";
    });

    # Retrieve value of HN
    my $sth = $dbh->prepare(q{SELECT value FROM Next where key = "hn"});
    $sth->execute;
    my $res = $sth->fetch;

..
__ In case of multiple users (not for this system)

The below is obviously not going to be needed for a single-user system.

Wrapping everything in a transaction would probably work. It makes
the increment-and-read atomic.

    use DBI;

    my $dbfile = '/tmp/env.db';
    my $dbh = DBI->connect("dbi:SQLite:dbname=$dbfile","","");

    $dbh->do(q{BEGIN TRANSACTION;});

    # Increment HN
    my $upd_sth = $dbh->prepare(q{
        UPDATE Next
            SET value = (SELECT value+1 FROM Next WHERE key = "hn")
            WHERE key = "hn";
        });

    $upd_sth->execute;

    # Check for failures here
    # On Linux, the update statement will block if another transaction
    # was being executed.

    # Retrieve value of HN
    my $sth = $dbh->prepare(q{SELECT value FROM Next where key = "hn"});
    $sth->execute;
    my $res = $sth->fetch;

    $dbh->do(q{COMMIT});

..

----
<a id="23"></a>
## 23. Problem: Mithril is not auto-redrawing
__

The design of Patient List page is that it'll retrieve the patient list
which returns a Promise. And when the Promise is resolved, patient list
data then becomes available.

However, the view function runs before the Promise is resolved. And it
does not auto-redraw after the patient list is available.

For situations such as this, Mithril provides the
[m.redraw()](https://mithril.js.org/redraw.html) function.

..

----
<a id="24"></a>
## 24. Problem: Align images to the right of space
__

The edit and delete icons should align right. But these are images So
how do solve this problem?

Make the container a flexbox:

    m('div.flex.mt2.mb0',[

Both items are styled with *display:block* and in addition, the first
image is styled with *margin-left:auto*:

        m('img.db.ml-auto.w-1em.pa1.f4', {
            src:'/img/patient-edit.png',
            onclick: () => console.log('Edit Patient')
        }),
        m('img.db.w-1em.pa1.f4', {
            src:'/img/patient-delete.png',
            onclick: () => console.log('Delete Patient')
        }),

Tachyons CSS is used so:

    .flex       display:flex
    .db         display:block
    .ml-auto    margin-left:auto

..

----
<a id="25"></a>
## 25. Problem: Replace mock data in JS with mock data from Server
__

At the moment, data is mocked in the JS app. Let's fetch it from the
server instead.

The API endpoint is:

    GET /patients

..

----
<a id="26"></a>
## 26. Design: The API
__ See: ~/test/github/rural-clinic/docs/
..

----
<a id="27"></a>
## 27. Problem: Confusion between DOB and age
__

The date of birth (DOB) of a patient is a static value while the age of
a patient keeps changing depending when the record is viewed. So age is
a function of DOB and only makes sense in the presentation layer.

Therefore the server and the underlying database only knows about values
like DOB but not dynamic values like age.

..

----
<a id="28"></a>
## 28. Problem: Find difference between two dates
__

According to
[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date)
Javascript can parse dates in the YYYY-MM-DD string format.

    const dt1 = new Date('2000-01-01')
    const now = new Date()
    const msSinceEpoch = new Date(now - dt1)
    const msPerYear = 365 * 24 * 60 * 60 * 1000
    const years = msSinceEpoch / msPerYear
    const yearsInt = Math.floor(years)
    const daysInt  = Math.floor((years - yearsInt) * 365)



..

----
<a id="29"></a>
## 29. Problem: Display date in CE and BE formats
__

A date such as 2012-12-02 in Common Era (CE) format:

    2 Dec 2012

In Buddhist Era (BE) format:

    2 ธ.ค. 2555

According to [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString) the solution is:

    const event = new Date(Date.UTC(2012, 11, 2, 3, 0, 0));
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    console.log(event.toLocaleDateString('th-TH', options));

..

----
<a id="30"></a>
## 30. Problem: Restarting the project after a hiatus
__ Problem

After being away for several days, a way to get back to the project
quickly is needed.

What's needed?

..
__ Start the front-end and backend servers

    # On Left Terminal

    # Backend server
    cd ~/test/github/rural-clinic
    morbo -l http://*:4001 Main.pl &
    vimr Main.pl

    # Frontend server
    cd ~/test/github/rural-clinic/appsrc
    npm start &
    vimr index.js
    vimr views/vPatientAdd.js

    # View in browser
    cd ~/test/github/rural-clinic
    firefox http://localhost:4001
    ff-refresh.sh public/dist Clinic "Right Terminal" &

..
__ Open the essential files for editing

    cd ~/test/github/rural-clinic
    vimr Main.pl

    cd ~/test/github/rural-clinic/appsrc
    vimr index.js

..

----
<a id="31"></a>
## 31. Problem: Implement adding a new patient
__ Breakdown of parts needed

Need to implement the following:

1. Patient List Page: Add an icon for adding a new patient

2. Add Patient Page: Create it

3. Main.pl: Create endpoint to handle adding a patient

..
__ 1. Patient List Page: Add an icon for adding a new patient

1. Add icon to side of Patient List

    - appsrc/views/vPatientList.js
    - from: https://www.iconarchive.com/show/iconoir-icons-by-iconoir-team/add-user-icon.html
    - Format: PNG
    - Size: 96px
    - Store to: ~/test/github/rural-clinic/public/img/patient-add.png

2. On click, route to the Add Patient page

    - m.route.set('/patientAdd')

..
__ 2. Add Patient Page: Create it
..
__   1. File: views/vPatientAdd.js
..
__   2. Structure of vPatientAdd.view:

Elements with asterisk (*) have associated interactions.

    view = {
        Header
            Title, btnBack*

        Form
            firstName+,     lastName+
            gender+,        dob+
            idcard,         phoneNum,       bloodGroup
            race,           nationality
            disease,
            allergy,

            addrNum,        addrMoo,        addrStreet
            addrTambon,     addrAmphur
            addrProvince,   addrPostcode

            contactName,    contactRelation
            contactPhoneNum

            btnSubmit*
    }

btnBack
    - page-back.png
   - https://www.iconarchive.com/show/iconoir-icons-by-iconoir-team/arrow-left-circle-icon.html 
   - https://www.iconarchive.com/download/i147439/iconoir-team/iconoir/arrow-left-circle.96.png

..
__   3. Structure of vPatientAdd.vd:

Design-wise, all structures 

    vd.lang     = en|th         // Whether ui should be EN or TH

    vd.patient  = {             // JS object generated by mPatient
        hn          : null,     // System-generated in backend
        firstName   : null,     // Mandatory
        lastName    : null,     // Mandatory
        gender      : null,     // Mandatory
        dob         : null,     // Mandatory
        disease     : null,
        allergy     : null,
        bloodGroup  : null,
        phoneNum    : null,

        race            : null,
        nationality     : null,
        idcard          : null,
        addrNum         : null,
        addrMoo         : null,
        addrStreet      : null,
        addrTambon      : null,
        addrAmphur      : null,
        addrProvince    : null,
        addrPostcode    : null,
        contactName     : null,
        contactRelation : null,
        contactPhoneNum : null,
    }

..
__   4. Interactions:

    1. Click Back
        - The "Back" button is for the user to return to the Patient-List page

    2. Click Submit
        - Do front-end validation
        - Trim all strings to remove prior and trailing spaces
        - Mandatory fields should have attribute "required"
        - Pattern for dob       : \d\d\d\d-\d\d-\d\d
        - Pattern for postcode  : \d\d\d\d\d
        - On validation error, show error messages
            - First Name is required
            - Last Name is required
            - Gender is required
            - Date of birth is required
            - Date of birth format must be YYYY-MM-DD
            - Postcode format must be NNNNN
        - On validation error, show error messages
        - On validation success, send POST request with patient data
        - On success, clear form data, show success message ready for
          another patient.
        - On failure, keep form data, show error messages.

..
__   5. States and state-transitions

State: Patient_Add_Start
    - status: init
    - Form is empty

State: Patient_Add_In_Progress
    - status: adding
    - Error message shown if any form elements with invalid values
        - element has non-empty value
        - element *not* in focus
        - element is invalid
        - show error msg

State: Patient_Add_Requesting
    - status: requesting
    - Message: Request sent. Please wait ...

State: Patient_Add_Success
    - status: success
    - Form is empty
    - Message: Patient added

State: Patient_Add_Failure
    - status: failure
    - Form has values
    - Message: <Relevant error messages>

..
__   6. Handling Responses to Request

POST /patients

    On success:
    - Add created patient object to mPatientList
    - Clear form data
    - Initialize vd.patient
    - Show message: Patient added

    On failure:
    - Keep form data
    - Show error messages

..
__ 3. Main.pl: Create endpoint to handle adding a patient

    See: docs/api.md #1 Patients

..

----
<a id="32"></a>
## 32. Coding: Naming conventions
__ Abbreviations

    number      num
    button      btn

..
__ Routes

Name routes as <noun><Action> e.g.:

    /patientList
    /patientAdd

..
__ Icons

- Name icons as: <noun>-<action> e.g.:

    patient-add.png

..
__ Docs

- Location: ~/test/github/rural-clinic/docs

- Name docs as lowercase e.g.:

    data-structures.md

..
__ Tables

Filename same as table name and is singular e.g.:

    File    : Patient.db
    Table   : Patient

See: ~/test/github/rural-clinic/docs/tables.md

..

----
<a id="33"></a>
## 33. Design: Data Structures
__ ~/test/github/rural-clinic/docs/data-structures.md

After some time, there's a need for a canonical reference of the data
structures in use.

    ~/test/github/rural-clinic/docs/data-structures.md

..

----
<a id="34"></a>
## 34. Design: Frontend Page
__ Elements of a Frontend Page

1. Design view structure
    - Main elements of view: header, body, footer
    - Identify navigation elements
        - in/out of page
    - Identify interaction elements
        - form elements, etc

2. Design view-data structure
    - Name the view-data: vd
    - vd contains all the data required to render the view
    - Part of the view data would include things like Patient
    - The patient should be constructed from mPatient
        - mPatient.new()

3. Design interactions
    - 

4. Design states and state-transitions
    - Initial state
    - Terminal/exit states
    - Intermediate states

..

----
<a id="35"></a>
## 35. Design: SQLite tables
__ One table, one db

Because SQLite locks the entire file/db when updating a table.

See: https://www.sqlite.org/lockingv3.html

..

----
<a id="35"></a>
## 35. Design: SQLite tables
__ Where to keep the tables?

Since there is a folder named 'private' which is already ignored by git,
that will be where the SQLite tables be kept

..
__ List of files:

    1. private/Patient.db

..

----
<a id="36"></a>
## 36. Problem: How to layout page title with icons
__

Use Flexbox - the one-dimensional layout method.

Elements:
    Header      Icon

Icon consumes it's own space.
Header flex/expand to fill remaining space.

    // Create flex container
    m('div.flex', [
    ])

..

----
<a id="37"></a>
## 37. Problem: How to remove inner shadow of text input
__ 

..
__ Solution

Use CSS:

    border-style:solid

In Tachyons:

    .ba

See: https://stackoverflow.com/questions/12791631/remove-inner-shadow-of-text-input

..

----
<a id="38"></a>
## 38. Problem: How to use regex to check date format?
__ Check date format: YYYY-MM-DD

Regex: \d\d\d\d-\d\d-\d\d

    const re = new RegExp("\d\d\d\d-\d\d-\d\d")

    re.test('2001-12-01') // true

..

----
<a id="39"></a>
## 39. Problem: How to extract year from YYYY-MM-DD
__ Use RegExp

    const re = /(\d\d\d\d)-\d\d-\d\d/

    // parseInt converts String to Int
    var year = parseInt(dob.match(re)[1])

..

----
<a id="40"></a>
## 40. Problem: How to get current year
__

    new Date().getFullYear()

..

----
<a id="41"></a>
## 41. Problem: Building project on new machine
__ Steps

    # Get the source
    cd ~/test/github
    https://github.com/hoekit/rural-clinic.git
    # git clone git@github.com:hoekit/rural-clinic.git

    # Rebuild node modules
    cd ~/test/github/rural-clinic
    npm update

..

----
<a id="42"></a>
## 42. Problem: Speed up time to work on project
__ Problem

It is still quite slow to start working on the project.

..
__ Solution

Build a tool to start the context for the work.

    tools/start_work.sh

..

----
<a id="43"></a>
## 43. Problem: Make debugging structures easy
__ Problem:

If debugging is enabled, it would be nice to be able to view data of
each module.

..
__ Solution:

Create a window object: window.tt and attach various objects to it.

    See: models/mDebug.js

..

----
<a id="44"></a>
## 44. Problem: Implement search
__ Problem

The search function should filter out items that do not match.

Design wise, filter on firstName and lastName.

..
__ Solution

Create a regex using the search field.

If the search field is nonEmpty, each patient card is checked and is
displayed only if the firstName, lastName matches.

..

----
<a id="45"></a>
## 45. VERSION 0.0.2
__ Patient Add works
..

----
<a id="46"></a>
## 46. Problem: Implement Patient Edit
__ Changes Needed

1. Update appsrc/views/vPatientList.js

2. Create appsrc/views/vPatientEdit.js
    - Add vPatientEdit to mDebug

3. Update appsrc/models/mPatientList.js

4. Update Main.pl
    - Implement GET /patient/:hn
    - Implement the POST /patient/:hn

5. Update appsrc/index.js
    - Add new route to the "Patient Edit" page

..
__   1. Update appsrc/views/vPatientList.js

    Implement patient edit for each patient:
    - Clicking on the Edit Icon will open the Patient Edit page
    - Pass the key i.e. HN number to the Patient Edit page
        - Can it be passed as a parameter?
            - Preferred as it is more obvious
        - Or passed as a background variable?
        - Conclusion: HN is passed as a parameter in the route e.g.
            - m.route.set('/patientEdit/'+patient.hn)

    Enhance search to include HN

..
__   2. Create appsrc/views/vPatientEdit.js

    - Use the key, fetch the full record from the server
        - call function implemented in mPatientList
    - Display the fields for editing, except HN
    - Page similar to vPatientAdd.js
    - Send the record submit button clicked
        - call function implemented in mPatientList
    - On success,
        - inform the user
        - keep data on screen
    - On failure
        - show error
        - keep data on screen

..
__   3. Update appsrc/models/mPatientList.js

    Implement mPatientList.getFullRecord( hn )
        - Fetches the full record of given HN
        - Sends request to backend via GET /patient/:hn

    Implement mPatientList.edit( patient )
        - Handles edits to the patient.
        - Sends request to backend via POST /patient/:hn

..
__   4. Update Main.pl

    Implement GET /patient/:hn
    - This endpoint is called prior to editing a HN. First the full
      record for the HN is retrieved using this endpoint.
    - Fetch the record from database, which is an array
    - Turn array into a href/object
    - Returns the full record for patient with given :hn
    - TODO:
        - Handle case where record is not found

    Implement the POST /patient/:hn
    - This endpoint is called to apply edits to patient records.
    - Validate the provided values.
    - Update the record.
    - On Success:
        Return the data that was provided in the request
    - On Failure:
        Return the errors found
    - TODO:
        - Check that required fields are neither null nor empty
        - Check that date fields has valid values
        - Check that HN exists

..
__   5. Update appsrc/index.js

Editing a patient requires a new page and a corresponding route:
    - /patientEdit/:id

..
__ Other Incidental Changes

1. Update appsrc/models/mDebug.js
    - Add vPatientEdit to the debug module

2. Update appsrc/models/mLanguage.js
    - Modify wording in search bar

3. Update docs/api.md
    - Create GET /patient/:hn
    - Create POST /patient/:hn

4. Update lib/HATX.pm
    - Add documentation and examples

..

----
<a id="47"></a>
## 47. VERSION 0.0.3
__ Patient Edit works
..

----
<a id="48"></a>
## 48. Problem: Implement Patient Delete
__ Concept

Patient Delete refers to deleting a patient from the list of patients.
When a the "x" button is clicked for a given patient, a confirmation
dialog appears within that record:

    Records for patient XXXX will be permanently deleted.

            [ CANCEL ]      [ DELETE ]

If [CANCEL] is selected, then goes back to normal. If [ DELETE ] is
selected, then a delete is performed.

Let's make the delete be in-situ:
    - For record about to be deleted,
    - make the border of the record red
    - make the content of the record light-red
    - Show the ConfirmDelete

..
__ Changes Needed

1. Update appsrc/views/vPatientList.js

2. Update appsrc/models/mPatientList.js

3. Update Main.pl

4. Update appsrc/models/mLanguage.js

..
__   1. Update appsrc/views/vPatientList.js
..
__     View-Data

    Add vd.delete to store info about patient being deleted
    - vd.delete.hn
        - One of : -1 | HN being deleted
    - vd.delete.state
        - One of : INIT | STARTED | PENDING | DELETED | ERROR
        - INIT   : when vd.delete.hn == -1
        - STARTED: when user clicks (x) delete button for a record
        - PENDING: when user confirms deletion and awaits server response
        - DELETED: when record has been deleted on server
        - ERROR  : when an error arose when deleting from server

..
__     View-Views

    Update record view to look different if record is being deleted

    vv.dlgConfirmDelete:
        - Dialog asking user to confirm deletion.
    - STARTED:
        - Thick red border
        - Light-red background
        - Action buttons disabled
        - Show ConfirmDelete dialog
            - Records for patient XXXX will be permanently deleted.
            -           [ CANCEL ]      [ CONFIRM ]

    vv.dlgDeletePending:
        - Dialog informing user to wait for server response.
    - PENDING:
        - Thick red border
        - Light-gray background
        - Action buttons disabled
        - Show DeletePending message
            - Request sent. Waiting for server response.

    vv.dlgDeleteSuccess:
        - Dialog informing user of deletion success.
        - Asks user to acknowledge.
    - DELETED:
        - Thick gray border
        - Light-gray background
        - Action buttons disabled
        - Show ItemDeleted message
            - Record for "Firstname Lastname (HN)" has been deleted.
            -    [ CLOSE ]
            - On [ CLOSE ]
                - Set vd.delete.hn    = null
                - Set vd.delete.state = null

    vv.dlgDeleteError:
        - Dialog informing user of errors.
        - Asks user to either cancel or retry.
    - ERROR:
        - Thick red border
        - Light-red background
        - Action buttons "enabled"
        - Show DeleteError dialog
            - Delete failed. Please retry.
            -   [ CANCEL ]   [ RETRY ]

    Container vv also contains other sub-views:
        - vv.header: Sub-view for header
        - vv.search: Sub-view for search bar
        - vv.patient: Sub-view for patient item

..
__     View-Actions

    - Add action va.delete()
        - Triggered when user clicks on (x) delete button
        - Updates vd.delete.hn
            - Can only delete one record at a time
            - Be sure that vd.delete.hn is not defined
        - Updates vd.delete.state to STARTED

    - Add action va.deleteConfirm()
        - Trigger when user confirms that the records should be deleted
        - Updates vd.delete.state to PENDING
        - Calls mPatientList.deleteItem
            - On Success: DELETED
            - On Failure: ERROR

..
__   2. Update appsrc/models/mPatientList.js

    Add mPatientList.deleteItem
    - Deletes given item
    - Send request by calling endpoint DELETE /patient/:hn

..
__   3. Update Main.pl

    Add DELETE /patient/:hn
    - Delete record from table patient
    - Use the new helper response()

..
__   4. Update appsrc/models/mLanguage.js

    Add strings for various messages in dialogs

..
__ Other incidental changes

- Update appsrc/models/mDebug.js
    - Add module vPatientList which was not added earlier

- Update public/css/app.css
    - Add CSS for spinner that indicates

- Update docs/api.md
    - Add documentation for DELETE /patient/:hn

- Update docs/progguide.md
    - Add documentation on images, API responses and others

..
__ TODO

- Update Main.pl
    - Update all endpoint handlers to use helper response()

..

