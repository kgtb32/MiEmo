#!/bin/bash
clear
dialog --title "INSTALLING MIEMO" --backtitle "miemo (ARCADE MODE) V2.0" \
--msgbox "/!\\ WARNING /!\\\n\nPLEASE MAKE SURE MIEMO IS\nDOWNLOADED BEFORE\nAND PACKAGES INSTALLED\nPRESS CTRL+C IF NOT" 20 50

cp /tmp/miemo/config/docker-compose.yml /home/miemo/

dialog --backtitle "miemo (ARCADE MODE) V2.0" --infobox "PULLING MIEMO-EMOTION." 3 60 &
docker pull kgtb32/miemo-emotion &>> /tmp/miemo_install.log

clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --infobox "MIEMO EMOTION INSTALLED." 3 60 &