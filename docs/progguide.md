# Programmer Guide v0.0.2-1

## Contents<a id="toc"></a>
[
1. Debugging
2. Updating Changelog.md
3. Data in views
4. Creating new views
]

## Details

----
<a id="1"></a>
## 1. Debugging
__ Notes

    Add a module to debugging
    - Add module to appsrc/models/mDebug.js

    Using debugging
    - In browser console, access via tt.<module>

..

----
<a id="2"></a>
## 2. Updating Changelog.md
__ Capture actual changes

The initial entry in Changelog.md provides a rough guide to what needs
to happen.

    Entry: Changes Needed
    - Lists the affected modules/files to solve the problem
    - For each affect module
        - Indicate change: Update|Create
        - Elaborate on the kinds of changes needed

Prior to every commit, update the initial entry to reflect the actual
changes made in each module.

..

----
<a id="3"></a>
## 3. Data in views
__ vd: acronym for "view data"

    Examples:
    - vd.patient: object containing patient data
        - vd.patient.dob.match(re)
..
__ ve: acronym for "view error"

    - ve.patient: object containing patient errors
        - ve.patient['firstName'] = 'e2101'
        - ve.patient['lastName']  = 'e2102'

..
__ va: acronym for "view actions"

    Examples:
    - va.back   : called when user clicks on back button
    - va.submit : called when user clicks on edit button

..

----
<a id="4"></a>
## 4. Creating new views
__ Components of a view

    View Data
        - All view data should be held in an object named "vd"; short
          for "view-data"
        - Example: vd.patient

    View Error
        - All errors related to the view should be held in an object
          named "ve"; short for "view-errors".
        - Example: ve.error

    View Actions
        - All user actions should be handled by an object named "va"
          short for "view-actions"

..
__ Mithril defaults
..
__   SomeView.oninit()

    This initializes the view. Typically, this loads the data used by
    the views.

..
__   SomeView.view()

    This function has to return a view that will be rendered.
    And within this view, view-data (vd), view-error (ve) and
    view-actions (va) will be used and called extensively

..

