#!/bin/bash
# Launcher script for Pokémon Emerald: Journeys
PORT=8000
echo "=========================================================="
echo " Starting Pokémon Emerald: Journeys (WCS Championship)"
echo " Open in your browser: http://localhost:$PORT"
echo " Mobile users: connect to same Wi-Fi and open your Mac's IP"
echo "=========================================================="

# Try to open the default browser on macOS
if which open > /dev/null; then
  (sleep 1 && open "http://localhost:$PORT") &
fi

python3 -m http.server $PORT
