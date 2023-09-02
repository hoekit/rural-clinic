# Get PID of Main.pl, npm, ff-refresh and inotify
ps aux | grep -P '(npm start|Main|ff-refresh|inotifywait)'

# for npm start,
#   use kill -9 PID
