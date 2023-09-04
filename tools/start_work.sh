#!/usr/bin/bash

# Backend server
cd  ~/test/github/rural-clinic
/usr/bin/vim --servername rural_clinic --remote Changelog.md
morbo  -l http://*:4001 Main.pl &
/usr/bin/vim  --servername rural_clinic --remote Main.pl
tail -f log/Main.pl.log &
sqlite3 private/Patient.db &

# Frontend server
cd ~/test/github/rural-clinic/appsrc
npm start &
/usr/bin/vim --servername rural_clinic --remote index.js
/usr/bin/vim --servername rural_clinic --remote views/vPatientAdd.js
/usr/bin/vim --servername rural_clinic --remote models/mPatientList.js

# View in browser
cd ~/test/github/rural-clinic
firefox http://localhost:4001
ff-refresh.sh public/dist Clinic "Right Terminal" &

# Display jobs. Should have 3 jobs: morbo, npm start and ff-refresh
jobs

