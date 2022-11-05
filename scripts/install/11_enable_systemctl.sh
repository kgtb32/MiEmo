#!/bin/bash
clear
dialog --title "INSTALLING MIEMO" --backtitle "miemo (ARCADE MODE) V2.0" \
--msgbox "/!\\ WARNING /!\\\n\nPLEASE MAKE SURE MIEMO IS\nDOWNLOADED BEFORE\nAND PACKAGES INSTALLED\nPRESS CTRL+C IF NOT" 20 50

systemctl enable miemo-bluetooth
systemctl enable miemo-backend
systemctl enable miemo-wifi
systemctl enable miemo-emotion

clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --infobox "SERVICES ENABLED" 3 60 &