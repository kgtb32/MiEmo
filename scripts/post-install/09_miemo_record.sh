#!/bin/bash
clear
dialog --title "INSTALLING MIEMO" --backtitle "miemo (ARCADE MODE) V2.0" \
--msgbox "/!\\ WARNING /!\\\n\nPLEASE MAKE SURE MIEMO IS\nDOWNLOADED BEFORE\nAND PACKAGES INSTALLED\nPRESS CTRL+C IF NOT" 20 50

clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --infobox "Cleaning up old install ..." 3 0 &
rm -rf /home/miemo/miemo-record
mkdir -p /home/miemo/miemo-record
cp -r /tmp/miemo/miemo-record /home/miemo/miemo-record &>> /tmp/miemo_post_install.log
cd /home/miemo/miemo-record 
dialog --backtitle "miemo (ARCADE MODE) V2.0" --infobox "Installing pip deps ..." 3 50 &
python3 -m venv venv &>> /tmp/miemo_post_install.log
. venv/bin/activate &>> /tmp/miemo_post_install.log
pip install -r requirements.txt &>> /tmp/miemo_post_install.log
deactivate &>> /tmp/miemo_post_install.log
cd /tmp
clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --infobox "MIEMO-RECORD IS INSTALLED" 3 34
sleep 2
clear