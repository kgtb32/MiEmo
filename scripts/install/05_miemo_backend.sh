#!/bin/bash
clear
dialog --title "INSTALLING MIEMO" --backtitle "miemo (ARCADE MODE) V2.0" \
--msgbox "/!\\ WARNING /!\\\n\nPLEASE MAKE SURE MIEMO IS\nDOWNLOADED BEFORE\nPRESS CTRL+C IF NOT" 20 50

mkdir -p /home/miemo/backend/

dialog --backtitle "miemo (ARCADE MODE) V2.0" --infobox "Installing Miemo backend Microservice ..." 3 60 &
echo $(cp -r /tmp/miemo/Api/* /home/miemo/backend/) >> /tmp/miemo_install.log
cp /tmp/miemo/config/runMiemoBackend /usr/bin/
chmod a+x /usr/bin/runMiemoBackend
clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --infobox "Miemo backend microservice installed." 3 60 &