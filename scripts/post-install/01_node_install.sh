#!/bin/bash

cd /tmp

dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "DOWNLOADING NVM" 10 60 0 &
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "ENABLING ..." 10 60 25 &

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" &>> /tmp/miemo_post_install.log

clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "LISTING REMOTE" 10 60 50 &

nvm ls-remote &>> /tmp/miemo_post_install.log

clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "INSTALLING NODE V16" 10 60 75 &

nvm install v16.17.0 &>> /tmp/miemo_post_install.log

clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "ENABLING NODE" 10 60 80 &

nvm use v16.17.0 &>> /tmp/miemo_post_install.log

npm install --global yarn &>> /tmp/miemo_post_install.log

clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --title "INSTALLING MIEMO" --gauge "INSTALLING YARN" 10 60 90 &


export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

clear
dialog --backtitle "miemo (ARCADE MODE) V2.0" --infobox "NODE IS INSTALLED" 3 34

sleep 2