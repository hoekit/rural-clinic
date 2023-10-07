# Programmer Guide v0.0.3-2

## Contents<a id="toc"></a>
[
1. Debugging
2. Updating Changelog.md
3. Data in views
4. Creating new views
5. Images
6. Server API Response
7. UX for Deleting Patient Record
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
__ Concepts

A view represents a page in the app. A view can be separated into:

    - Visuals/vv: Sub views and dialogs
        - Visuals should be totally dependent on data
        - Show data and controls that user can interact with

    - Data/vd   : Data used in the view

    - Actions/va: Actions to be taken as a result of user interactions

    - Errors/ve : Errors raised

In general the flows goes like this:

    In view.oninit
    - retrieve data required to build the view and store data into /vd
    - build the page and user controls using /vv sub views and dialogs
    - associate each user control with the appropriate /va.action

Typical data components:

    vd.list     : List of items

Typical view components:

    vv.header   : Header

    vv.search   : Search bar

    vv.item     : The view of each iterm

Typical actions components:

    va.delete
        - User initiates deletion; ask for confirmation

    va.deleteCancel
        - User cancels deletion; go back to status quo

    va.deleteConfirm
        - User confirms deletion; go ahead and delete

    va.deleteDone
        - Deletion was successful

..
__ Components of a view
..
__   View Data

    - All view data should be held in an object named "vd"; short
      for "view-data"
    - Example: vd.patient

..
__   View Error

    - All errors related to the view should be held in an object
      named "ve"; short for "view-errors".
    - Example: ve.error

..
__   View Actions

    - All user actions should be handled by an object named "va"
      short for "view-actions"

..
__   Sub-views and Dialogs

    - All subviews and dialogs should be stored in an object named "vv"
      short for "view-views"

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

----
<a id="5"></a>
## 5. Images
__ Source of images:

    https://www.iconarchive.com/show/iconoir-icons-by-iconoir-team/add-user-icon.html

..

----
<a id="6"></a>
## 6. Server API Response
__ Main.pl helper: response()

The response() function is a helper function that sends either:

    - OK Response
    - NOK Response

It automatically decides which response to send depending on whether the
$errors arrayref has any content.

    if $errors is [], send OK response.

    if $errors has some content, send NOK response.

..

----
<a id="7"></a>
## 7. UX for Deleting Patient Record
__ Visuals

    When clicked on Delete
    - Other controls e.g. "Edit" and "Delete" buttons are hidden for the
      selected item
    - This keeps things simple.

    After record has been deleted, show a message and an [OK] button.
    On clicking the [OK] button, the Patient List screen is refreshed.
    This automatically fetches the latest list of patients which would
    not contain the deleted record.

..

