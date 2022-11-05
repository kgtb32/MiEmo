#!/bin/bash
clear
dialog --title "INSTALLING MIEMO" --backtitle "miemo (ARCADE MODE) V2.0" \
--msgbox "/!\\ WARNING /!\\\n\nPLEASE MAKE SURE MIEMO IS\nDOWNLOADED BEFORE\nPRESS CTRL+C IF NOT" 20 50


clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "CLEANING OLD POSSIBLE INSTALL ..." 10 60 0 &
rm -rf /home/miemo/miemo-game/

clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "INSTALLING MIEMO-GAME ..." 10 60 25 &

mkdir -p /home/miemo/miemo-game

cp -r /tmp/miemo/miemo-game/* /home/miemo/miemo-game/

cd /home/miemo/miemo-game

clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "CREATING VENV" 10 60 50 &
python3 -m venv venv
clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "ACTIVATING ..." 10 60 60 &
. venv/bin/activate &>> /tmp/miemo_post_install.log
clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "INSTALLING PIP DEPS" 10 60 75 &
pip install -r requirements.txt &>> /tmp/miemo_post_install.log

clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --infobox "Please Wait" 3 34&
deactivate
cd /tmp

clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --infobox "MIEMO-GAME IS INSTALLED" 3 34
sleep 2