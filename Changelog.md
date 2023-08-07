# Clinic - Keeping patient records for a small clinic

## Contents<a id="toc"></a>
\[
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

