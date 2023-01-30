#!/bin/bash

clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --infobox "Please Wait ..." 3 34 &


systemctl --user enable miemo-webapp
systemctl --user enable miemo-audio
systemctl --user enable miemo-webclient
systemctl --user enable miemo-static
systemctl --user enable miemo-game
systemctl --user enable miemo-holo
systemctl --user enable miemo-hologramClient

clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --infobox "Services enabled" 3 34 &
sleep 2

