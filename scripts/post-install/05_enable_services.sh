#!/bin/bash

clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --infobox "Please Wait ..." 3 34 &


systemctl --user enable miemo-webapp
systemctl --user enable miemo-audio
systemctl --user enable miemo-webclient
systemctl --user enable miemo-static
systemctl --user enable miemo-game

clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --infobox "Services enabled" 3 34 &
sleep 2

