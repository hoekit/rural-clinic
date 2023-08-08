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
__

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

