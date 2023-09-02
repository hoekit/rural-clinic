#!/usr/bin/bash

# Backend server
cd ~/test/github/rural-clinic
morbo -l http://*:4001 Main.pl &
vim --servername vim_main --remote Changelog.md
vim --servername vim_main --remote Main.pl

# Frontend server
cd ~/test/github/rural-clinic/appsrc
npm start &
vim --servername vim_main --remote index.js
vim --servername vim_main --remote views/vPatientAdd.js
vim --servername vim_main --remote models/mPatientList.js

# View in browser
cd ~/test/github/rural-clinic
firefox http://localhost:4001
ff-refresh.sh public/dist Clinic "Right Terminal" &

