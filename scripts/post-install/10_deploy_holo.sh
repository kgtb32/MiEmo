#!/bin/bash

clear
dialog --title "INSTALLING MIEMO" --backtitle "miemo (ARCADE MODE) V2.0" \
--msgbox "/!\\ WARNING /!\\\n\nPLEASE MAKE SURE MIEMO IS\nDOWNLOADED BEFORE\nPRESS CTRL+C IF NOT" 20 50

rm -rf /home/miemo/miemo-holo/

mkdir -p /home/miemo/miemo-holo/

cd /tmp/miemo/miemo-holo/

clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "COMPILING MIEMO-HOLO" 10 60 50 &

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

yarn && yarn build &>> /tmp/miemo_post_install.log

clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --infobox "Please Wait ..." 3 34

cp -r /tmp/miemo/miemo-holo/dist/* /home/miemo/miemo-holo/
cd /tmp

clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --infobox "MIEMO-HOLO IS INSTALLED" 3 34
sleep 2